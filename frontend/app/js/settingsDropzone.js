Dropzone.options.myAwesomeDropzone = { 
    autoProcessQueue: false,
    url: "http://localhost:3000/",  //здесь нужно быть внимательным при конечном переносе проекта
    method: "POST",
    uploadMultiple: true,
    maxFilesize: 10,
    maxFiles: 10,
    parallelUploads: 10,
    thumbnailWidth: 100,
    thumbnailHeight: 100,
    clickable: "#previews",
    previewsContainer: "#previews",

    // The setting up of the dropzone
    init: function () {
        var submitButton = document.querySelector("#btn-submit");
        var myDropzone = this;
        var counter = 0;


        submitButton.addEventListener("click", function () {
            myDropzone.processQueue(); // Tell Dropzone to process all queued files.
        });

        this.on("addedfile", function (file) {
            var arr = document.getElementsByClassName("dz-preview");

            for (var i = counter; i < arr.length; i++) {
                arr[i].addEventListener('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
            }
            counter++;

            // Add the button to the file preview element.
            var removeButton = Dropzone.createElement("<div class='remove_btn'></div>");
            var commentField = Dropzone.createElement("<textarea type='text' class='comment_field' placeholder='Додайте короткий опис фото...' maxlength='200'></textarea>");

            file.previewElement.appendChild(removeButton);
            file.previewElement.appendChild(commentField);

            removeButton.addEventListener("click", myFunction);

            function myFunction(e) {
                myDropzone.removeFile(file);
                counter--;
                e.stopPropagation();
            };
        })
    }
}