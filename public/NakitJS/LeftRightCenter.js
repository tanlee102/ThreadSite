///SET LEFT CENTER RIGHT:
changeclassAlign(true, false, false);

function changeclassAlign(le, ce, ri){
    if(le) document.getElementById('btn-left-align-nakit').classList.add('select-icon');
    else document.getElementById('btn-left-align-nakit').classList.remove('select-icon');
    
    if(ce) document.getElementById('btn-center-align-nakit').classList.add('select-icon');
    else document.getElementById('btn-center-align-nakit').classList.remove('select-icon');
    
    if(ri) document.getElementById('btn-right-align-nakit').classList.add('select-icon');
    else document.getElementById('btn-right-align-nakit').classList.remove('select-icon'); 
}

function prechangeclassAlign(typechange){
    if(typechange === 'left'){
        changeclassAlign(true, false, false);
    }else if(typechange === 'center'){
        changeclassAlign(false, true, false);
    }else if(typechange === 'right'){
        changeclassAlign(false, false, true);
    }else{
        changeclassAlign(true, false, false);
    }
}

function getTypeAlign(achcer){
        if(achcer.parentNode){
            if(achcer.parentNode.classList.contains('fr-text')){
                try {
                    prechangeclassAlign(String(achcer.style.textAlign));
                } catch (error) {
                    changeclassAlign(true, false, false); 
                }
            }else{
                if(achcer.parentNode.style.textAlign){
                    prechangeclassAlign(String(achcer.parentNode.style.textAlign));
                }else{
                    getTypeAlign(achcer.parentNode);
                }
            }
        }else{
            changeclassAlign(true, false, false);
        }
}

function PointerAfterAlign(){
    try {
        const selection = window.getSelection();
        const p = selection.anchorNode;
        const s = window.getSelection();
        const r = document.createRange();
        r.setStart(p,selection.anchorOffset);
        if(selection.toString().length > 0) r.setEnd(p,selection.toString().length)
        s.removeAllRanges();
        s.addRange(r);
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('btn-center-align-nakit').onmousedown = (event) => {
    event.preventDefault();
    document.getElementById('editable').focus();
    document.execCommand("JustifyCenter", false, null);
    PointerAfterAlign();
    changeclassAlign(false, true, false)
};
document.getElementById('btn-left-align-nakit').onmousedown = (event) => {
    event.preventDefault();
    document.getElementById('editable').focus();
    document.execCommand("JustifyLeft", false, null);
    PointerAfterAlign();
    changeclassAlign(true, false, false)
};
document.getElementById('btn-right-align-nakit').onmousedown = (event) => {
    event.preventDefault(); 
    document.getElementById('editable').focus();
    document.execCommand("JustifyRight", false, null);
    PointerAfterAlign();
    changeclassAlign(false, false, true)
};

///-------------------------------------------------------------------