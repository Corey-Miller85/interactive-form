


// ***********************************
// ***      Name Field             ***
// ***********************************

//name entry field focus
$('#name').focus();
//text box if other is selected
const textBoxLabel = $('<label id="text-box-label" for="text-box">Other Job Role:</label>');
const textBox = $('<input type="text" id="text-box" name="title-textbox"></input>');
$('.firstField').append(textBoxLabel);
$('.firstField').append(textBox);
$('#text-box-label').attr('hidden',true);
$('#text-box').attr('hidden', true);
$('#title').on('change', () =>{
    if ($('#title').val() === 'other') {
        $('#text-box-label').removeAttr("hidden");
        $('#text-box').removeAttr("hidden");
    } else {
        $('#text-box-label').attr('hidden',true);
        $('#text-box').attr('hidden',true);
    }
});


// ***********************************
// ***      Design Field           ***
// ***********************************

// when no design is choosen, select color to be noSelection
$(document).ready( () => {
    const noSelection = $('<option value="no-design-selection" selected=true>Please Select a Design</option>');
    $('#color option').each(function (index, element) {
        $(element).attr('hidden', true);
    });
    $('#color').prepend(noSelection);
});

//checks to see if there is a selection, and chooses correct color
$('#design').on('change', (e) => {
    const eTarget = $(e.target)
    $('#design option').each((index, element) => {
        $(element).removeAttr('selected');
    });
    $('#color option').each((index, element) => {
        $(element).removeAttr('selected');
    });
    if (eTarget.val() === 'select theme') {
        $('#color option').each(function (index, element) {
            $(this).attr('hidden',true);
        });
        $('option[value="select theme"]').attr('selected', true); 
    
        //assigns correct colors to JS puns
    } else if (eTarget.val() === 'js puns') {
        $('#color option').each(function (index, element) {
            $(element).attr('hidden', false);
            if ($(element).val() === "no-design-selection") {
                $(element).attr('hidden', true);
            } else if ($(element).val() === "cornflowerblue") {
                $(this).attr('hidden', false);
                $(this).attr('selected',true);
            } else if ($(element).val() === "darkslategrey" || $(element).val() === "gold") {
                $(this).attr('hidden', false);
            } else if ($(element).val() === "tomato" || $(element).val() === "steelblue" || $(element).val() === "dimgrey") {
                $(this).attr('hidden', true);
            }
        });
    $('option[value="js puns"]').attr('selected', true);
        //assigns correct colors to heart js

    } else if (eTarget.val() === 'heart js') {
         $('#color option').each(function (index, element) {
             $(element).attr('hidden', false);
             if ($(element).val() === "no-design-selection") {
                $(element).attr('hidden', true);
             } else if ($(element).val() === "cornflowerblue" || $(element).val() === "darkslategrey" || $(element).val() === "gold") {
                $(this).attr('hidden', true);
             } else if ($(element).val() === "tomato") { 
                $(this).attr('hidden', false);
                $(this).attr('selected', true);
            } else if ($(element).val() === "steelblue" || $(element).val() === "dimgrey") {
                $(this).attr('hidden', false);
             }
         });
        $('option[value="heart js"]').attr('selected', true);
    } 
});




// ***********************************
// ***   Register for Activities   ***
// ***********************************

let totalCost = 0;
//if total cost is greater than zero show total at bottom of fieldset

const totalAmountText = $(`<p>Total Cost of Package: $0</p>`)
$('.activities').append(totalAmountText);

////if JavaScript Frameworks Workshop is chosen block Express workshop.
$('.activities').change( (e) => {

    //create easier selectors
    const jsFrameworks = $('input[name="js-frameworks"]');
    const express = $('input[name="express"]');
    const node = $('input[name="node"]');
    const jsLibs = $('input[name="js-libs"]');
    const conference = $('input[name="all"]');
    const buildTools = $('input[name="build-tools"]');
    const npm = $('input[name="npm"]');
//if the target is the correlating box , disable conflicting check boxes and add cost to total cost variable;
    if ($(e.target).prop("name") === 'js-frameworks' && jsFrameworks.is(":checked")) {
        disable(express);
        totalCost += cost(jsFrameworks);
    } else if ($(e.target).prop("name") === 'js-frameworks' && !jsFrameworks.is(":checked")){
        enable(express);
        totalCost -= cost(jsFrameworks);
    }
    if ($(e.target).prop("name") === 'express' && express.is(":checked")) {
        disable(jsFrameworks);
        totalCost += cost(express);
    } else if ($(e.target).prop("name") === 'express' && !express.is(":checked"))  {
        enable(jsFrameworks);
        totalCost -= cost(express);
    }

    if ($(e.target).prop("name") === 'node' && node.is(":checked")) {
        disable(jsLibs);
        totalCost += cost(node);
    } else if ($(e.target).prop("name") === 'node' && !node.is(":checked")){
        enable(jsLibs);
        totalCost -= cost(node);
    }

    if ($(e.target).prop("name") === 'js-libs' && jsLibs.is(":checked")) {
        disable(node);
        totalCost += cost(jsLibs);
    } else if ($(e.target).prop("name") === 'js-libs' && !jsLibs.is(":checked")){
        enable(node);
        totalCost -= cost(jsLibs);

    }

    if ($(e.target).prop("name") === 'build-tools' && buildTools.is(":checked")) {
        totalCost += cost(buildTools);
    } else if ($(e.target).prop("name") === 'build-tools' && !buildTools.is(":checked")) {
        totalCost -= cost(buildTools);


    }
    if ($(e.target).prop("name") === 'npm' && npm.is(":checked")) {
        totalCost += cost(npm);
    } else if ($(e.target).prop("name") === 'npm' && !npm.is(":checked")){
        totalCost -= cost(npm);

    }

    if ($(e.target).prop("name") === 'all' && conference.is(":checked")) {
        totalCost += cost(conference);
    } else if ($(e.target).prop("name") === 'all' && !conference.is(":checked")) {
        totalCost -= cost(conference);
    }
    $(totalAmountText).html(`Total Cost of Package: $${totalCost}`);
});



