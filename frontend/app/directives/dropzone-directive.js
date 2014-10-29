define(['./module','dropzone'], function(directives,Dropzone){
    directives.directive('drop', function(){
        return {

            link: function (scope, element, attrs) {


                    var config, drop;
                    config = scope[attrs.drop];
                    //create a Dropzone for the element with the given options

                    drop = new Dropzone(element[0], config.options);
                    var submitButton = document.querySelector("#btn-submit");
                    var sizeOfAllPhotos = 0;
                    var myDropzone = drop;

                    myDropzone.filesize = function (size) {
                        var string;
                        if (size >= 1024 * 1024 * 1024 * 1024 / 10) {
                            size = size / (1024 * 1024 * 1024 * 1024 / 10);
                            string = "ТБ";
                        } else if (size >= 1024 * 1024 * 1024 / 10) {
                            size = size / (1024 * 1024 * 1024 / 10);
                            string = "ГБ";
                        } else if (size >= 1024 * 1024 / 10) {
                            size = size / (1024 * 1024 / 10);
                            string = "MБ";
                        } else if (size >= 1024 / 10) {
                            size = size / (1024 / 10);
                            string = "KБ";
                        } else {
                            size = size * 10;
                            string = "байт";
                        }
                        return "<strong>" + (Math.round(size) / 10) + "</strong> " + string;
                    };
                    var counter = 0;
                    submitButton.addEventListener("click", function () {

                        if (myDropzone.files.length > 0) {
                            if (document.upload_photo) {
                                for (var i = 0; i < document.upload_photo.description.length; i++) {

                                    if (document.upload_photo.description[i].value == "") {
                                        document.upload_photo.description[i].value = " ";

                                    }
                                }
                            }
                            if (document.submit_problem) {
                                for (var i = 0; i < document.submit_problem.description.length; i++) {

                                    if (document.submit_problem.description[i].value == "") {
                                        document.submit_problem.description[i].value = " ";

                                    }
                                }
                            }

                            myDropzone.processQueue();


                        } else {
                            //for correct sending for in Firefox without files
                            var fd = new FormData(document.forms["my-awesome-dropzone"]);
                            var xhr = new XMLHttpRequest();
                            xhr.addEventListener("load", function (event) {
                                if (scope.isLoggedIn()) {
                                    scope.submitProblem();
                                    scope.swipeHide("dropzone");
                                    window.location.href = "#/map";
                                }
                                else {

                                    scope.swipeHide("dropzone");
                                    window.location.href = "#/map";
                                    alert('Ви не зареєстрований користувач, тому проблема спочатку пройде модерацію і потім буде додана на карту.');
                                }
                            });

                            // We define what will happen in case of error
                            xhr.addEventListener("error", function (event) {
                                //alert on error
                            });
                            xhr.open('POST', 'api/problempost');
                            xhr.send(fd);


                        }
                    });
                    myDropzone.on("addedfile", function (file) {

                        var arr = document.getElementsByClassName("dz-preview");
                        for (var i = counter; i < arr.length; i++) {
                            arr[i].addEventListener('click', function (e) {
                                e.stopPropagation();
                                e.preventDefault();
                            });
                        }
                        var arr = document.getElementsByClassName("dropFieldForShowProblem");
                        for (var i = counter; i < arr.length; i++) {
                            arr[i].addEventListener('click', function (e) {
                                e.stopPropagation();
                                e.preventDefault();
                            });
                        }


                        counter++;

                        // Add the button to the file preview element.
                        var removeButton = Dropzone.createElement("<div class='remove_btn'><i class='fa fa-close remove_btn-fa-close'></i></div>");
                        var commentField = Dropzone.createElement("<textarea type='text' name='description" + "' class='comment_field' placeholder='Додайте  опіс до фото...' maxlength='200'></textarea>");

                        file.previewElement.appendChild(removeButton);
                        file.previewElement.appendChild(commentField);
                        console.log(file.previewElement);

                        removeButton.addEventListener("click", myFunction);

                        function myFunction(e) {
                            sizeOfAllPhotos -= file.size;
                            scope.fileSizeLeft = ((20 * 1024 * 1024 - sizeOfAllPhotos) / 1024 / 1024).toFixed(2);
                            scope.fileCountLeft++;


                            myDropzone.removeFile(file);
                            counter--;
                            e.stopPropagation();
                        };
                        console.log(file);
                        if (file.type != "image/jpeg") {
                            myDropzone.removeFile(file);
                            alert("Невірний формат файлу. Допустимі формати : jpg,jpeg");
                        } else if (myDropzone.files.length == 11) {
                            myDropzone.removeFile(file);
                            alert("Максимальна кількість файлів не може перевищувати 10");
                        } else if (file.size >= 10 * 1024 * 1024) {
                            myDropzone.removeFile(file);
                            alert("Розмір одного файлу не може перевищувати 10 МБ ");
                        } else {

                            sizeOfAllPhotos += file.size;
                            scope.fileCountLeft--;
                            scope.fileSizeLeft = ((20 * 1024 * 1024 - sizeOfAllPhotos) / 1024 / 1024).toFixed(2);
                            if (sizeOfAllPhotos >= 20 * 1024 * 1024) {
                                sizeOfAllPhotos -= file.size;
                                myDropzone.removeFile(file);
                                scope.fileCountLeft++;
                                alert("Максімальній розмір файлів не може перевищувати 20 МБ ");
                            }
                        }


                    });

                    myDropzone.on('successmultiple', function () {
                        var currentLocation = window.location.href;
                        if (scope.isLoggedIn()) {
                            // scope.submitProblem();
                            // scope.swipeHide("dropzone");
                            window.location.href = "#/map";
                            window.location.href = currentLocation;
                        }
                        else {

                            //  scope.swipeHide("dropzone");
                            window.location.href = "#/map";
                            window.location.href = currentLocation;


                            alert('Ви не зареєстрований користувач, тому проблема спочатку пройде модерацію і потім буде додана на карту.');
                        }
                    });


                    //bind the given event handlers
                    angular.forEach(config.eventHandlers, function (handler, event) {
                        drop.on(event, handler);
                    });

                    //create dropzone preview

                    //
                }
            }


});

});
