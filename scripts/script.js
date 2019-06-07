var myBackgrounds = [
    "https://images.unsplash.com/photo-1474419804354-b82d9cad71ca?dpr=1&auto=format&fit=crop&w=1500&h=994&q=80&cs=tinysrgb&crop=&bg=",
    "https://images.unsplash.com/photo-1468413922365-e3766a17da9e?dpr=1&auto=format&fit=crop&w=1500&h=770&q=80&cs=tinysrgb&crop=&bg=",
    "https://images.unsplash.com/photo-1481433705997-f3c061a4eac8?dpr=1&auto=format&fit=crop&w=1500&h=997&q=80&cs=tinysrgb&crop=&bg=",
    "https://images.unsplash.com/photo-1443890743532-518777e41f5a?dpr=1&auto=format&fit=crop&w=1500&h=998&q=80&cs=tinysrgb&crop=&bg=",
    "https://images.unsplash.com/photo-1420131751440-4380101bca0d?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=",
    "https://images.unsplash.com/uploads/14116603688211a68546c/30f8f30b?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=",
    "https://images.unsplash.com/photo-1484799480768-89e473b0f6f6?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=",
    "https://images.unsplash.com/photo-1484208241018-60d95304e5d1?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=",
    "https://images.unsplash.com/photo-1443866451220-8377d57c426a?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=",
    "https://images.unsplash.com/photo-1430921688227-2c59c6489072?dpr=1&auto=format&fit=crop&w=1500&h=950&q=80&cs=tinysrgb&crop=&bg=",
    "https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?dpr=2&auto=format&fit=crop&w=1500&h=998&q=80&cs=tinysrgb&crop=&bg="
];
// 0-partly-cloudy-day, 1-partly-cloudy-night, 2-cloudy, 3-clear-day, 4-clear-night, 5-rain, 6-snow, 7-sleet, 8-wind, 9-fog, 10-space

var myLat;
var myLong;
var myJson;
var myLocation;
var myLocationArray;
var tempF;
var tempC;
var degreeCheck;
var icon;

$(document).ready(function() {
    $("#cloud").addClass("animated fadeIn");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            myLat = position.coords.latitude;
            myLong = position.coords.longitude;

            myJson = "https://api.darksky.net/forecast/a42c3d5ec780d66d34217b59cbb19261/" + myLat + "," + myLong + "?callback=?";

            getJsonData();
        }); // end of getCurrentPosition function
    } // end of navigator.geolocation function
}); // end of document.ready function

function getJsonData() {
    $.getJSON(myJson, function(data) {
        myLocation = data.timezone;
        myLocationArray = myLocation.split("/");
        $("#locationText").addClass("animated fadeIn").html(myLocationArray[0] + ",<br>" + myLocationArray[1]);

        tempF = Math.round(data.currently.temperature);
        tempC = Math.round(((tempF - 32) * 5/9));
        $("#degreeText").addClass("animated fadeIn").html(tempC + "&#176; C");
        $("#degreeSwitch").addClass("animated fadeIn").html("<b>C</b> / F");
        degreeCheck = false;

        icon = data.currently.icon

        getBackgroundAndIcon();
    }); // end of .getJSON function
} // end of getJsonData function

$("#degreeButton").click(function() {
    if (degreeCheck == true) {
        $("#degreeText").addClass("animated fadeIn").html(tempC + "&#176; C");
        $("#degreeSwitch").addClass("animated fadeIn").html("<b>C</b> / F");
        degreeCheck = false;
    } else {
        $("#degreeText").addClass("animated fadeIn").html(tempF + "&#176; F");
        $("#degreeSwitch").addClass("animated fadeIn").html("C / <b>F</b>");
        degreeCheck = true;
    } // end of else statement
}); // end of myQuote click function

function getBackgroundAndIcon() {
    if (icon == "partly-cloudy-day") {
        $("#weatherIcon").addClass("animated fadeIn").html("<i class='wi wi-day-cloudy'></i>");
        $("body").css("background-image", "url(" + myBackgrounds[0] + ")");
    } else if (icon == "partly-cloudy-night") {
        $("#weatherIcon").addClass("animated fadeIn").html("<i class='wi wi-night-alt-cloudy'></i>");
        $("body").css("background-image", "url(" + myBackgrounds[1] + ")");
    } else if (icon == "cloudy") {
        $("#weatherIcon").addClass("animated fadeIn").html("<i class='wi wi-cloudy'></i>");
        $("body").css("background-image", "url(" + myBackgrounds[2] + ")");
    } else if (icon == "clear-day") {
        $("#weatherIcon").addClass("animated fadeIn").html("<i class='wi wi-day-sunny'></i>");
        $("body").css("background-image", "url(" + myBackgrounds[3] + ")");
    } else if (icon == "clear-night") {
        $("#weatherIcon").addClass("animated fadeIn").html("<i class='wi wi-night-clear'></i>");
        $("body").css("background-image", "url(" + myBackgrounds[4] + ")");
    } else if (icon == "rain") {
        $("#weatherIcon").addClass("animated fadeIn").html("<i class='wi wi-showers'></i>");
        $("body").css("background-image", "url(" + myBackgrounds[5] + ")");
    } else if (icon == "snow") {
        $("#weatherIcon").addClass("animated fadeIn").html("<i class='wi wi-snow'></i>");
        $("body").css("background-image", "url(" + myBackgrounds[6] + ")");
    } else if (icon == "sleet") {
        $("#weatherIcon").addClass("animated fadeIn").html("<i class='wi wi-sleet'></i>");
        $("body").css("background-image", "url(" + myBackgrounds[7] + ")");
    } else if (icon == "wind") {
        $("#weatherIcon").addClass("animated fadeIn").html("<i class='wi wi-strong-wind'></i>");
        $("body").css("background-image", "url(" + myBackgrounds[8] + ")");
    } else if (icon == "fog") {
        $("#weatherIcon").addClass("animated fadeIn").html("<i class='wi wi-fog'></i>");
        $("body").css("background-image", "url(" + myBackgrounds[9] + ")");
    } else {
        $("#weatherIcon").addClass("animated fadeIn").html("<i class='wi wi-alien'></i>");
        $("body").css("background-image", "url(" + myBackgrounds[10] + ")");
    } // end of else statement
} // end of getBackgroundAndIcon function
