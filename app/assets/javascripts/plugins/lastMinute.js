function lastMinute() {
  function showDerniereMinute() {
    $('#derniere-minute-wrapper').slideDown('slow');
  }
  if ($('#derniere-minute div').children().length > 0) {
    setTimeout(showDerniereMinute, 2000);
  }
};

$(document).on('ready page:load', function () {
  lastMinute();
});
