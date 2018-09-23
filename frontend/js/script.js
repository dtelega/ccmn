
var siteid; // 1513804707441
var username;
var password;  // cmx
var password2; // presence

// Credentials func
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

// delete this credentials in prod
username = 'RO';
password = 'just4reading';
password2 = 'Passw0rd';
// ***********************





$("#oneValueDate").datepicker({ dateFormat: 'yy-mm-dd' });
$("#oneValueStartDate").datepicker({ dateFormat: 'yy-mm-dd' });
$("#oneValueEndDate").datepicker({ dateFormat: 'yy-mm-dd' });
$("#dravHourlyDate").datepicker({ dateFormat: 'yy-mm-dd' });
$("#kpi-input-date").datepicker({ dateFormat: 'yy-mm-dd' });
$("#kpi-input-startDate").datepicker({ dateFormat: 'yy-mm-dd' });
$("#kpi-input-endDate").datepicker({ dateFormat: 'yy-mm-dd' });

// $( document ).ajaxSend(function( event, jqxhr, settings ) {
//     console.log(settings);
//     console.log(settings.headers.Authorization === null);
//     if (settings.headers.Authorization === null) {
//         console.log("Adding header");
//         settings.headers = {
//             "Authorization": "Basic " + btoa(username + ":" + password)
//         }
//     }
// });