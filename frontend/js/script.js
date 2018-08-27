var request = new XMLHttpRequest();

// https://ghibliapi.herokuapp.com/films
request.open('GET', 'https://cisco-presence.unit.ua/api/config/v1/version/image', true);
request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        console.log(data.cmx_image_version);
    } else {
        console.log('error');
    }
}

request.send();