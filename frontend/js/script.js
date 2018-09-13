
var siteid; // 1513804707441
var username;
var password;
var password2;
// Credentials
function getLogin() {
    username = $('#login').val();
    console.log('Username '+username);
}
function getPasswordCmx() {
    password = $('#password-cmx').val();
    console.log('Password: '+password);
}
function getPasswordPrecense() {
    password2 = $('#password-precense').val();
    console.log('Password: '+password);
}

// delete this credentials
username = 'RO';
password = 'just4reading';
password2 = 'Passw0rd';
// ***********************

// url

const floorUrl = 'https://cisco-cmx.unit.ua/api/analytics/v1/now/clientCount';

const imageUrl = 'https://cisco-cmx.unit.ua/api/config/v1/maps/image/System%20Campus/UNIT.Factory/';

const siteInfoUrl = 'https://cisco-presence.unit.ua/api/config/v1/sites';






$('#active_user_count_btn').on('click', function () {
    $("#active_user_count").show();
    $("#floor_map").hide();
    $("#correlation").hide();
});

$("#oneValueVisitors").change(function () {
    var type = document.getElementById("oneValueVisitors").value.replace('\”', '').replace('\”', '');

    console.log(apiType);
    console.log(type);
    if (type === "count") {
        $("#oneValueDate").show();
        $("#oneValueStartDate").hide();
        $("#oneValueEndDate").hide();
    }
    else if (type === "total") {
        $("#oneValueDate").hide();
        $("#oneValueStartDate").show();
        $("#oneValueEndDate").show();
    }
    else {
        $("#oneValueDate").hide();
        $("#oneValueStartDate").hide();
        $("#oneValueEndDate").hide();
    }

});

$("#apiType").change(function () {
    var apiType = document.getElementById("apiType").value.replace('\”', '').replace('\”', '');

    if (apiType === "repeatvisitors/") {
        $("#repeatVisitorsInfo").show();
    }
    else
        $("#repeatVisitorsInfo").hide();
});

$("#oneValueHourly").change(function () {
    var type = document.getElementById("oneValueHourly").value.replace('\”', '').replace('\”', '');

    if (type === "hourly") {
        $("#dravHourlyDate").show();
    }
    else {
        $("#dravHourlyDate").hide();
    }
});





