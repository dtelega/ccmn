
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






