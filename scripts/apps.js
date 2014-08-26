/*
RSS Reader,
Sports Ticker,
Stock Ticker,
Post it/Notes,
Timer? (with nice circle minute countdownerthingy)

*/

var Apps = {
  __app_template: function() {
    $el = this;
    $el.prepend('<input id="' + $el.attr('id') + '" type="text" placeholder="<fill_me_in>" style="margin: 23px"/>');
    $($el.children()[0]).keyup(function (e) {
      if (e.keyCode == 13) {
        Apps.ajaxCall('<site_here>', {}, function(err, data) {
          if(err) console.error(err);
          $div = $('<div style="margin: 23px"></div>');

          $el.html($div);
        });
      }
    });
  },

  // Weather app, uses OpenWeatherMap API to get current weather from inputed city
  weather: function() {
    var $el = this;
    $el.prepend('<input id="' + $el.attr('id') + '" type="text" placeholder="City, State" style="margin: 23px"/>');
    
    $($el.children()[0]).keyup(function (e) {
      if (e.keyCode == 13) {
        var query = JSON.stringify($(this).val().replace("/ +/", ""));

        Apps.ajaxCall('http://api.openweathermap.org/data/2.5/weather', {
          q: query,
          APPID: '44e3cf2fdfa2fe24320b8b0e35f0e01a'}, function(err, data) {
            if (err) console.error(err);
            console.log(data);
            var F = 9 / 5 * (data.main.temp - 273) + 32;
            var $div = $('<div style="margin: 23px"></div>');
            $div.prepend('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" width="100" heihht="100"/>');
            $div.append(Math.round(F) + ' &#176;F');
            $el.html($div);
        });
      }
    });
  },

  //Task pad to write down things you want to do
  task: function() {
    var keys = {};

    $el = this;
    $el.prepend('<textarea id="' + $el.attr('id') + '" placeholder="Type tasks here\n\nShift + Enter to save" style="margin: 2px; width: 196px; height: 196px;"></textarea>');
    
    $($el.children()[0]).keydown(function (e) {
      keys[e.which] = true;
    });

    $($el.children()[0]).keyup(function (e) {
      if (keys[13] && keys[16]) {
        delete keys[e.which];
        var text = $($el.children()[0]).val().split('\n');
        
        var $ul= $('<ul></ul>');
      } else {
        delete keys[e.which];
      }
    });
  },


  // Basic ajax call wrapper
  ajaxCall: function (site, input, cb) {
    $.ajax({
        url: site,
        data: input,
        type: 'GET',
        success: function(data) {
          cb(null, data);
        },
        error: function(data) {
          cb('There was an api call error to:' + site, null);
        }
    });
  },
};