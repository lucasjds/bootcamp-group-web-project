function weather() {

    var location = document.getElementById("location");
    var url = 'https://api.forecast.io/forecast/df7e69b54ab5704912f0b629815f2095/';

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var d = new Date();
        var day = d.getDay();
        var img = "leaf";
        var day1 = "default";
        location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°';

        $.getJSON(url + latitude + "," + longitude + "?units=ca&callback=?", function(data) {
            var icon = data.currently.icon;
            $('#temp').html(Math.round((data.currently.temperature)) + '°C');
            $('#visibility').html('Visibility: ' + (data.currently.visibility) + 'km');
            $('#wind').html('Wind Speed: ' + (data.currently.windSpeed) + ' km/h');
            $('#minutely').html(data.minutely.summary);
            $('#humidity').html('Humidity: ' + Math.round((data.currently.humidity * 100)) + '%');
            $('#uv').html('UV Index: ' + data.currently.uvIndex);
            $('#timezone').html(data.timezone);
            day1 = newFunction2(day, day1);
            $('#day').html(day1);
            img = newFunction(icon, img);
            $('#img').html("<img src=images/" + img + ".png></img>");
            location.innerHTML = data.daily.summary;


        });


    }

    function error() {
        location.innerHTML = "Sorry,Unable to retrieve your location";
    }


    location.innerHTML = "Searching.....";
}

function newFunction(icon, img) {
    if (icon == 'snow') {
        img = "snow-50";
    } else if (icon == 'rain') {
        img = "rain-50";
    } else if (icon === 'partly-cloudy-day') {
        img = "partly-cloudy-day-50";
    } else if (icon == 'partly-cloudy-night') {
        img = "night-filled-50";
    } else if (icon == 'clear-day') {
        img = "sun-50";
    } else if (icon == 'clear-night') {
        img = "new-moon-50";
    } else if (icon == 'sleet') {
        img = "sleet-50";
    } else if (icon == 'wind') {
        img = "windy-weather-50";
    } else if (icon == 'fog') {
        img = "dust-50";
    } else if (icon == 'cloudy') {
        img = "cloud-50";
    } else {
        img = "leaf";
    }
    return img;
}

function newFunction2(day, day1) {
    if (day == '0') {
        day1 = "Sunday";
    } else if (day == '1') {
        day1 = "Monday";
    } else if (day == '2') {
        day1 = "Tuesday";
    } else if (day == '3') {
        day1 = "Wednesday";
    } else if (day == '4') {
        day1 = "Thursday";
    } else if (day == '5') {
        day1 = "Friday";
    } else if (day == '6') {
        day1 = "Saturday";
    } else {
        day1 = "Default";
    }
    return day1;
}