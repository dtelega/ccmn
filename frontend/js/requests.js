
// $.ajaxSetup({
//     dataType : 'json',
//     beforeSend: function(xhr) {
//         xhr.setRequestHeader('Authorization', "Basic " + btoa(username + ":" + password));
//     }
// });


sendRequest(
    floorUrl,
    'GET',
    null,
    function (data) {
        google.charts.setOnLoadCallback(function () {
            drawChartTotalUsers(data)
        });
    }
);

$('#1st_Floor_btn').on('click', function(){

    $.ajax({
        url : imageUrl1,
        cache: true,
        processData : false,
        beforeSend : function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
    }).always(function(){
        $(".img_floor1").attr("src", imageUrl1).show();
    });

    // sendRequest(
    //     imageUrl1,
    //     'GET',
    //     null,
    //     function () {
    //         console.log("success download floor image");
    //         $(".img_floor1").html('<img  width="100%" src="' + imageUrl1 + '" />');
    //     }
    // );
    $(".img_floor1").show();
    $(".img_floor2").hide();
    $(".img_floor3").hide();


    $("#active_user_count").hide();
    $("#floor_map").show();

});
$('#2nd_Floor_btn').on('click', function() {
    sendRequest(
        imageUrl2,
        'GET',
        null,
        function () {
            console.log("success download floor image");
            $(".img_floor2").html('<img  width="100%" src="' + imageUrl2 + '" />');
        }
    );
    $(".img_floor1").hide();
    $(".img_floor2").show();
    $(".img_floor3").hide();

    $("#active_user_count").hide();
    $("#floor_map").show();
});
$('#3rd_Floor_btn').on('click', function() {
    sendRequest(
        imageUrl3,
        'GET',
        null,
        function () {
            console.log("success download floor image");
            $(".img_floor3").html('<img width="100%" src="' + imageUrl3 + '" />');
        }
    );
    $(".img_floor1").hide();
    $(".img_floor2").hide();
    $(".img_floor3").show();

    $("#active_user_count").hide();
    $("#floor_map").show();
});