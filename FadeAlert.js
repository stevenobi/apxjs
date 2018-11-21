//ES6 Compatible
function fadeAlert(s, d = 2000, f = 'slow') {
    $('.t-Alert').delay(d).fadeOut(f);
  }

//IE safe
function fadeAlert(d, f, s) {
    var Delay    = d || 2000,
        Fade     = f || 'slow',
        Selector = s || '.t-Alert';
  $(Selector).delay(Delay).fadeOut(Fade);
}



fadeAlert();
// for each IG on page
$.each($('div.a-IG').closest('div.t-Region'), function(index, value) {
    //console.log(index + ' + ' + $(value).attr('id'));
    $('#' +  $(value).attr('id')).on('interactivegridsave.IG', function(){ fadeAlert(); });
});
