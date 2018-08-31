

// Credentials
var username = "RO";
//var password = "Passw0rd";   // cisco-presence
var password = "just4reading"; // cisco-cmx


// url
var urlImageVersion = 'https://cisco-presence.unit.ua/api/config/v1/version/image';
var urlAllUser = 'https://cisco-presence.unit.ua/api/config/v1/aaa/users';

var url = 'https://cisco-cmx.unit.ua/api/location/v2/clients/count';


var path = '#active-user-count'+' > p';
console.log('return :'+ getData(url, 'count'));
$('#active-user-count').replaceWith("<p>" + getData(url, 'count') + '</p>');


function getData(url, key) {

   // var queryString = "user_name=RO&password=just4reading";


    /*var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    request.onload = function () {

        // Begin accessing JSON data here
        var data = JSON.parse(request.response);
        if (request.status >= 200 && request.status < 400) {
            console.log('data[key] : ' + data[key] + ' to ' + path);
            //$(path).replaceWith("<p>" + data[key] + '</p>');
            $(path).append("<p>" + data[key] + '</p>');

        } else {
            console.log('error');
        }
    }
    request.send();

    return $(path).html();*/
var val = 0;
    $.ajax({
        type:"GET",
        url:url,
        dataType: 'json',
        data:key,
        async:false,
        headers: {
            "Authorization": "Basic " + btoa(username + ":" + password)
        },
        success: function (data) {
            console.log('get data for key ['+key+'] - '+data.count);
            val = data.count;
        }
    });
    return val;
}





// need to create few function for different request
