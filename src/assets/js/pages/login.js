/*! login.js | Wolfix | 2020-2021 */

$(document).ready(function () {
    $('#loginButton').on('click', function () {
        var dataForm = new FormData(document.getElementById('loginForm'));
        console.log(dataForm);
        $.ajax({
            type: "POST",
            url: 'https://help.wolfix.ro/conectare.php',
            processData: false,
            contentType: false,
            data: dataForm,
            success : function (response) {
                console.log(response)
                if(response.username){
                    $(".control").removeAttr("class");
                    document.getElementById("error-message").classList.add('is-hidden');
                    setTimeout(function(){location.href="/home.html"} , 500);
                } else{
                    document.getElementById("error-message").innerHTML = response.mesaj;
                    $(".control").each(function() {
                        $(this).addClass("has-validation has-error");
                    });
                }
            }
        });
    });
});