//helper functions to refactor code.
function disable(element) {
    element.prop('disabled', true);
    element.prop('checked', false);
}

function enable(element) {
    element.prop('disabled', false);

}
// takes the data-cost property, splits into array, chooses 2nd element, parses the inter from string.
function cost(element) {
    const array = element.attr('data-cost').split('$')[1];
    return parseInt(array);
}

// ***********************************
// ***      Payment Options        ***
// ***********************************

$('option[value="select method"]').prop('disabled',true);


function paymentInfo(target) {
    if (target === "Credit Card") {
        $('.credit-card').prop("hidden", false);
        $('#paypal').prop("hidden", true);
        $('#bitcoin').prop("hidden", true);
    }
    if (target === "PayPal") {
        $('#credit-card').prop("hidden", true);
        $('#paypal').prop("hidden", false);
        $('#bitcoin').prop("hidden", true);
    }
    if (target === "Bitcoin") {
        $('#credit-card').prop("hidden", true);
        $('#paypal').prop("hidden", true);
        $('#bitcoin').prop("hidden", false);
    }
}


$('#payment').on('change', (e) => {
    paymentInfo($(e.target).val())
});



// ***********************************
// ***      Form Validation        ***
// ***********************************

function invalidClass() {
    $('.invalid').css('background', 'red');
}

function validClass() {
    $('.valid').css('background', '');
}

// ***********************************
// ***      Name Validation        ***
// ***********************************


function validateName() {
    const username = $('#name').val();
    let regex = /^[A-Za-z]+$/
    if (regex.test(username)){
        $('#name').removeClass('invalid');
        $('#name').addClass('valid');
        validClass();
        return true;
    } else {
        $('#name').removeClass('valid');
        $('#name').addClass('invalid');
        invalidClass();
        return false;
    }
}

$('#name').on('keyup', () => {
    if (validateName() === false && $('#name').val().length > 0) {
        return false;
    } else {
        return true;  
    }
});

// ***********************************
// ***      Mail Validation        ***
// ***********************************


function validateEmail() {
    const mailName = $('#mail').val();
    let regex = /^[a-z]+/;
    if (regex.test(mailName)) {
        $('#mail').removeClass('invalid');
        $('#mail').addClass('valid');
        validClass();
        return true;
    } else {
        $('#mail').removeClass('valid');
        $('#mail').addClass('invalid');
        invalidClass();
        return false;
    }
}

$('#mail').on('keyup', () => {
    const mailName = $('#mail').val();
    if (!validateEmail() && mailName.length > 0) {
        return false;
    } else {
        return true;   
    }
});

function validateActivities() {
    if ($('input[type="checkbox"]:checked').length > 0) {
        $('.activities').removeClass('invalid');
        $('.activities').addClass('valid');
        validClass();
        return true;
    } else {
        
        $('.activities').addClass('invalid');
        $('.activities').removeClass('valid');
        invalidClass();
        return false;
    }
}

function validateZip(){
    const zip = $('#zip').val();
    let regex = /^[0-9]+$/;
    if (regex.test(zip)) {
        $('#zip').removeClass('invalid');
        $('#zip').addClass('valid');
        validClass();
        return true;
    } else {
        $('#zip').removeClass('valid');
        $('#zip').addClass('invalid');
        invalidClass();
        return false;
    }}

function validateCVV(){
    const cvv = $('#cvv').val();
    let regex = /[0-9]{3}/;
    if (regex.test(cvv)) {
        $('#cvv').removeClass('invalid');
        $('#cvv').addClass('valid');
        validClass();
        return true;
    } else {
        $('#cvv').removeClass('valid');
        $('#cvv').addClass('invalid');
        invalidClass();
        return false;
    }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

function validateCreditCard() {
    const ccNumber = $('#cc-num').val();
    let regex = /[0-9]+/;
    if (regex.test(ccNumber)) {
        $('#cc-num').removeClass('invalid');
        $('#cc-num').addClass('valid');
        validClass();
        return true;
    } else {
        $('#cc-num').removeClass('valid');
        $('#cc-num').addClass('invalid');
        invalidClass();
        return false;
    }
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//


function validateCreditCardPayment() {
    if ($('#payment[value="Credit Card"]')){
        if (!validateCreditCard()){
            validateCVV();
            validateZip();
            return false;
        }
        if (!validateCVV()){
            validateZip();
            return false;
        }
        if (!validateZip()){
            return false;
        }
        return true
    } 
}



 // checks all validations 
function masterValidate() {
    if (!validateName()) {
        validateEmail();
        validateActivities();
        validateCreditCardPayment();
        return false;
    }
    if (!validateEmail()) {
        validateActivities();
        validateCreditCardPayment();
        return false;
    }
    
    if (!validateActivities()) {
        validateCreditCardPayment();
        return false;
    }
    if ($('#payment').val() === 'Credit Card') {
        if (!validateCreditCardPayment()) {
            return false;
        }
    return true
    }
}

//prevents submit if any validations return false
$('form').submit((e) => {
   if (!masterValidate()) {
       e.preventDefault();
       return false
   }
   return true
});
