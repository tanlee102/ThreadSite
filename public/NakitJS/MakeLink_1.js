/// SET MAKE LINK

document.getElementById('make-link-dropdown-nakit').style.display = 'none';


document.getElementById('btn-make-link-nakit').onmousedown = (e) => {
    e.preventDefault();
    if(e.target.id === '' || e.target.id === 'btn-make-link-nakit')
    if(String(document.getElementById('make-link-dropdown-nakit').style.display) === 'none'){

        displayItemBarNakit('block','none','none');

        var ofxt =  Number(document.getElementById('btn-make-link-nakit').offsetTop) -  Number(document.getElementsByClassName('fr-toolbar').item(0).offsetTop);
        document.getElementById('make-link-dropdown-nakit').style.top = ofxt + 33 + 'px';
        var lefp = Number(document.getElementsByClassName('fr-toolbar').item(0).offsetLeft);
        var lefe = Number(document.getElementById('btn-make-link-nakit').offsetLeft)
        let rige = window.innerWidth - document.getElementById('btn-make-link-nakit').offsetLeft - document.getElementById('btn-make-link-nakit').offsetWidth;
        var widthdropdown = document.getElementById('make-link-dropdown-nakit').offsetWidth;
        if(lefe <= widthdropdown/2){
            document.getElementById('make-link-dropdown-nakit').style.left = 0 + 'px';
        } 
        if(rige <= widthdropdown/2){
            console.log(rige)
            document.getElementById('make-link-dropdown-nakit').style.left = 'auto';
            document.getElementById('make-link-dropdown-nakit').style.right = 0 + 'px';
        }
        if(lefe > widthdropdown/2 && rige > widthdropdown/2){
            document.getElementById('make-link-dropdown-nakit').style.left = lefe - lefp - widthdropdown/2 + 20 + 'px';
        }
    }
};



document.getElementById('btn-exe-cancel-link-nakit').onmousedown = (e) => {
    e.preventDefault();
    displayItemBarNakit('none','none','none');
}


document.getElementById('btn-exe-make-link-nakit').onmousedown = (e) => {
    e.preventDefault();
    try {
        var selection = window.getSelection();
        var s = selection;
        s.removeAllRanges()
        s.addRange(rangesave)
        document.execCommand('insertHTML', false, '<a href="' + document.getElementsByClassName('make-link-input-nakit').item(1).value + '" target="_blank">' + document.getElementsByClassName('make-link-input-nakit').item(0).value + '</a>');
        document.getElementById('editable').focus();

        displayItemBarNakit('none','none','none');
    } catch (error) {
        console.log(error);
    }
}

///-------------------------------------------------------------------