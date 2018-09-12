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
    hourlyCountUrl += document.getElementById("oneValueHourly").value.replace('\”', '').replace('\”', '')+"?siteId="+siteid;
    console.log(hourlyCountUrl);
    sendRequest(
        hourlyCountUrl,
        password2,
        'GET',
        null,
        function (data) {

            console.log(data[0]);
            google.charts.setOnLoadCallback(function () {
                drawHourlyGraph(data);
            });
        }
    );
}

    $('#active_user_count_btn').on('click', function () {

        $("#active_user_count").show();
        $("#floor_map").hide();
        $("#presence").hide();

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
    });

    $('#presence_btn').on('click', function () {
        $("#active_user_count").hide();
        $("#floor_map").hide();
        $("#presence").show();
        console.log("show");
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