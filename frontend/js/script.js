var siteid; // 1513804707441
var username;
var password;  // cmx
var password2; // presence
let currentUsers = null;

// Credentials func
function getLogin() {
    username = $('#login').val();
    console.log('Username ' + username);
}

function getPasswordCmx() {
    password = $('#password-cmx').val();
    console.log('Password: ' + password);
}

function getPasswordPrecense() {
    password2 = $('#password-precense').val();
    console.log('Password: ' + password);
}

// delete this credentials in prod
username = 'RO';
password = 'just4reading';
password2 = 'Passw0rd';
// ***********************


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
    if (isNaN(date1) && isNaN(date2)) {
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
