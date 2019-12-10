$(document).ready(function () {
    
    var tempID;
    
    //Searching Data of Participant
    $('.sBtn').click(function () {
        tempID = $(".tempID").val();
        $.ajax({
            type: 'GET',
            url: '/campaigner/'+tempID,
            data: tempID,
            success: function (data) {
                location.href = '/campaigner/' + tempID;
            }
        });
    });
    // Payment Check-Box
    $('.payFlag').click(function () {
        tempID = $('.tempID').val();
        $.ajax({
            type: 'PUT',
            url: '/campaigner/payment/' + tempID,
            data: tempID,
            success: function (data) {
                location.href = '/campaiger/payment/' + tempID;
            }
        });
        $('.payFlag').prop("disabled", true);
    });

            // Afster Conformation CZ ID generated
            /*$.ajax({
                type: 'PUT',
                url: '/campaigner/payment/' + tempID,
                data: tempID,
                success: function (data) {
                    location.reload();
                }
            */

});