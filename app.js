//create functions that make the api calls, show the selections of tiles when clicking on an empty div, bring up a side bar with all the tiles that may or may not move the page over
var tileApp = {
  init: function() {
    // Give each empty tile a random background color
    $(".empty").each(function() {
      var randomColor = '' + Math.round(Math.random()*6) + Math.round(Math.random()*6) + Math.round(Math.random()*6) + Math.round(Math.random()*6) + Math.round(Math.random()*6) + Math.round(Math.random()*6);
      $(this).css('background-color', randomColor);
    });

    // Add a function to each tile to show the sidebar
    $('.tile').on('click', function() {
      $('#sidebar').animate({'left': '0px'}, 100);

      $('#sidebar').attr('class', '');
      $('#sidebar').addClass($(this).attr('id'));

    });

    $('#sidebar').on('click', 'li', function() {
      tileApp.sidebar($('#sidebar').attr('class'), $(this).attr('id'));
    });
  },

  // Either shows available tiles in the sidebar, (TODO) or options for the current tile
  sidebar: function(tile, app) {
    $el = $('#' + tile);
    if ($el.hasClass('empty')) {
      $el.removeClass('empty');
      $el.addClass(app);
    }
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

$(document).ready(function() {
  tileApp.init();
});
