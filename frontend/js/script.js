var request = new XMLHttpRequest();

// Credentials
var username = "RO";
//var password = "Passw0rd";   // cisco-presence
var password = "just4reading"; // cisco-cmx

var activeUserCount;

// url
var urlImageVersion = 'https://cisco-presence.unit.ua/api/config/v1/version/image';
var urlAllUser = 'https://cisco-presence.unit.ua/api/config/v1/aaa/users';

var url = 'https://cisco-cmx.unit.ua/api/location/v2/clients/count';


//request.withCredentials = {login:username, password:password};
//request.open('GET', urlImageVersion, true, username, password);


function getData(value, url, key, path) {



    request.open('GET', url, true);
    request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));



    request.onload = function () {

        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data[key]);
            value = data[key];
            $(path).replaceWith(value);

        } else {
            console.log('error');
        }
    }

    request.send();
    return value;
}
var value = 0;



console.log('return :'+getData(value, url, 'count', "#active-user-count"));

console.log(value);
// need to create few function for different request
