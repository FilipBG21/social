/*! signup.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Signup Process JS
========================================================================== */

Dropzone.autoDiscover = false;

$(document).ready(function () {

    "use strict";

    $('.progress-wrap .dot').on('click', function () {
        var $this = $(this);
        var stepValue = $this.attr('data-step');
        $this.closest('.progress-wrap').find('.bar').css('width', stepValue + '%');
        $this.siblings('.dot').removeClass('is-current');
        $this.addClass('is-active is-current');
        $this.prevAll('.dot').addClass('is-active');
        $this.nextAll('.dot').removeClass('is-active');

        $('.process-panel-wrap').removeClass('is-active');
        $('.step-title').removeClass('is-active');

        if (stepValue == '0') {
            $('#signup-panel-1, #step-title-1').addClass('is-active');
        }

        else if (stepValue == '25') {
            $('#signup-panel-2, #step-title-2').addClass('is-active');
        }

        else if (stepValue == '50') {
            $('#signup-panel-3, #step-title-3').addClass('is-active');
        }

        else if (stepValue == '75') {
            $('#signup-panel-4, #step-title-4').addClass('is-active');
        }

        else if (stepValue == '100') {
            $('#signup-panel-5, #step-title-5').addClass('is-active');
        }
    })

    $('.process-button').on('click', function () {
        var $this = $(this);
        var targetStepDot = $this.attr('data-step');
        $this.addClass('is-loading');
        setTimeout(function () {
            $this.removeClass('is-loading');
            $('#' + targetStepDot).trigger('click');
        }, 800);
    })


    $('#register-btn').on('click', function () {
        var dataForm = new FormData(document.getElementById('registerForm'));
        var completeForm = (dataForm);
        console.log(completeForm);
        $.ajax({
            type: "POST",
            url: 'https://help.wolfix.ro/inregistrare.php',
            processData: false,
            contentType: false,
            data: dataForm,
        });
    });

    $('#signup-panel-2 input').keyup(function() {
        var empty = false;
        $('#signup-panel-2 input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if(document.getElementById('flexRadioDefault1').checked) {
            empty = false;
        }
        else if(document.getElementById('flexRadioDefault2').checked) {
            empty = false;

        }



        if (empty) {
            $('#signup-panel-2 .is-next').attr('disabled', 'disabled');
            console.log('necompletat')
        } else {
            $('#signup-panel-2 .is-next').removeAttr('disabled');
        }
    });

    $('#signup-panel-4 input').keyup(function() {
        var empty = false;
        $('#signup-panel-4 input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('#signup-panel-4 .is-next').attr('disabled', 'disabled');
            console.log('necompletat')
        } else {
            $('#signup-panel-4 .is-next').removeAttr('disabled');
        }
    });


    $('#signup-finish').on('click', function () {
        var $this = $(this);
        var url = '/navbar-v1-feed.html';
        $this.addClass('is-loading');
        setTimeout(function () {
            window.location = url;
        }, 800)
    })

})