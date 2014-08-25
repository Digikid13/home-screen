//create functions that make the api calls, show the selections of tiles when clicking on an empty div, bring up a side bar with all the tiles that may or may not move the page over
var tileApp = {
  init: function() {
    $('.tile').on('click', function() {
      tileApp.update.apply(this);
    });
  },
  update: function() {
    $el = $(this);
    if ($el.hasClass('empty')){
      var randomColor = '' + Math.round(Math.random()*6) + Math.round(Math.random()*6) + Math.round(Math.random()*6) + Math.round(Math.random()*6) + Math.round(Math.random()*6) + Math.round(Math.random()*6);
      
      $el.removeClass('empty');
      $el.addClass('something');
      console.log(randomColor);
      $el.css('background-color', randomColor);
    }
  },
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
