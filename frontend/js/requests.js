// function startSendRequests() {
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

function chartDrawType() {
    var hourlyCountUrl = 'https://cisco-presence.unit.ua/api/presence/v1/connected/';
    var type = document.getElementById("oneValueHourly").value.replace('\”', '').replace('\”', '');
    hourlyCountUrl += type+"?siteId="+siteid;

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
                drawHourlyGraph(data, type);
            });
        }
    );
}

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
            if (apiType !== "repeatvisitors/")
                $("#oneValueVisitorsInfo").html(data);
            else {
                $("#repeatVisitorsInfoDaily").html(data.DAILY);
                $("#repeatVisitorsInfoWeekly").html(data.WEEKLY);
                $("#repeatVisitorsInfoOccas").html(data.OCCASIONAL);
                $("#repeatVisitorsInfoFirst").html(data.FIRST_TIME);
                $("#repeatVisitorsInfoYesterday").html(data.YESTERDAY);
            }
        }
    );
}

// }
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
        }
    });
}