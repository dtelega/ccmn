
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

//    get image
function imageRequest(floorName, macAddress) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob'; //so you can access the response like a normal URL
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            var img = document.createElement('img');
            img.src = URL.createObjectURL(xhr.response); //create <img> with src set to the blob
            img.useMap = '#img'+floorName; //create <img> with src set to the blob
            $('.img'+floorName).html(img);

            // add circles on map
            drawCircle(floorName, macAddress);

        }
    };
    xhr.open('GET', imageUrl+floorName, true);
    xhr.setRequestHeader('Authorization', "Basic " + btoa(username + ":" + password));
    xhr.send();
}

function drawCircle(floorName, macAddress) {

    sendRequest(
        'https://cisco-cmx.unit.ua/api/location/v2/clients',
        password,
        'GET',
        null,
        function (data) {
            $.each(data, function(key){

                console.log(floorName);

                if (data[key].mapInfo.mapHierarchyString.indexOf(floorName) !== -1) {
                    if (macAddress === data[key].macAddress) {

                        // draw one big circle
                        if (data[key].macAddress.indexOf(macAddress) !== -1) {
                            $('.img'+floorName).append(
                                "<svg height='10' width='10' >"
                                + "<circle cx='" + data[key].mapCoordinate.x
                                + "' cy='" + data[key].mapCoordinate.y
                                + "' r='11' stroke-width='3' stroke='black' fill='yellow'>"
                                + "<title>" + data[key].macAddress + "</title>"
                                + "</circle></svg>"
                            );
                        }
                    } else {
                        $('.img'+floorName).append(
                            "<svg height='10' width='10'>"
                            + "<circle id='"+data[key].macAddress+"' cx='" + data[key].mapCoordinate.x
                            + "' cy='" + data[key].mapCoordinate.y
                            + "' r='7' stroke-width='3' stroke='black' fill='red' onclick='findThisClient($(this).attr(\"id\"))'>"
                            + "<title>" + data[key].macAddress + "</title>"
                            + "</circle></svg>"
                        );
                    }

                }
            });

        }
    );

}

// draw one circle on click on map and show info for it
function findThisClient(macAddress) {
    if($('.img2nd_Floor').css('display') === 'none' && $('.img3rd_Floor').css('display') === 'none') {
        console.log('1st_Floor: ' + macAddress);
        // imageRequest('1st_Floor', macAddress);
    } else if ($('.img1st_Floor').css('display') === 'none' && $('.img3rd_Floor').css('display') === 'none') {
        // imageRequest('2nd_Floor', macAddress);
        console.log('2nd_Floor: ' + macAddress);
    } else if ($('.img1st_Floor').css('display') === 'none' && $('.img2nd_Floor').css('display') === 'none') {
        // imageRequest('3rd_Floor', macAddress);
        console.log('3rd_Floor: ' + macAddress);
    }
    getClientInfo(macAddress);
}

// get client info
function getClientInfo(macAddress) {

    $('#findMapClient').show();
    if (macAddress === null)
        macAddress = $("#macAddressInput").val();
    sendRequest(
        'https://cisco-cmx.unit.ua/api/location/v2/clients?macAddress='+macAddress,
        password,
        'GET',
        null,
        function (data) {
            console.log('https://cisco-cmx.unit.ua/api/location/v2/clients?macAddress='+macAddress);
            console.log(data);
            if (data === undefined){
                alert('MacAddress does not exist!');
                return;
            }

            $("#floorMacAddress").html(data[0].macAddress);
            $("#mapHierarchyString").html(data[0].mapInfo.mapHierarchyString);
            $("#firstLocatedTime").html(data[0].statistics.firstLocatedTime);
            $("#lastLocatedTime").html(data[0].statistics.lastLocatedTime);
            $("#networkStatus").html(data[0].networkStatus);
            $("#manufacturer").html(data[0].manufacturer);
            $("#bytesSent").html(data[0].bytesSent);
            $("#bytesReceived").html(data[0].bytesReceived);


            if (data[0].mapInfo.mapHierarchyString.indexOf('1st_Floor') !== -1) {

                $(".img1st_Floor").show();
                $(".img2nd_Floor").hide();
                $(".img3rd_Floor").hide();

                $(".img1st_Floor").html("");
                $(".img2nd_Floor").html("");
                $(".img3rd_Floor").html("");

                imageRequest('1st_Floor', data[0].macAddress);
                //
            }
            else if (data[0].mapInfo.mapHierarchyString.indexOf('2nd_Floor') !== -1){
                $(".img1st_Floor").hide();
                $(".img2nd_Floor").show();
                $(".img3rd_Floor").hide();

                $(".img1st_Floor").html("");
                $(".img2nd_Floor").html("");
                $(".img3rd_Floor").html("");

                imageRequest('2nd_Floor', data[0].macAddress);
            }
            else if (data[0].mapInfo.mapHierarchyString.indexOf('3rd_Floor') !== -1) {
                $(".img1st_Floor").hide();
                $(".img2nd_Floor").hide();
                $(".img3rd_Floor").show();

                $(".img1st_Floor").html("");
                $(".img2nd_Floor").html("");
                $(".img3rd_Floor").html("");

                imageRequest('3rd_Floor', data[0].macAddress);
            }

        }
    )
}

