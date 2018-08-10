//ES6 Compatible
function fadeAlert(s, d = 2000, f = 'slow') {
    $('.t-Alert').delay(d).fadeOut(f);
  }

//IE safe
function fadeAlert(s, d, f) {
    var Delay = d || 2000,
        Fade  = f || 'slow';
  $('.t-Alert').delay(Delay).fadeOut(Fade);
}



fadeAlert();
// for each IG on page
$.each($('div.a-IG').closest('div.t-Region'), function(index, value) {
    //console.log(index + ' + ' + $(value).attr('id'));
    $('#' +  $(value).attr('id')).on('interactivegridsave.IG', function(){ fadeAlert(); });
});