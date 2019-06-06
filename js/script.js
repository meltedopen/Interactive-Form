$(document).ready(function() {
  // Set focus for the first text field
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
  const punJs = $(
    '#color option[value= "cornflowerblue"],[value= "darkslategrey"],[value= "gold"]'
  ).hide();

  // When user selects I <3 JS theme -> color menu -> Tomoato, Steel Blue, Dim Grey
  const heartJs = $(
    '#color option[value= "tomato"],[value= "steelblue"],[value= "dimgrey"]'
  ).hide();

  // When user selects new theme -> color field & drop down should update
  $('#colors-js-puns').hide();

  $('#design').on('change', function() {
    $('#colors-js-puns').show();

    if ($('#design').val() === 'js puns') {
      $('#color option[value= "cornflowerblue"]').prop('selected', true);
      $(punJs).show();
      $(heartJs).hide();
    } else if ($('#design').val() === 'heart js') {
      $('#color option[value= "tomato"]').prop('selected', true);
      $(heartJs).show();
      $(punJs).hide();
    } else {
      $('#colors-js-puns').hide();
    }
  });

  // Register for Activiites section
  const all = $('.activities input[name="all"]').val(200);
  const frameWork = $('.activities input[name="js-frameworks"]').val(100);
  const library = $('.activities input[name="js-libs"]').val(100);
  const express = $('.activities input[name="express"]').val(100);
  const node = $('.activities input[name="node"]').val(100);
  const buildTools = $('.activities input[name="build-tools"]').val(100);
  const npm = $('.activities input[name="npm"]').val(100);

  // Calculating activity prices
  const checkBox = $('input:checkbox');
  const cost = $('<span id="cost">Total Cost: $</span>');
  $('.activities').append(cost);
  let $totalCost = 0;

  $(checkBox).change(function() {
    if ($(this).is(':checked')) {
      $totalCost += parseInt($(this).val());
    } else {
      $totalCost -= parseInt($(this).val());
    }
    $(cost).text('Total Cost: $' + $totalCost);

    if ($totalCost === 0) {
      $('#cost').css('border', '3px solid red') && $('#activity-error').show();
    } else {
      $('#cost').css('border', '3px solid green') &&
        $('#activity-error').hide();
    }
  });

  // Workshop selection should not conflict... disable checkbox/workshop in competing time disabled
  // When user unchecks activity, competing activities should no longer be disabled
  $('.activities').on('change', function() {
    if ($(all).is(':checked')) {
      $(all).prop('disabled', false);
    }

    if ($(frameWork).is(':checked')) {
      $(frameWork).prop('disabled', false);
      $(express).prop('disabled', true);
    } else {
      $(express).prop('disabled', false);
    }

    if ($(library).is(':checked')) {
      $(library).prop('disabled', false);
      $(node).prop('disabled', true);
    } else {
      $(node).prop('disabled', false);
    }

    if ($(express).is(':checked')) {
      $(express).prop('disabled', false);
      $(frameWork).prop('disabled', true);
    } else {
      $(frameWork).prop('disabled', false);
    }

    if ($(node).is(':checked')) {
      $(node).prop('disabled', false);
      $(library).prop('disabled', true);
    } else {
      $(library).prop('disabled', false);
    }

    if ($(buildTools).is(':checked')) {
      $(buildTools).prop('disabled', false);
    }

    if ($(npm).is(':checked')) {
      $(npm).prop('disabled', false);
    }
  });

  // Payment Info Section
  // Display payment sections based on payment
  const payment = $('#payment');
  const payMethod = $('#payment option[value="select_method"]').remove();
  const creditCard = $('#payment option[value="credit card"]');
  const payPal = $('#payment option[value="paypal"]');
  const bitCoin = $('#payment option[value="bitcoin"]');
  const payPalText = $('p:first')
    .addClass('paypal')
    .text();
  const bitCoinText = $('p:last')
    .addClass('bitcoin')
    .text();

  // CC payment option should be default
  $('#credit-card').show();
  $('.paypal').hide();
  $('.bitcoin').hide();

  // When one payment selected, other two should be disabled
  $('#payment').change(function() {
    if ($(creditCard).is(':checked')) {
      $('#credit-card').show();
      $('.paypal').hide();
      $('.bitcoin').hide();
    } else if ($(payPal).is(':checked')) {
      $('#credit-card').hide();
      $('.paypal').show();
      $('.bitcoin').hide();
    } else if ($(bitCoin).is(':checked')) {
      $('#credit-card').hide();
      $('.paypal').hide();
      $('.bitcoin').show();
    } else if ($(payMethod).is(':checked')) {
      $(payMethod).attr('disabled', 'disabled');
      $('#credit-card').show();
      $('.paypal').show();
      $('.bitcoin').show();
    }
  });

  // Form Validation

  // Name field can't be blank
  const name = $('#name');
  const email = $('#mail');
  const register = $('.activities input[type="checkbox"]');
  const credit = $('#cc-num');
  const zip = $('#zip');
  const cvv = $('#cvv');
  const nameError =
    '<span id="name-error" tooltip="Please enter first and last name"></span>';
  $(name).after(nameError);
  const nameError2 = '<span id="name-error2">Name is required</span>';
  $('#name-error').after(nameError2);
  // Email must be valid
  const emailError =
    '<span id="email-error" tooltip="Please enter full email address"></span>';
  $(email).after(emailError);
  const emailError2 = '<span id="email-error2">Email is required</span>';
  $('#email-error').after(emailError2);
  // User must select at least 1 activity
  const activityError =
    '<span id="activity-error" tooltip="Please choose at least 1 activity"></span>';
  $(cost).append(activityError);
  // CC must have 13-16 digits
  const creditError =
    '<span id="credit-error" tooltip="Please enter 13-16 digit card number"></span>';
  $(credit).after(creditError);
  const creditError2 = '<span id="credit-error2">Card number required</span>';
  $('#credit-error').after(creditError2);
  // Zip must have 5 digits
  const zipError =
    '<span id="zip-error" tooltip="Please enter 5 digit zip code"></span>';
  $(zip).after(zipError);
  const zipError2 = '<span id="zip-error2">Zip code required</span>';
  $('#zip-error').after(zipError2);
  // CCV must have 3 digits
  const cvvError =
    '<span id="cvv-error" tooltip="Please enter 3 digit security code"></span>';
  $(cvv).after(cvvError);
  const cvvError2 = '<span id="cvv-error2">Security code required</span>';
  $('#cvv-error').after(cvvError2);

  // Regex & testing
  const validName = /^[a-z\D]{2,40}[,\s-][a-z\D]{2,40}$/i;
  const validEmail = /^[^@]+@[^@.]+\.[a-z]+$/i;
  const validCredit = /^\d{13,16}$/;
  const validZip = /^\d{5}$/;
  const validCvv = /^\d{3}$/;

  function validateName(name) {
    return validName.test(name);
  }
  function validateEmail(email) {
    return validEmail.test(email);
  }
  function validateCredit(credit) {
    return validCredit.test(credit);
  }
  function validateZip(zip) {
    return validZip.test(zip);
  }
  function validateCvv(cvv) {
    return validCvv.test(cvv);
  }
  // Form Validation Messages
  $('#name-error').hide() &&
    $('#email-error').hide() &&
    $('#activity-error').hide() &&
    $('#credit-error').hide() &&
    $('#zip-error').hide() &&
    $('#cvv-error').hide();
  $('#name-error2').hide() &&
    $('#email-error2').hide() &&
    $('#activity-error2').hide() &&
    $('#credit-error2').hide() &&
    $('#zip-error2').hide() &&
    $('#cvv-error2').hide();

  $(name).on('keyup', function() {
    if (validateName(name.val())) {
      $(name).css('border', '3px solid green') &&
        $('#name-error').hide() &&
        $('#name-error2').hide();
    } else {
      $(name).css('border', '3px solid redq') &&
        $('#name-error').show() &&
        $('#name-error2').hide();
      return false;
    }
  });

  $(email).on('keyup', function() {
    if (validateEmail(email.val())) {
      $(email).css('border', '3px solid green') &&
        $('#email-error').hide() &&
        $('#email-error2').hide();
    } else {
      $(email).css('border', '3px solid red') &&
        $('#email-error').show() &&
        $('#email-error2').hide();
      return false;
    }
  });

  $(credit).on('keyup', function() {
    if (validateCredit(credit.val())) {
      $(credit).css('border', '3px solid green') &&
        $('#credit-error').hide() &&
        $('#credit-error2').hide();
    } else {
      $(credit).css('border', '3px solid red') &&
        $('#credit-error').show() &&
        $('#credit-error2').hide();
      return false;
    }
  });

  $(zip).on('keyup', function() {
    if (validateZip(zip.val())) {
      $(zip).css('border', '3px solid green') &&
        $('#zip-error').hide() &&
        $('#zip-error2').hide();
    } else {
      $(zip).css('border', '3px solid red') &&
        $('#zip-error').show() &&
        $('#zip-error2').hide();
      return false;
    }
  });

  $(cvv).on('keyup', function() {
    if (validateCvv(cvv.val())) {
      $(cvv).css('border', '3px solid green') &&
        $('#cvv-error').hide() &&
        $('#cvv-error2').hide();
    } else {
      $(cvv).css('border', '3px solid red') &&
        $('#cvv-error').show() &&
        $('#cvv-error2').hide();
      return false;
    }
  });

  // validation when form is submitted
  $('form').on('submit', function(e) {
    if ($(name).val() === '') {
      $(name).css('border', '3px solid red') &&
        $('#name-error2').show() &&
        $('#name-error').hide();
      e.preventDefault();
    } else {
      $('#name-error2').hide();
    }

    if ($(email).val() === '') {
      $(email).css('border', '3px solid red') &&
        $('#email-error2').show() &&
        $('#email-error').hide();
      e.preventDefault();
    } else {
      $('#email-error2').show();
    }

    if ($totalCost === 0) {
      $('#cost').css('border', '3px solid red') && $('#activity-error').show();
      e.preventDefault();
    } else {
      $(' #cost').css('border', '3px solid green');
      $('#activity-error').hide();
    }

    if ($('.credit-card').is(':visible')) {
      if ($(credit).val() === '') {
        $(credit).css('border', '3px solid #red') &&
          $('#credit-error2').show() &&
          $('#credit-error').hide();
        e.preventDefault();
      } else {
        $('#credit-error2').hide();
      }

      if ($(zip).val() === '') {
        $(zip).css('border', '3px solid red') &&
          $('#zip-error2').show() &&
          $('#zip-error').hide();
        e.preventDefault();
      } else {
        $('#zip-error2').hide();
      }

      if ($(cvv).val() === '') {
        $(cvv).css('border', '3px solid red') &&
          $('#cvv-error2').show() &&
          $('#cvv-error').hide();
        e.preventDefault();
      } else {
        $('#cvv-error2').hide();
      }
    }
  });
});
