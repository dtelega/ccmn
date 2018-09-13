
// Analitics and preence
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

    if (apiType === "repeatvisitors/" || apiType === "dwell/") {
        $("#repeatVisitorsInfo").show();
        $("#oneValueVisitorsInfo").hide();
    }
    else {
        $("#repeatVisitorsInfo").hide();
        $("#oneValueVisitorsInfo").show();
    }
});


// Correlation
$("#oneValueHourly").change(function () {
    var type = document.getElementById("oneValueHourly").value.replace('\”', '').replace('\”', '');

    if (type === "hourly") {
        $("#dravHourlyDate").show();
    }
    else {
        $("#dravHourlyDate").hide();
    }
});
