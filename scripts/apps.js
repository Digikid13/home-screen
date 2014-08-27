/*
RSS Reader,
Sports Ticker,
Stock Ticker,

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
        var query = JSON.stringify($(this).val().replace(" ,", ","));

        Apps.ajaxCall('http://api.openweathermap.org/data/2.5/weather', {
          q: query,
          APPID: '44e3cf2fdfa2fe24320b8b0e35f0e01a'}, function(err, data) {
            if (err) console.error(err);
            console.log(query);
            console.log(data);
            var F = 9 / 5 * (data.main.temp - 273) + 32;
            var $div = $('<div style="margin: 23px;text-align: center;"></div>');
            $div.prepend('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" width="100"/>');
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

        text.forEach(function(val) {
          if (val !== '') {
            $li = $('<li></li>');
            $li.text(val);
            $ul.append($li);
          }
        });
        $el.css('background-color', 'FFF717');
        $el.css('color', 'black');
        $el.html($ul);
        $el.on('click', 'li', function() {
          $(this).css('text-decoration', 'line-through');
        });
      } else {
        delete keys[e.which];
      }
    });
  },

  // Circle timer that counts down
  timer: function() {
    function countdown(m, s) {
      var cur = new Date();
      return new Date(cur.getTime() + m*60000 + s*1000);
    }

    function remaining(timeout) {
      var cur = new Date();
      return new Date(timeout.getTime() - cur.getTime()).getTime();
    }

    $el = this;
    $el.prepend('<input id="' + $el.attr('id') + '" type="text" placeholder="xxM xxS" style="margin: 23px"/>');
    $($el.children()[0]).keyup(function (e) {
      if (e.keyCode == 13) {
        var time = $($el.children()[0]).val().split(' ');
        $timer = $('<div id="clock" style="position:relative">\
                      <div style="position:absolute;left:0px;top:0px">\
                        <input class="min' + $el.attr('id') + '">\
                      </div>\
                      <div style="position:absolute;left:38px;top:38px">\
                        <input class="sec' + $el.attr('id') + '">\
                      </div>\
                      <div style="position:absolute;left:63px;top:63px">\
                        <input class="mill' + $el.attr('id') + '">\
                      </div>\
                    </div>');

        $el.html($timer);

        $('.min' + $el.attr('id')).knob({
          readOnly: true,
          width: 200,
          thickness: 0.3,
          displayInput: false,
          fgColor: '#66CC66',
          min: 0,
          max: 60
        });
        $('.min' + $el.attr('id')).val(0).trigger('change');
        $('.sec' + $el.attr('id')).knob({
          readOnly: true,
          width: 125,
          thickness: 0.3,
          displayInput: false,
          fgColor: '#21A8FC',
          min: 0,
          max: 60
        });
        $('.sec' + $el.attr('id')).val(0).trigger('change');
        $('.mill' + $el.attr('id')).knob({
          readOnly: true,
          cursor: 25,
          width: 75,
          thickness: 0.3,
          displayInput: false,
          fgColor: '#FC2124',
          min: 0,
          max: 1000
        });
        $('.mill' + $el.attr('id')).val(0).trigger('change');

        var future = countdown(time[0].substr(0,2), time[1].substr(0,2));

        $elem = $el;
        var timeout = setInterval(function() {

          if (remaining(future) <= 0) {
            $('.min' + $elem.attr('id')).val(0).trigger('change');
            $('.sec' + $elem.attr('id')).val(0).trigger('change');
            $('.mill' + $elem.attr('id')).val(0).trigger('change');
            alert('Beep! Beep! Beep! (use your imagination)');
            clearInterval(timeout);
          } else {
            var left = remaining(future);
            if (Math.floor(left / 60000) > 0) {
              var mins = Math.floor(left / 60000);
              $('.min' + $elem.attr('id')).val(mins).trigger('change');
              left = left - mins * 60000;
            }

            if (Math.floor(left / 1000) > 0) {
              var secs = Math.floor(left / 1000);
              $('.sec' + $elem.attr('id')).val(secs).trigger('change');
              left = left - secs*1000;
            }

            $('.mill' + $elem.attr('id')).val(left).trigger('change');
          }
        }, 15);
      }
    });
  },

  rss: function() {
    $el = this;
    var sites = {
      'google': 'https://news.google.com/?output=rss',
      'yahoo': 'http://news.yahoo.com/rss/',
      'wired': 'http://feeds.wired.com/wired/index'
    };

    $ul = $('<ul id="rss"></ul>');

    for (var k in sites) {
      var $li = $('<li id="'+ k +'"></li>');
      $li.text(k.capitalize());
      $li.prepend('<img src="http://getfavicon.appspot.com/http://www.' + k + '.com" width="20px" height="20px" />');
      $ul.append($li);
    }
    $el.html($ul);

    $el.on('click', 'li', function() {
      $.ajax({
        url:"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D'" + sites[$(this).attr('id')] + "'&format=json&callback=Apps.rss_callback",
        type: 'GET',
        dataType: 'jsonp'
      });
    });
  },

  rss_callback: function(data) {
    $el = $('.rss');

    var items = data.query.results.item;

    $ul = $('<ul id="rss"></ul>');

    items.forEach(function(item, index) {
      if (index < 6) {
        var $li = $('<li></li>');
        var $a = $('<a href="' + item.link + '"/>');
        $a.text(item.title.substr(0,20) + '...');
        $li.append($a);
        $ul.append($li);
      }
    });

    $el.removeClass('rss');
    $el.addClass('rss-complete');
    $el.html($ul);
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