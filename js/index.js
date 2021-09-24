$(document).ready(function () {

    /////////Control input
    $("#firstname").on('input',function(e){
        $("#firstname").removeClass('error');
        $('#errorname').hide();
    });
    $("#phone").on('input',function(e){
        $("#phone").removeClass('error');
        $('#errorphone1').hide();
        $('#errorphone2').hide();
    });
    $("#email").on('input',function(e){
        $("#email").removeClass('error');
        $('#erroremail').hide();
    });

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    function isPhone(phone) {
        var regex = /^([0-9])$/;
        return regex.test(phone);
    }


    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;

    $(".next").click(function () {

        let val = 0;
        if (this.id==='step_1') {
            if ($('#firstname').val()===''){
                $("#firstname").addClass('error');
                $('#errorname').show();
                val = 1;
            }
        }
        if (this.id==='step_2') {
            if ($('#phone').val()===''){
                $("#phone").addClass('error');
                $('#errorphone1').show();
                val = 1;
            }
        }
        if (this.id==='step_3') {
            if ($('#email').val()===''){
                $("#email").addClass('error');
                $('#erroremail').show();
                val = 1;
            }
            if (!isEmail($('#email').val())){
                $("#email").addClass('error');
                $('#erroremail').show();
                val = 1;
            }
        }

        if (val===0){
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
            next_fs.show();
            current_fs.animate(
                { opacity: 0 },
                {
                    step: function (now) {
                        // for making fielset appear animation
                        opacity = 1 - now;
    
                        current_fs.css({
                            display: "none",
                            position: "relative",
                        });
                        next_fs.css({ opacity: opacity });
                    },
                    duration: 600,
                }
            );
            if (this.id==='step_3') {
                console.log($('#firstname').val());
                console.log($('#phone').val());
                console.log($('#email').val());

                    var formData = new FormData();
                    formData.append('firstname', $("#firstname").val());
                    formData.append('phone', $("#phone").val());
                    formData.append('email', $("#email").val());
                    // Attach file
                    $.ajax({
                      type: "POST",
                      url: "post_form.php",
                      data: formData,
                      contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                      processData: false, // NEEDED, DON'T OMIT THIS
                      success: function(response)
                      {
                        //Reseteo         
                        $("#firstname").val('');
                        $("#phone").val('');
                        $("#email").val('') ;
                      }
                    });
            }
        }

    });

    $(".previous").click(function () {
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate(
            { opacity: 0 },
            {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        display: "none",
                        position: "relative",
                    });
                    previous_fs.css({ opacity: opacity });
                },
                duration: 600,
            }
        );
    });

    $(".radio-group .radio").click(function () {
        $(this).parent().find(".radio").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".submit").click(function () {
        return false;
    });
});
