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
    var requestUrl = "https://cisco-presence.unit.ua/api/presence/v1/connected/";
    var type = document.getElementById("oneValueVisitors").value.replace('\”', '').replace('\”', '');

    requestUrl += type + "?siteId="+siteid;
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



    sendRequest(
        requestUrl,
        password2,
        'GET',
        null,
        function (data) {
            $("#oneValueVisitorsInfo").html(data);
        }
    );
}

    $('#active_user_count_btn').on('click', function () {

        $("#active_user_count").show();
        $("#floor_map").hide();
        $("#presence").hide();
        $("#correlation").hide();

    });

    $('#1st_Floor_btn').on('click', function () {

        sendRequest(
            imageUrl1,
            password,
            'GET',
            null,
            function () {
                console.log("success download floor image");
                $(".img_floor1").html('<img  width="100%" src="' + imageUrl1 + '" />');
            }
        );
        $(".img_floor1").show();
        $(".img_floor2").hide();
        $(".img_floor3").hide();


        $("#active_user_count").hide();
        $("#floor_map").show();
        $("#presence").hide();
        $("#correlation").hide();

    });
    $('#2nd_Floor_btn').on('click', function () {
        sendRequest(
            imageUrl2,
            password,
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
        $("#presence").hide();
        $("#correlation").hide();
    });
    $('#3rd_Floor_btn').on('click', function () {
        sendRequest(
            imageUrl3,
            password,
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
        $("#presence").hide();
        $("#correlation").hide();
    });

    $('#presence_btn').on('click', function () {
        $("#active_user_count").hide();
        $("#floor_map").hide();
        $("#presence").show();
        $("#correlation").hide();
    });

    $('#correlation_btn').on('click', function () {
        $("#active_user_count").hide();
        $("#floor_map").hide();
        $("#presence").hide();
        $("#correlation").show();
    });

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