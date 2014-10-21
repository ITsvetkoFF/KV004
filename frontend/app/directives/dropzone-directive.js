define(['./module','dropzone'], function(directives,Dropzone){
    directives.directive('drop', function(){
        return function(scope,element,attrs){
            
            var config, drop;
            config = scope[attrs.drop];
            //create a Dropzone for the element with the given options
            drop = new Dropzone(element[0], config.options);
            var submitButton = document.querySelector("#btn-submit");

            var myDropzone = drop;
            var counter = 0;
            submitButton.addEventListener("click", function() {

               if (myDropzone.files.length > 0) {
                  if(document.upload_photo){
                    for(var i=0;i<document.upload_photo.description.length;i++){
                         
                          if( document.upload_photo.description[i].value==""){
                           document.upload_photo.description[i].value = " ";
                           
                       }
                      }
                   }
                   if(document.submit_problem){
                       for(var i=0;i<document.submit_problem.description.length;i++){

                           if( document.submit_problem.description[i].value==""){
                               document.submit_problem.description[i].value = " ";

                           }
                       }
                   }

                        myDropzone.processQueue();
                                       
                    
                     
                   
                    } else {
                        //for correct sending for in Firefox without files
                        var fd  = new FormData(document.forms["my-awesome-dropzone"]);
                        var xhr = new XMLHttpRequest();
                        xhr.addEventListener("load", function(event) {
                             if(scope.isLoggedIn())
                             {
                                scope.submitProblem();
                                scope.swipeHide("dropzone");
                                window.location.href="#/map";
                              }
                             else {
                     
                                scope.swipeHide("dropzone");
                                window.location.href="#/map";
                                alert('Ви не зареєстрований користувач, тому проблема спочатку пройде модерацію і потім буде додана на карту.');
                              }
                        });

                        // We define what will happen in case of error
                        xhr.addEventListener("error", function(event) {
                          //alert on error
                        });
                        xhr.open('POST', 'api/problempost');
                        xhr.send(fd); 
                                            
                     
                    }
            });
            myDropzone.on("addedfile", function(file) {
                var arr = document.getElementsByClassName("dz-preview");
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
                
         if(file.type!="image/jpeg"){
           myDropzone.removeFile(file);   
                alert("Невірний формат файлу. Допустимі формати : jpg,jpeg"); 
         }
                
            });

            myDropzone.on('successmultiple', function() {
                var currentLocation = window.location.href;
                if(scope.isLoggedIn()){
                   // scope.submitProblem();
                   // scope.swipeHide("dropzone");
                    window.location.href="#/map";
                    window.location.href=currentLocation;
                }
                else {
                     
                  //  scope.swipeHide("dropzone");
                    window.location.href="#/map";
                    window.location.href=currentLocation;




                    alert('Ви не зареєстрований користувач, тому проблема спочатку пройде модерацію і потім буде додана на карту.');
                }
            });
            
            //bind the given event handlers
            angular.forEach(config.eventHandlers,function (handler, event){
               drop.on(event, handler);
            });


        };

    });

});