//    get correlation hourly
function chartDrawType() {
    var hourlyCountUrl = 'https://cisco-presence.unit.ua/api/presence/v1/';
    var type = document.getElementById("oneValueHourly").value.replace('\”', '').replace('\”', '');
    var apiType = document.getElementById("apiTypeHourly").value.replace('\”', '').replace('\”', '');
    hourlyCountUrl += apiType + type+"?siteId="+siteid;

    var date2 = null;
    var date1 = null;
    if (type === "hourly") {
        hourlyCountUrl += "&date=";
        date1 = Math.round((new Date($("#dravHourlyDate").datepicker().val()).getTime()) / 1000);
        hourlyCountUrl += $("#dravHourlyDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
    } else if (type === 'daily') {
        date1 = Math.round((new Date($("#dravHourlyStartDate").datepicker().val()).getTime()) / 1000);
        date2 = Math.round((new Date($("#dravHourlyEndDate").datepicker().val()).getTime()) / 1000);
        hourlyCountUrl += "&startDate=" + $("#dravHourlyStartDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
        hourlyCountUrl += "&endDate=" + $("#dravHourlyEndDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
    }

    if (!correctDate(date1, date2))
        return;
    console.log(hourlyCountUrl);

    sendRequest(
        hourlyCountUrl,
        password2,
        'GET',
        null,
        function (data) {
            google.charts.setOnLoadCallback(function () {
                if ($("#apiTypeHourly").val() === "dwell/" && type !=="hourly/3days" && type !== 'daily') {
                    drawHorlyGraphDwell(data, 'chart_div2', type,
                        'FIVE_TO_THIRTY_MINUTES',
                        'THIRTY_TO_SIXTY_MINUTES',
                        'ONE_TO_FIVE_HOURS',
                        'FIVE_TO_EIGHT_HOURS',
                        'EIGHT_PLUS_HOURS');
                } else if (($("#apiTypeHourly").val() === "dwell/" || $("#apiTypeHourly").val() === "repeatvisitors/") && type ==="hourly/3days" ) {
                    alert("Sry ;( not available now");
                } else if ($("#apiTypeHourly").val() === "repeatvisitors/" && type !== 'daily') {
                    drawHorlyGraphDwell(data, 'chart_div2', type,
                        'DAILY',
                        'WEEKLY',
                        'OCCASIONAL',
                        'FIRST_TIME',
                        'YESTERDAY');
                } else if (type === "hourly/3days") {
                    drawHorlyThreeDays(data, type);
                } else if (type === "daily"){
                    drawDaily(data, $("#apiTypeHourly").val(), 'chart_div2');
                } else {
                    drawHourlyGraph(data, type, 'chart_div2');
                }

            });
        }
    );
}

//    get request for Analitics and presence
function getOneValueVisitorsInfo() {
    var requestUrl = "https://cisco-presence.unit.ua/api/presence/v1/";
    var apiType = $("#apiType").val();
    var type = document.getElementById("oneValueVisitors").value.replace('\”', '').replace('\”', '');

    var date1 = null;
    var date2 = null;
    requestUrl += apiType + type + "?siteId="+siteid;
    if (type === "count") {
        requestUrl += "&date=";
        date1 = Math.round((new Date($("#oneValueDate").datepicker().val()).getTime()) / 1000);
        requestUrl += $("#oneValueDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
    }
    if (type === "total") {
        date1 = Math.round((new Date($("#oneValueStartDate").datepicker().val()).getTime()) / 1000);
        date2 = Math.round((new Date($("#oneValueEndDate").datepicker().val()).getTime()) / 1000);

        requestUrl += "&startDate=";
        requestUrl += $("#oneValueStartDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
        requestUrl += "&endDate=";
        requestUrl += $("#oneValueEndDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
    }
    if (!correctDate(date1, date2))
        return;
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

                drawPresence(data, 'chart_div_analitic', apiType,
                    'DAILY',
                    'WEEKLY',
                    'OCCASIONAL',
                    'FIRST_TIME',
                    'YESTERDAY');
            }
            else if (apiType === "dwell/") {
                $("#repeatVisitorsInfoDaily").html("FIVE_TO_THIRTY_MINUTES: "+data.FIVE_TO_THIRTY_MINUTES);
                $("#repeatVisitorsInfoWeekly").html("THIRTY_TO_SIXTY_MINUTES: "+data.THIRTY_TO_SIXTY_MINUTES);
                $("#repeatVisitorsInfoOccas").html("ONE_TO_FIVE_HOURS: "+data.ONE_TO_FIVE_HOURS);
                $("#repeatVisitorsInfoFirst").html("FIVE_TO_EIGHT_HOURS: "+data.FIVE_TO_EIGHT_HOURS);
                $("#repeatVisitorsInfoYesterday").html("EIGHT_PLUS_HOURS: "+data.EIGHT_PLUS_HOURS);

                drawPresence(data, 'chart_div_analitic', apiType,
                    'FIVE_TO_THIRTY_MINUTES',
                    'THIRTY_TO_SIXTY_MINUTES',
                    'ONE_TO_FIVE_HOURS',
                    'FIVE_TO_EIGHT_HOURS',
                    'EIGHT_PLUS_HOURS');

            }
            else  {
                $("#oneValueVisitorsInfo").html(data);
            }
        }
    );
}

//  get request for KPI
function kpisummary() {
    var requestUrl = "https://cisco-presence.unit.ua/api/presence/v1/";
    var type = document.getElementById("kpi-select").value.replace('\”', '').replace('\”', '');

    requestUrl += type + "?siteId="+siteid;
    if (type === "kpisummary") {
        console.log($("#kpi-input-date").datepicker({ dateFormat: 'yy-mm-dd' }).val());
        var date1 = null;
        var date2 = null;
        if ($("#kpi-input-date").val()) {
            requestUrl += "&date=" + $("#kpi-input-date").datepicker({dateFormat: 'yy-mm-dd'}).val();
            date1 = Math.round((new Date($("#kpi-input-date").datepicker().val()).getTime()) / 1000);
        } else {
            date1 = Math.round((new Date($("#kpi-input-startDate").datepicker().val()).getTime()) / 1000);
            date2 = Math.round((new Date($("#kpi-input-endDate").datepicker().val()).getTime()) / 1000);
            requestUrl += "&startDate=" + $("#kpi-input-startDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
            requestUrl += "&endDate=" + $("#kpi-input-endDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
        }

        if (!correctDate(date1, date2))
            return;
    }

    console.log(requestUrl);
    sendRequest(
        requestUrl,
        password2,
        'GET',
        null,
        function (data) {
            $("#kpi-visitorCount").html(data.visitorCount);
            $("#kpi-totalPasserbyCount").html(data.totalPasserbyCount);
            $("#kpi-totalVisitorCount").html(data.totalVisitorCount);
            $("#kpi-totalConnectedCount").html(data.totalConnectedCount);
            $("#kpi-connectedPercentage").html(data.connectedPercentage);
            $("#kpi-conversionRate").html(data.conversionRate);
            $("#kpi-averageDwell").html(data.averageDwell);
            drawTotalKpi(data, "average");
            drawTotalKpi(data, "count");
            drawTotalManufact(data);
            if (type === "kpisummary" && $("#kpi-input-startDate").val()) {

            } else {
                $("#kpi-peakHour").html(data.peakSummary.peakHour);
                $("#kpi-peakDate").html(data.peakSummary.peakDate);
                $("#kpi-peakWeek").html(data.peakSummary.peakWeek);
                $("#kpi-peakHourCount").html(data.peakSummary.peakHourCount);
                $("#kpi-averageHourlyCount").html(data.peakSummary.averageHourlyCount);
                $("#kpi-maxHour").html(data.peakSummary.maxHour);
                $("#kpi-maxDay").html(data.peakSummary.maxDay);
                $("#kpi-peakDayCount").html(data.peakSummary.peakDayCount);
                $("#kpi-peakHourDay").html(data.peakSummary.peakHourDay);
                if (data.peakSummary.hourlyCounts !== null)
                  drawHourlyGraph(data.peakSummary.hourlyCounts, 'Hourly counts', 'chart-div-kpi-hourly-counts');
                }


        }
    );
}

startLogHistoryCheck();

// }

function startLogHistoryCheck() {
    setTimeout(
        function () {

            sendRequest(
                'https://cisco-cmx.unit.ua/api/location/v2/clients',
                password,
                'GET',
                null,
                function (data) {
                    let newUsers = new Map();
                    if (currentUsers === null) {
                        currentUsers = new Map();
                        data.forEach(function (t) {
                            newUsers.set(t.macAddress, t.mapInfo.mapHierarchyString);
                        });
                    } else {
                        data.forEach(function (t) {
                            var macAddress = t.macAddress;
                            var currentFloor = t.mapInfo.mapHierarchyString;
                            var prevFloor = currentUsers.get(t.macAddress);
                            if (!currentUsers.has(macAddress)) {
                                // console.log("Hi new user "+ macAddress + " on " + currentFloor);
                                $("#log-history").append(getCurrentTime()+">Hi new user "+ macAddress + " on " + shortFloor(currentFloor)+"!\n");
                            } else if (prevFloor !== currentFloor) {
                                // console.log("User " + macAddress + " changed floor from " + shortFloor(prevFloor) + " to " + shortFloor(currentFloor));
                                $("#log-history").append(getCurrentTime()+">User " + macAddress + " changed floor from " + shortFloor(prevFloor) + " to " + shortFloor(currentFloor) + '\n');
                            }
                            newUsers.set(t.macAddress, t.mapInfo.mapHierarchyString);
                        });
                    }

                    for (var k of currentUsers.keys()) {
                        if (!newUsers.has(k)) {
                            // console.log("User " + k + " has logout");
                            $("#log-history").append(getCurrentTime()+">User " + k + " has logout\n");
                        }
                    }
                    currentUsers = newUsers;
                    $('#log-history').scrollTop( $('#log-history')[0].scrollHeight - $('#log-history').height());
                }
            );
            startLogHistoryCheck();
        },
        5000
    );
};// todo change to 10 second

function getSessionDuration() {

    var date1 = Math.round((new Date($("#sessionStartDate").datepicker().val()).getTime()) / 1000);
    var date2 = Math.round((new Date($("#sessionEndDate").datepicker().val()).getTime()) / 1000);

    if (!correctDate(date1, date2))
        return;

    startDate = $("#sessionStartDate").datepicker({ dateFormat: 'yy-mm-dd' }).val()
    endDate = $("#sessionEndDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();

    var dateSet = [];
    while (Math.round((new Date(startDate).getTime()) / 1000) <= Math.round((new Date(endDate).getTime()) / 1000)) {
        dateSet.push(startDate);
        startDate = addOneDay(startDate, 1);
    }
    dateLength = dateSet.length;

    $.each(dateSet, function (i, date) {

        sendRequest(
            'https://cisco-presence.unit.ua/api/presence/v1/dwell/average?siteId='+siteid+'&date='+date,
            password2,
            'GET',
            null,
            function (data) {

                sessionTimeData[date+''] = data;
                console.log(sessionTimeData);

            }
        );
    });
    startSessionSetCheck();
}

function getForecasting() {
    var forecastingDateSet = [];
    var date = $('#forecastingDate').datepicker().val();

    for (var days = 7; days <= 7*10; days += 7) {
        forecastingDateSet.push(addOneDay(date, -days));
    }

    var type = $('#forecasting-select').val().replace('\”', '').replace('\”', '');
    console.log(type);
    $.each(forecastingDateSet, function (i, date) {

        sendRequest(
            'https://cisco-presence.unit.ua/api/presence/v1/'+type+'/count?siteId='+siteid+'&date='+date, // TODO: connected/repeat/other ....
            password2,
            'GET',
            null,
            function (data) {

                forecastingData.push(data);
                console.log(forecastingData);
            }
        );
    });
    startForecastingSetCheck();
}

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