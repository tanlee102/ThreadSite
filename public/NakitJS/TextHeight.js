///SET TEXT HEIGHT:
document.getElementById('btn-text-height-nakit').classList.remove('select-icon');
document.getElementsByClassName('text-height-dropdown-nakit').item(0).style.display = 'none';


document.getElementById('btn-text-height-nakit').onmousedown = (event) => {
    event.preventDefault();
    if(Number(event.target.title) > 0){
        document.getElementById('editable').focus();
        document.querySelector('#chose-text-height-nakit').removeAttribute('id');
        event.target.setAttribute("id", "chose-text-height-nakit");
        document.getElementsByClassName('text-height-dropdown-nakit').item(0).style.display = 'none';
        document.getElementById('btn-text-height-nakit').classList.remove('select-icon');

        document.execCommand("fontSize", false, String(event.target.title));

        document.getElementById('text-height-label-nakit').innerHTML = listSizeHeight_[Number(event.target.title)-2];
    }else if(Number(event.target.title) != -1){
        displayItemBarNakit('none','none','block')
        if(document.getElementById('btn-text-height-nakit').classList.contains('select-icon')){
            document.getElementById('btn-text-height-nakit').classList.remove('select-icon');
            document.getElementsByClassName('text-height-dropdown-nakit').item(0).style.display = 'none';
        }else{
            document.getElementById('btn-text-height-nakit').classList.add('select-icon');
        }
    }
    document.getElementById('editable').focus();
};



///-------------------------------------------------------------------