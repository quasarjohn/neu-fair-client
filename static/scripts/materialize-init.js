// for initializing materialize components
$(document).ready(function() {

  console.log("MATERIALIZE INIT")
  //init side nav
  $(".button-collapse").sideNav();

  //init datepicker
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 80, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

  //init modals
  $('.modal').modal();
})
