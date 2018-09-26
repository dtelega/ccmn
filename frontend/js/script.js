var siteid = null; // 1513804707441
var username;
var password;  // cmx
var password2; // presence
let currentUsers = null;

// Credentials func
function getLogin() {
    username = $('#login').val();
    // console.log('Username ' + username);
}

function getPasswordCmx() {
    password = $('#password-cmx').val();
    // console.log('Password: ' + password);
}

function getPasswordPrecense() {
    password2 = $('#password-precense').val();
    // console.log('Password: ' + password);
}

var dateoptions = {
    dateFormat: 'yy-mm-dd',
    maxDate: '0d'
};

$("#oneValueDate").datepicker(dateoptions);
$("#oneValueStartDate").datepicker(dateoptions);
$("#oneValueEndDate").datepicker(dateoptions);
$("#dravHourlyDate").datepicker(dateoptions);
$("#kpi-input-date").datepicker(dateoptions);
$("#kpi-input-startDate").datepicker(dateoptions);
$("#kpi-input-endDate").datepicker(dateoptions);
$("#dravHourlyStartDate").datepicker(dateoptions);
$("#dravHourlyEndDate").datepicker(dateoptions);
$("#sessionStartDate").datepicker({
    dateFormat: 'yy-mm-dd',
    maxDate: '-1d'
});
$("#sessionEndDate").datepicker({
    dateFormat: 'yy-mm-dd',
    maxDate: '-1d'
});
$("#forecastingDate").datepicker({
    dateFormat: 'yy-mm-dd',
    maxDate: '7d',
    minDate: '1d'
});

function getCurrentTime() {
    var date = new Date;
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();

    return (hour+":"+minutes+":"+seconds);
}

function shortFloor(full) {
    if (full.indexOf('1') !== -1) {
        return "1st_Floor";
    }
    else if (full.indexOf('2') !== -1) {
        return "2nd_Floor";
    }
    return "3rd_Floor";
}

function correctDate(date1, date2) {
    if (isNaN(date1) || isNaN(date2)) {
        alert("Date empty :(");
        return false;
    }
    if (date2 !== null) {
        if (date1 > date2) {
            alert("Wrong interval from is greater than to");
            return false;
        }
        date1 = date2;
    }
    if (date1 > Math.round((new Date()).getTime() / 1000)) {
        alert("Date interval can't cover date before today");
        return false;
    }
    return true;
}

var sessionTimeData = {};
var dateLength = 0;

var forecastingData = [];

function addOneDay(date, days) {
    var today = new Date(date);
    date = new Date(today);
    date.setDate(today.getDate() + days);
    date.toLocaleDateString();
    date = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
    return date;
}

function startSessionSetCheck() {
    setTimeout(
        function () {
            // console.log(Object.keys(sessionTimeData).length, dateLength);
            if (Object.keys(sessionTimeData).length === dateLength) {
                // order date list for graph
                const ordered = {};
                Object.keys(sessionTimeData).sort(function(a, b) {
                    var date1 = Math.round((new Date(a).getTime()) / 1000);
                    var date2 = Math.round((new Date(b).getTime()) / 1000);
                    return date1 - date2;

                }).forEach(function(key) {
                    ordered[key] = sessionTimeData[key];
                });

                drawDaily(ordered, null, 'chart_div_session');
                dateLength = 0;
                sessionTimeData = {};
            }
            else
                startSessionSetCheck();
        },
        1000
    );
} // todo change to 10 second


function startForecastingSetCheck() {
    setTimeout(
        function () {
            // console.log(forecastingData.length, 10);
            if (forecastingData.length === 10) {

                var num = 0;
                $.each(forecastingData, function (i, count) {
                   num += count;
                });

                num /= 10;

                $('#forecastingInfo').html(num);
                forecastingData = [];
            } else
                startForecastingSetCheck();
        },
        1000
    );
}