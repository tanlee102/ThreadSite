///SET LIST INDENT OUTDENT:

// document.getElementById('btn-make-indent-nakit').onmousedown = (event) => {
//     event.preventDefault() 
//     document.execCommand('indent', false, null);
// };

document.getElementById('btn-make-outdent-nakit').onmousedown = (event) => {
    event.preventDefault() 
    document.execCommand('outdent', false, null);
};

function setCaretToEnd(target) {
    try {
        const r = document.createRange();
        const s = window.getSelection();
        r.selectNodeContents(target);
        r.collapse(false);
        s.removeAllRanges();
        s.addRange(r);   
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('btn-make-numberlist-nakit').onmousedown = (event) => {
    event.preventDefault();
    document.execCommand('insertOrderedList')

    var selection = window.getSelection();
    PointerAfterAlign();
    if(selection.toString().length > 0) PointerAfterAlign();
    else setCaretToEnd(selection.anchorNode)
};

document.getElementById('btn-make-dotlist-nakit').onmousedown = (event) => {
    event.preventDefault();
    document.execCommand('insertUnorderedList');

    var selection = window.getSelection();
    if(selection.toString().length > 0) PointerAfterAlign();
    else setCaretToEnd(selection.anchorNode);
};

document.getElementById('btn-make-quote-nakit').onmousedown = function (event) {
    event.preventDefault();

    document.execCommand('formatBlock', false, 'blockquote');
    loopNodeNameAddClass(window.getSelection().focusNode, 'BLOCKQUOTE', 'quote-nakit')

    $("blockquote *").removeAttr("style");
    document.getElementById('editable').focus();
    
};

///-------------------------------------------------------------------
