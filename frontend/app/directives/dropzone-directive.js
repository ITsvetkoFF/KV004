define(['./module','dropzone'], function(directives,Dropzone){
    directives.directive('drop', function(){
        return function(scope,element,attrs){

            var config, drop;
            config = scope[attrs.drop];
            //create a Dropzone for the element with the given options
            console.log(element[0]);
            drop = new Dropzone(element[0], config.options);
            var submitButton = document.querySelector("#btn-submit");

            var myDropzone = drop;
            var counter = 0;
            submitButton.addEventListener("click", function() {
               if (myDropzone.files.length > 0) {
                        myDropzone.processQueue();
                    } else {
                        myDropzone.uploadFile({name:"",length:0}); //send empty
                    }
            });
            myDropzone.on("addedfile", function(file) {
                var arr = document.getElementsByClassName("dz-preview");
                console.log(myDropzone);
                for (var i = counter; i < arr.length; i++){
                    arr[i].addEventListener('click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                    });
                }
                counter++;

                // Add the button to the file preview element.
                var removeButton = Dropzone.createElement("<div class='remove_btn'></div>");
                var commentField = Dropzone.createElement("<textarea type='text' name='description" + "' class='comment_field' placeholder='Додайте  опіс до фото...' maxlength='200'></textarea>");

                file.previewElement.appendChild(removeButton);
                file.previewElement.appendChild(commentField);

                removeButton.addEventListener("click", myFunction);

                function myFunction(e) {
                    myDropzone.removeFile(file);
                    counter--;
                    e.stopPropagation();
                };
            });

            myDropzone.on('successmultiple', function() {
                console.log('succesmultiple');
                if(scope.isLoggedIn()){
                    scope.submitProblem();
                }
                else {
                    location.href = "#/map";
                    alert('Ви не зареєстрований користувач, тому проблема спочатку пройде модерацію і потім буде додана на карту.');
                }
            });
            
            console.log(drop);
            //bind the given event handlers
            angular.forEach(config.eventHandlers,function (handler, event){
               drop.on(event, handler);
            });


        };

    });

});
