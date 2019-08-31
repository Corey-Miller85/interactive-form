

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
    console.log(eTarget.val());
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
             console.log($(element).val());
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


////if JavaScript Frameworks Workshop is chosen block Express workshop.
$('.activities').on('change', (e) => {
    if ($('input[name="js-frameworks"').prop("checked")) {
        $('input[name="express"').prop({
            disabled: true
        });
    } 
    if ($('input[name="express"').prop("checked")) {
        $('input[name="js-frameworks"').prop({
            disabled: true
        });
    }
     
});

