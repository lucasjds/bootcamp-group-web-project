function weatherloc() {
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;

    var img = "leaf";
    var d = new Date();
    var day = d.getDay();
    var img = "leaf";
    var day1 = "default";
    var location = document.getElementById("location");
    var url = 'https://api.forecast.io/forecast/df7e69b54ab5704912f0b629815f2095/';


    $.getJSON(url + latitude + "," + longitude + "?units=ca&callback=?", function(data) {
        var icon = data.currently.icon;
        $('#temp').html(Math.round((data.currently.temperature)) + '°C');
        $('#visibility').html('Visibility: ' + (data.currently.visibility) + 'km');
        $('#wind').html('Wind Speed: ' + (data.currently.windSpeed) + ' km/h');
        $('#minutely').html(data.hourly.summary);
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