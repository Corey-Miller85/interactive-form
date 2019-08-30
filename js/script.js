

//name entry field focus
$('#name').focus();
//text box if other is selected
const textBoxLabel = $('<label id="text-box-label" for="text-box">Other Job Role:</label>');
const textBox = $('<input type="text" id="text-box" name="title-textbox"></input>');
$('.firstField').append(textBoxLabel);
$('.firstField').append(textBox);
$('#text-box-label').hide();
$('#text-box').hide();
$('#title').on('change', () =>{
    if ($('#title').val() === 'other') {
        $('#text-box-label').show();
        $('#text-box').show();
    } else {
        $('#text-box-label').hide();
        $('#text-box').hide();
    }
});


// when no design is choosen, select color to be noSelection
$(document).ready( () => {
     const noSelection = $('<option selected value="noSelect">Please Make a Selection</option>');
    $('#color option').each(function (index, element) {
        $(element).hide();
    });
    $('#color').prepend(noSelection);
});

//checks to see if there is a selection, and chooses correct color
$('#design').on('change', () => {
    //creates "please select a design" in color box element
    const noSelection = $('<option selected value="noSelect">Please Make a Selection</option>');
        //if design shows "select theme" loop through color options and hide them then append the option Please choose, and select it.
    if ($('#design').val() === "Select Theme") {
        $('#color option').each(function(index, element){
            $(element).hide();
        });
        $('#color').prepend(noSelection);
    } else if ($('#design').val() === "js puns") {
        //if a design is selected, show the color options, hide the choose design option, and then select a valid color.
        $('#color option').each(function (index, element) {
            if ($(element).val() === "noSelect") {
                $(element).hide();
            } else if ($(element).val() === 'cornflowerblue') { // jumps noSelect and marks the next as selected by default.
                $(element).show();
                $(element).attr('selected', true);
            } else if ($(element).val() === 'darkslategrey' || 'gold') { //shows the rest of the colors.
                $(element).show();
            } else {
                $(element).hide();
            }
        });
    }
});
