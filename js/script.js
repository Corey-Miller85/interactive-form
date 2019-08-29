$('#name').focus();
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

