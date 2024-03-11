function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

function checkInHasgTag(){
    var sel = document.getSelection();
    var nd = sel.anchorNode;
    return (String(nd.className).includes('bold-text-polling') || String(nd.parentNode.className).includes('bold-text-polling') || String(nd.parentNode.parentNode.className).includes('bold-text-polling'));
}




var hashtags = false;

var hashTagInput = document.getElementById('input-hashtag-field');
hashTagInput.addEventListener('textInput', function(e){ //beforeinput

    var input_field = $(this);
    var keyCode = e.data.charCodeAt(0);

    if (keyCode == 10) {
        e.preventDefault();
    }

    if (keyCode == 32) { // space key
        if (hashtags || checkInHasgTag()) {
            e.preventDefault();
            input_field.html(input_field.html() + "</span><span>&nbsp;");
            placeCaretAtEnd(this);
            hashtags = false;
        }
    }
    
    if (keyCode == 35 && ($(this).html() !== '')) { // hash key (#)
        e.preventDefault();
        input_field.html(input_field.html() + "</span><span class='tag bold-text-polling new'>#");
        placeCaretAtEnd(this);
        hashtags = true;
    }

});