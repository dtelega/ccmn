
$('#active_user_count_btn').on('click', function () {

    $("#active_user_count").show();
    $("#floor_map").hide();
    $("#presence").hide();
    $("#correlation").hide();
    $("#kpi").hide();

});

$('#1st_Floor_btn').on('click', function () {

    // $.ajax({
    //     url : floorUrl,
    //     cache: true,
    //     processData : false,
    //     responseType: 'blob',
    //     headers: {
    //         "Authorization": "Basic " + btoa(username + ":" + password)
    //     },
    //     success: function (data) {
    //         var image = new Image();
    //         image.src = imageUrl.createObjectURL(data);
    //         $('.img_floor1').append(image).removeClass('hidden').addClass('visible');
    //         image.onload = function() { var imageWidth = image.width/2; $('.img_floor1').css({'margin-left':'-'+imageWidth+'px'}) };
    //         // $('#overlay').removeClass('hidden').addClass('visible');
    //     }
    // }).always(function(){
    //     $("#img-floor").attr("src", floorUrl);
    // });



    // sendRequest(
    //     imageUrl+"1st_Floor",
    //     password,
    //     'GET',
    //     null,
    //     function () {
    //         console.log("success download floor image");
    //         $(".img_floor1").html('<img  width="100%" src="' + imageUrl+"1st_Floor" + '" />');
    //     }
    // );
    $(".img_floor1").show();
    $(".img_floor2").hide();
    $(".img_floor3").hide();


    $("#active_user_count").hide();
    $("#floor_map").show();
    $("#presence").hide();
    $("#correlation").hide();
    $("#kpi").hide();

});
$('#2nd_Floor_btn').on('click', function () {
    sendRequest(
        imageUrl+"2nd_Floor",
        password,
        'GET',
        null,
        function () {
            console.log("success download floor image");
            $(".img_floor2").html('<img  width="100%" src="' + imageUrl+"2nd_Floor" + '" />');
        }
    );
    $(".img_floor1").hide();
    $(".img_floor2").show();
    $(".img_floor3").hide();

    $("#active_user_count").hide();
    $("#floor_map").show();
    $("#presence").hide();
    $("#correlation").hide();
    $("#kpi").hide();
});
$('#3rd_Floor_btn').on('click', function () {
    sendRequest(
        imageUrl+"3rd_Floor",
        password,
        'GET',
        null,
        function () {
            console.log("success download floor image");
            $(".img_floor3").html('<img width="100%" src="' + imageUrl+"3rd_Floor" + '" />');
        }
    );
    $(".img_floor1").hide();
    $(".img_floor2").hide();
    $(".img_floor3").show();

    $("#active_user_count").hide();
    $("#floor_map").show();
    $("#presence").hide();
    $("#correlation").hide();
    $("#kpi").hide();
});

$('#presence_btn').on('click', function () {
    $("#active_user_count").hide();
    $("#floor_map").hide();
    $("#presence").show();
    $("#correlation").hide();
    $("#kpi").hide();
});

$('#correlation_btn').on('click', function () {
    $("#active_user_count").hide();
    $("#floor_map").hide();
    $("#presence").hide();
    $("#correlation").show();
    $("#kpi").hide();
});

$('#kpi_btn').on('click', function () {
    $("#active_user_count").hide();
    $("#floor_map").hide();
    $("#presence").hide();
    $("#correlation").hide();
    $("#kpi").show();
    kpisummary();
});