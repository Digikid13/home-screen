var Apps = {
  weather: function() {
    $el = this;
    $el.prepend('<input id="' + $el.attr('id') + '" type="text" placeholder="City,State" style="margin: 23px"/>');
    $($el.children()[0]).keyup(function (e) {
      if (e.keyCode == 13) {
        Apps.ajaxCall('http://api.openweathermap.org/data/2.5/weather', {q: JSON.stringify($(this).val()), APPID: '44e3cf2fdfa2fe24320b8b0e35f0e01a'}, function(err, data) {
          if (err) console.error(err);
          console.log(data);
          var F = 9 / 5 * (data.main.temp - 273) + 32;
          $el.html(Math.round(F));
        });
      }
    });
    //F = 9/5(K - 273) + 32
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