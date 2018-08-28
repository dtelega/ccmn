var request = new XMLHttpRequest();

// Credentials
var username = "RO";
//var password = "Passw0rd";   // cisco-presence
var password = "just4reading"; // cisco-cmx


// url
var urlImageVersion = 'https://cisco-presence.unit.ua/api/config/v1/version/image';
var urlAllUser = 'https://cisco-presence.unit.ua/api/config/v1/aaa/users';

var url = 'https://cisco-cmx.unit.ua/api/location/v2/clients/count';


//request.withCredentials = {login:username, password:password};
//request.open('GET', urlImageVersion, true, username, password);
request.open('GET', url, true);
request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));

request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        console.log("active user count = "+data.count);
    } else {
        console.log('error');
    }
}

request.send();

