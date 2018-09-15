
/*
 *  URL for request
 *
 */

// active user count
const floorUrl = 'https://cisco-cmx.unit.ua/api/analytics/v1/now/clientCount';

// for floor image download
const imageUrl = 'https://cisco-cmx.unit.ua/api/config/v1/maps/image/System%20Campus/UNIT.Factory/';

// for siteId
const siteInfoUrl = 'https://cisco-presence.unit.ua/api/config/v1/sites';


// function startSendRequests() {

//    get siteId
sendRequest(
        siteInfoUrl,
        password2,
        'GET',
        null,
        function (data) {
            siteid = data["0"].aesUId;
            console.log("get siteId " + siteid);
        }
    );

//    request for active user count by floor
function chartDrawFloor() {
    sendRequest(
        floorUrl,
        password,
        'GET',
        null,
        function (data) {
            google.charts.setOnLoadCallback(function () {
                drawChartTotalUsers(data);
            });
        }
    );
}

//    get correlation hourly
function chartDrawType() {
    var hourlyCountUrl = 'https://cisco-presence.unit.ua/api/presence/v1/';
    var type = document.getElementById("oneValueHourly").value.replace('\”', '').replace('\”', '');
    var apiType = document.getElementById("apiTypeHourly").value.replace('\”', '').replace('\”', '');
    hourlyCountUrl += apiType + type+"?siteId="+siteid;

    if (type === "hourly") {
        hourlyCountUrl += "&date=";
        hourlyCountUrl += $("#dravHourlyDate").val();
    }

    console.log(hourlyCountUrl);

    sendRequest(
        hourlyCountUrl,
        password2,
        'GET',
        null,
        function (data) {
            google.charts.setOnLoadCallback(function () {
                if ($("#apiTypeHourly").val() === "dwell/" && type !=="hourly/3days" ) {
                    drawHorlyGraphDwell(data, type,
                        'FIVE_TO_THIRTY_MINUTES',
                        'THIRTY_TO_SIXTY_MINUTES',
                        'ONE_TO_FIVE_HOURS',
                        'FIVE_TO_EIGHT_HOURS',
                        'EIGHT_PLUS_HOURS');
                } else if ($("#apiTypeHourly").val() === "dwell/" || $("#apiTypeHourly").val() === "repeatvisitors/" && type ==="hourly/3days" ) {
                    alert("Sry ;( not available now");
                } else if ($("#apiTypeHourly").val() === "repeatvisitors/") {
                    drawHorlyGraphDwell(data, type,
                        'DAILY',
                        'WEEKLY',
                        'OCCASIONAL',
                        'FIRST_TIME',
                        'YESTERDAY');
                } else if (type === "hourly/3days") {
                    drawHorlyThreeDays(data, type);
                } else
                    drawHourlyGraph(data, type);
            });
        }
    );
}


//    get request for Analitics and presence
function getOneValueVisitorsInfo() {
    var requestUrl = "https://cisco-presence.unit.ua/api/presence/v1/";
    var apiType = $("#apiType").val();
    var type = document.getElementById("oneValueVisitors").value.replace('\”', '').replace('\”', '');

    requestUrl += apiType + type + "?siteId="+siteid;
    if (type === "count") {
        requestUrl += "&date=";
        requestUrl += $("#oneValueDate").val();
    }
    if (type === "total") {
        requestUrl += "&startDate=";
        requestUrl += $("#oneValueStartDate").val();
        requestUrl += "&endDate=";
        requestUrl += $("#oneValueEndDate").val();
    }
    console.log(requestUrl);
    sendRequest(
        requestUrl,
        password2,
        'GET',
        null,
        function (data) {
            if (apiType === "repeatvisitors/"){
                $("#repeatVisitorsInfoDaily").html("DAILY: "+data.DAILY);
                $("#repeatVisitorsInfoWeekly").html("WEEKLY: "+data.WEEKLY);
                $("#repeatVisitorsInfoOccas").html("OCCASIONAL: "+data.OCCASIONAL);
                $("#repeatVisitorsInfoFirst").html("FIRST_TIME: "+data.FIRST_TIME);
                $("#repeatVisitorsInfoYesterday").html("YESTERDAY: "+data.YESTERDAY);
            }
            else if (apiType === "dwell/") {
                $("#repeatVisitorsInfoDaily").html("FIVE_TO_THIRTY_MINUTES: "+data.FIVE_TO_THIRTY_MINUTES);
                $("#repeatVisitorsInfoWeekly").html("THIRTY_TO_SIXTY_MINUTES: "+data.THIRTY_TO_SIXTY_MINUTES);
                $("#repeatVisitorsInfoOccas").html("ONE_TO_FIVE_HOURS: "+data.ONE_TO_FIVE_HOURS);
                $("#repeatVisitorsInfoFirst").html("FIVE_TO_EIGHT_HOURS: "+data.FIVE_TO_EIGHT_HOURS);
                $("#repeatVisitorsInfoYesterday").html("EIGHT_PLUS_HOURS: "+data.EIGHT_PLUS_HOURS);
            }
            else  {
                $("#oneValueVisitorsInfo").html(data);
            }
        }
    );
}

// }

// main func for ajax requests
function sendRequest(url, pass, type, payload, success) {
    $.ajax({
        type:type,
        url:url,
        // dataType: 'json',
        // contentType: "image/png",
        data:payload,
        headers: {
            "Authorization": "Basic " + btoa(username + ":" + pass)
        },
        success: success,
        error: function(){
            console.log('error ajax request!');
        },
        statusCode: {
            404: function () {
                alert('Sry ;( not available now');
            }
        }
    });
}