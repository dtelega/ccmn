
$('#active_user_count_btn').on('click', function () {

    $("#active_user_count").show();
    $("#floor_map").hide();
    $("#presence").hide();
    $("#correlation").hide();
    $("#kpi").hide();
    $("#authors").hide();
    $('#forecasting').hide();

});

$('#1st_Floor_btn').on('click', function () {
    imageRequest('1st_Floor', null);

    $(".img1st_Floor").show();
    $(".img2nd_Floor").hide();
    $(".img3rd_Floor").hide();

    $("#active_user_count").hide();
    $("#floor_map").show();
    $("#presence").hide();
    $("#correlation").hide();
    $("#kpi").hide();
    $("#authors").hide();

    // del svg
    $(".img2nd_Floor").html("");
    $(".img3rd_Floor").html("");

    $('#findMapClient').hide();
    $('#forecasting').hide();
});
$('#2nd_Floor_btn').on('click', function () {
    imageRequest('2nd_Floor', null);

    $(".img1st_loor").hide();
    $(".img2nd_Floor").show();
    $(".img3rd_Floor").hide();

    $("#active_user_count").hide();
    $("#floor_map").show();
    $("#presence").hide();
    $("#correlation").hide();
    $("#kpi").hide();
    $("#authors").hide();

    $(".img1st_Floor").html("");
    $(".img3rd_Floor").html("");

    $('#findMapClient').hide();
    $('#forecasting').hide();

});
$('#3rd_Floor_btn').on('click', function () {
    imageRequest('3rd_Floor', null);
    $(".img1st_Floor").hide();
    $(".img2nd_Floor").hide();
    $(".img3rd_Floor").show();

    $("#active_user_count").hide();
    $("#floor_map").show();
    $("#presence").hide();
    $("#correlation").hide();
    $("#kpi").hide();
    $("#authors").hide();

    $(".img1st_Floor").html("");
    $(".img2nd_Floor").html("");

    $('#findMapClient').hide();
    $('#forecasting').hide();
});


$('#presence_btn').on('click', function () {
    $("#active_user_count").hide();
    $("#floor_map").hide();
    $("#presence").show();
    $("#correlation").hide();
    $("#kpi").hide();
    $("#authors").hide();
    $('#forecasting').hide();
});

$('#correlation_btn').on('click', function () {
    $("#active_user_count").hide();
    $("#floor_map").hide();
    $("#presence").hide();
    $("#correlation").show();
    $("#kpi").hide();
    $("#authors").hide();
    $('#forecasting').hide();
});

$('#kpi_btn').on('click', function () {
    $("#active_user_count").hide();
    $("#floor_map").hide();
    $("#presence").hide();
    $("#correlation").hide();
    $("#kpi").show();
    $("#authors").hide();
    $('#forecasting').hide();
    kpisummary();
});

$('#forecasting_btn').on('click', function () {
    $("#active_user_count").hide();
    $("#floor_map").hide();
    $("#presence").hide();
    $("#correlation").hide();
    $("#kpi").hide();
    $("#authors").hide();
    $('#forecasting').show();
});