$(document).ready(function () {
    var zLID = 'z01';
    // if (!location.pathname.endsWith(zLID)) {
    //     location.href = '/zoneleader/' + zLID;
    // }
    if($('#clg1').hasClass('active'))
    {
        alert(zLID);
        $.ajax({
            type: 'GET',
            url: '/zoneleader/' + zLID,
            data: tempID,
            success: function (data) {
            location.href = '/zoneleader/' + zLID;
     });
    }
});