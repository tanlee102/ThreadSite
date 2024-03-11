///SET BOLD ITALIC UNDERLINE:
function switchButtonColor(idname){
    if(document.getElementById(idname).classList.contains('select-icon')) document.getElementById(idname).classList.remove('select-icon');
    else document.getElementById(idname).classList.add('select-icon');
}

document.getElementById('btn-bold-align').onmousedown = (event) => {
    event.preventDefault();
    document.getElementById('editable').focus();
    switchButtonColor('btn-bold-align');
    document.execCommand("bold", false, true);
    document.getElementById('editable').focus();
}

document.getElementById('btn-underline-align').onmousedown = (event) => {
    event.preventDefault();
    document.getElementById('editable').focus();
    switchButtonColor('btn-underline-align');
    document.execCommand("underline", false, true);
    document.getElementById('editable').focus();
}

document.getElementById('btn-italic-align').onmousedown = (event) => {
    event.preventDefault();
    document.getElementById('editable').focus();
    switchButtonColor('btn-italic-align');
    document.execCommand("italic", false, true);
    document.getElementById('editable').focus();
}



///-------------------------------------------------------------------