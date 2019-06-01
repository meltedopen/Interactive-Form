$(document).ready(function() {
  // Set focus for first text field
  $('#name').focus();

  // Text field that is revealed when user selects 'other' option from job role dropdown
  $('#other-title').hide();
  $('#title').change(function() {
    if ($('#title').val() === 'other') {
      $('#other-title').show();
    } else {
      $('#other-title').hide();
    }
  });

  // T shirt section
  // color option must match the design selected

  // When user selects Theme - JS Puns -> color menu -> Cornfolower Blue, Dark SLate Grey, Gold

  // When user selects I <3 JS theme -> color menu -> Tomoato, Steel Blue, Dim Grey

  // WHen user selects new theme -> color field & drop down should update

  // Register for Activiites section
  // Workshop selection should not conflict... disable checkbox/workshop in competing time disabled

  // When user unchecks activity, competing activities should no longer be disabled

  // Running total as user adds/removes activities

  //ending bracket
});
