(function ($) {
    $(document).ready(function () {
        function showProblem() {
            $(".b-right-side__add-problem").css("display", "none");
            $(".b-right-side__show-problem").css("display", "inline-block");
            $(".b-container__right-side").css("display", "block");

            map.setView([arguments[0].latlng.lat, arguments[0].latlng.lng]);
            console.log(arguments);
        }
        $(".b-header__add-problem").click(function () {
            $(".b-right-side__show-problem").css("display", "none");
            $(".b-right-side__add-problem").css("display", "inline-block");
            $(".b-container__right-side").css("display", "block");
        });
        $(".b-right-side__pointer").click(function () {
            $(".b-container__right-side").css("display", "none");
        });

        $(".b-left-side__pointer").click(function () {
            if ($(".b-container__left-side").css("left") == "0px") {
                $(".b-container__left-side").css("left", "-300px");
                $(".b-left-side__pointer").css("background-position", "-40px center")

            } else {
                $(".b-container__left-side").css("left", "0px");
                $(".b-left-side__pointer").css("background-position", "-7px center")
            }

        });



    });


})(jQuery);

function showRegForm() {
    $(".b-form__hidden-item").css("display", "inline-block");
    // $(".b-header__sign-up").css("width","300px");
    //$(".b-header__sign-up").css("height","250px");
    $(".b-form__only-login-form").css("display", "none");


}
