/// SET MAKE IMAGE:

document.getElementById('make-image-dropdown-nakit').style.display = 'none';

document.getElementById('btn-make-image-nakit').onmousedown = (e) => {
    e.preventDefault();
    if(e.target.id === '' || e.target.id === 'btn-make-image-nakit')
    if(String(document.getElementById('make-image-dropdown-nakit').style.display) === 'none'){
        displayItemBarNakit('none','block','none');

        var ofxt =  Number(document.getElementById('btn-make-image-nakit').offsetTop) -  Number(document.getElementsByClassName('fr-toolbar').item(0).offsetTop);
        document.getElementById('make-image-dropdown-nakit').style.top = ofxt + 33 + 'px';
        var lefp = Number(document.getElementsByClassName('fr-toolbar').item(0).offsetLeft);
        var lefe = Number(document.getElementById('btn-make-image-nakit').offsetLeft)
        let rige = window.innerWidth - document.getElementById('btn-make-image-nakit').offsetLeft - document.getElementById('btn-make-image-nakit').offsetWidth;
        var widthdropdown = document.getElementById('make-image-dropdown-nakit').offsetWidth;
        if(lefe <= widthdropdown/2){
            document.getElementById('make-image-dropdown-nakit').style.left = 0 + 'px';
        }
        if(rige <= widthdropdown/2){
            document.getElementById('make-image-dropdown-nakit').style.left = 'auto';
            document.getElementById('make-image-dropdown-nakit').style.right = 0 + 'px';
        }
        if(lefe > widthdropdown/2 && rige > widthdropdown/2){
            document.getElementById('make-image-dropdown-nakit').style.left = lefe - lefp - widthdropdown/2 + 20 + 'px';
        }
        
    }
};

document.getElementById('btn-exe-cancel-image-nakit').onmousedown = (e) => {
    e.preventDefault();
    displayItemBarNakit('none','none','none');
};

document.getElementById('btn-exe-make-image-nakit').onmousedown = (e) => {
    e.preventDefault();
    try {
        const s = window.getSelection();
        s.removeAllRanges();
        s.addRange(rangesave);
        document.getElementById('editable').focus();
        
        document.execCommand('insertHTML', false, '<img class="image-nakit" src="' + document.getElementsByClassName('make-image-input-nakit').item(0).value + '" />');
        document.getElementById('editable').focus();

        displayItemBarNakit('none','none','none');
    } catch (error) {
        console.log(error);
    }
};

///-------------------------------------------------------------------