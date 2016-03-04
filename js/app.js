$(document).ready(function() {
  $("#dropdown").click(function() {
    $(".forecast").toggleClass("hidden");
  });


  var currentTime = new Date().getHours();
  if (0 <= currentTime && currentTime < 5) {
    //document.write("<link rel='stylesheet' href='night.css' type='text/css'>");
    $('body').animate({
      backgroundColor: '#373737'
    }, 1500);
  }
  if (5 <= currentTime && currentTime < 11) {
    //document.write("<link rel='stylesheet' href='morning.css' type='text/css'>");
    $('body').animate({
      backgroundColor: '#5253a3'
    }, 1500);
  }
  if (11 <= currentTime && currentTime < 16) {
    //document.write("<link rel='stylesheet' href='day.css' type='text/css'>");
    $('body').animate({
      backgroundColor: '#ffe55c'
    }, 1500);
  }
  if (16 <= currentTime && currentTime < 22) {
    //document.write("<link rel='stylesheet' href='evening.css' type='text/css'>");
    $('body').animate({
      backgroundColor: '#7124b6'
    }, 1500);
  }
  if (22 <= currentTime && currentTime <= 24) {
    //document.write("<link rel='stylesheet' href='night.css' type='text/css'>");
    $('body').animate({
      backgroundColor: '#373737'
    }, 1500);
  }


  var temp_unit = 'f';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(posSuccess, posFail);
  }

  function posSuccess(pos) {
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;
    getWeather(lat + "," + lng, '', temp_unit);
  }

  function posFail() {
    alert("Cannot get location.");
  }

  function getWeather(location, woeid, temp_unit) {
    $.simpleWeather({
      location: location,
      woeid: woeid,
      unit: temp_unit,
      success: function(weather) {
        $("#weather-loading").addClass("hidden");
        $(".weather-box").removeClass("hidden");

        if (weather.temp > 75) {
          $('.weather-bg').animate({
            backgroundColor: '#F7AC57'
          }, 1500);
        } else {
          $('.weather-bg').animate({
            backgroundColor: '#0091c2'
          }, 1500);
        }

        temperature = '<b>' + weather.temp + "&deg;" + weather.units.temp + '</b>';
        curr = weather.currently;
        wcode = weather.code;
        loc = weather.city + ', ' + weather.region;
        wind = weather.wind.speed + " " + weather.units.speed;
        humid = weather.humidity + " %";

        $(".weather-icon").attr("src", "../assets/weathericons/" + wcode + ".svg");
        $(".temperature").html(temperature);
        $(".condition").html(curr);
        $(".location").html(loc);

        $(".wind-speed").html(wind);
        $(".humid-percent").html(humid);

        //5Day Forcast
        for (var i = 0; i < weather.forecast.length; i++) {
          $("#day" + i).html('<p><b>' + weather.forecast[i].day + '</b></p>' + '<p class="fore-temp"><b>' + weather.forecast[i].high+'&deg;' +'/ ' +weather.forecast[i].low + '&deg;</b></p>' + '<img src="../assets/weathericons/' + weather.forecast[i].code + '.svg">' + '<p class="forecast-condition">' + weather.forecast[i].text + '</p>');
        }
      },
      error: function(error) {
        $("#location").html('<p>' + error + '</p>');
      }
    });
  }
});
