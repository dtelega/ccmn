
// Load the Visualization API and the corechart package.

google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChartTotalUsers(data) {
    console.log(data);
    // Create the data table.
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Floor');
    chartData.addColumn('number', 'UserCount');
    $(data.data).each(
        function (idx, floorInfo) {
            if (floorInfo.floorName.indexOf('Floor') !== - 1) {
                //console.log(floorInfo);
                chartData.addRow([floorInfo.floorName, floorInfo.value]);
            }
        }
    );

    // Set chart options
    var options = {
        'title': 'Total active user count = '+ data.total.total,
        'width': 1200,
        'height': 700
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(chartData, options);
}


// Credentials
function getLogin() {
    username = $('#login').val();
    console.log('Username '+username);
}
function getPassword() {
    password = $('#password').val();
    console.log('Password: '+password);
}

// delete this credentials
username = 'RO';
password = 'just4reading';
// ***********************

// url
var urlImageVersion = 'https://cisco-presence.unit.ua/api/config/v1/version/image';
var urlAllUser = 'https://cisco-presence.unit.ua/api/config/v1/aaa/users';

var floorUrl = 'https://cisco-cmx.unit.ua/api/analytics/v1/now/clientCount';
var visitorsYesterdayUrl = 'https://cisco-cmx.unit.ua/api/presence/v1/connected/count/yesterday';

var imageUrl1 = 'https://cisco-cmx.unit.ua/api/config/v1/maps/image/System%20Campus/UNIT.Factory/1st_Floor';
var imageUrl2 = 'https://cisco-cmx.unit.ua/api/config/v1/maps/image/System%20Campus/UNIT.Factory/2nd_Floor';
var imageUrl3 = 'https://cisco-cmx.unit.ua/api/config/v1/maps/image/System%20Campus/UNIT.Factory/3rd_Floor';
//function startSendRequests() {

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
    sendRequest(
        imageUrl1,
        'GET',
        null,
        function () {
            console.log("success download floor image");
            $(".img_floor1").html('<img  width="500px" src="' + imageUrl1 + '" />');
        }
    );
    $(".img_floor1").show();
    $(".img_floor2").hide();
    $(".img_floor3").hide();

});

$('#2nd_Floor_btn').on('click', function() {
    sendRequest(
        imageUrl2,
        'GET',
        null,
        function () {
            console.log("success download floor image");
            $(".img_floor2").html('<img  width="500px" src="' + imageUrl2 + '" />');
        }
    );
    $(".img_floor1").hide();
    $(".img_floor2").show();
    $(".img_floor3").hide();
});

$('#3rd_Floor_btn').on('click', function() {
    sendRequest(
        imageUrl3,
        'GET',
        null,
        function () {
            console.log("success download floor image");
            $(".img_floor3").html('<img width="500px" src="' + imageUrl3 + '" />');
        }
    );
    $(".img_floor1").hide();
    $(".img_floor2").hide();
    $(".img_floor3").show();
});

function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}


/*
 *      File to base64
 * */

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}



//}


function sendRequest(url, type, payload, success) {
    $.ajax({
        type:type,
        url:url,
        // dataType: 'json',
        contentType: "image/png",
        data:payload,
        headers: {
            "Authorization": "Basic " + btoa(username + ":" + password)
        },
        success: success,
        error: function(url){
            console.log('error ajax request!');
        }
    });





}




