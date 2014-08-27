//create functions that make the api calls, show the selections of tiles when clicking on an empty div, bring up a side bar with all the tiles that may or may not move the page over
var tileApp = {
  init: function() {
    // Give each empty tile a random background color
    $(".empty").each(function() {
      var randomColor = '' + Math.round(Math.random()*6) + Math.round(Math.random()*6) + Math.round(Math.random()*6) + Math.round(Math.random()*6) + Math.round(Math.random()*6) + Math.round(Math.random()*6);
      $(this).css('background-color', randomColor);
    });

    // Add a function to each empty tile to show the sidebar
    $('.empty').on('click', function() {
      $('.selected').removeClass('selected');
      $(this).addClass('selected');

      $('#sidebar').animate({'left': '0px'}, 100);
      $('#sidebar').attr('class', '');
      $('#sidebar').addClass($(this).attr('id'));

    });
    // Sends tile and app info to sidebar
    $('#sidebar').on('click', 'li', function() {
      $('#sidebar').animate({'left': '-200px'}, 100);
      tileApp.sidebar($('#sidebar').attr('class'), $(this).attr('id'));
    });
  },

  // Either shows available tiles in the sidebar, (TODO) or options for the current tile
  sidebar: function(tile, app) {
    $('.selected').removeClass('selected');
    $el = $('#' + tile);
    if ($el.hasClass('empty')) {
      $el.removeClass('empty');
      $el.off('click');
      $el.addClass(app);
      Apps[app].apply($el);
    }
  },
  callback: function(data,cb) {
    cb(data);
  }
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

$(document).ready(function() {
  tileApp.init();
});
