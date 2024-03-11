///SET ALL:

document.execCommand('stylewithCSS',false,true);

var listSizeHeight = [    
        'small',
        'normal',
        'large',
        'x-large',
]
var listSizeHeight_ = [
        'small1',
        'normal',
        'large1',
        'large2',
        'unknown'
]

var input_editable = document.getElementById("editable");



///-------------------------------------------------------------------

var rangesave;
function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}




function loopTagCheck(achcer, nametag, count=false){
    if(achcer && achcer.classList){
        if(achcer.classList.contains('fr-text')){
            return false;
        }else{
            if(achcer.tagName === nametag){
                return true;
            }else return loopTagCheck(achcer.parentNode, nametag, true);
        }
    }else{
        if(count == false){
            return loopTagCheck(achcer.parentNode, nametag, true);
        }else{
            return false;
        }
    }
}

function loopStyleCheck(achcer, styletag, attrtag, count=false){
    if(achcer && achcer.classList){
        if(achcer.classList.contains('fr-text')){
            return false;
        }else{
            if(String(achcer.style[styletag]).replace(/ /g,'') === (attrtag)){ 
                return true;
            }else return loopStyleCheck(achcer.parentNode, styletag, attrtag, true);
        }
    }else{
        if(count == false){
            return loopStyleCheck(achcer.parentNode, styletag, attrtag, true);
        }else{
            return false;
        }
    }
}


function MakeItemHeightText(number){
    document.getElementById('text-height-label-nakit').innerHTML = listSizeHeight_[number];
    var allTextHeightItem = document.querySelectorAll(".text-height-dropdown-nakit > div > ul > li");
    for (var i = 0; i < allTextHeightItem.length; i++) {
        if(number == i) allTextHeightItem[i].setAttribute("id", "chose-text-height-nakit");
        else allTextHeightItem[i].removeAttribute('id');
    }
}
function loopStyleCheckHeight(sel){
    var loophas = false;
    for(var i = 0; i < listSizeHeight.length; i++){
        if(loopStyleCheck(sel, 'fontSize', listSizeHeight[i]) ){
            MakeItemHeightText(i)
            loophas = true;
        }
    }
    if(loophas == false){
        if( (loopTagCheck(sel, 'P') || loopTagCheck(sel, 'SPAN')) || loopTagCheck(sel, 'DIV') || sel.parentNode.classList.contains('fr-text')){
            MakeItemHeightText(1)
        }else{
            MakeItemHeightText(4)
        }
    }
}


function loopNodeNameCheck(achcer, nodename, count=false){
    if(achcer.classList && achcer){
        if(achcer.classList.contains('fr-text')){
            return false;
        }else{
            if(achcer.nodeName === nodename){
                return true;
            }else{
                return loopNodeNameCheck(achcer.parentNode, nodename, true);
            }
        }        
    }else{
        if(count == false){
            return loopNodeNameCheck(achcer.parentNode, nodename, true);
        }else{
            return false;
        }    
    }
}


function loopNodeNameAddClass(achcer, nodename, classAdd, count=false){
    if(achcer.classList && achcer){
        if(!achcer.classList.contains('fr-text')){
            if(achcer.nodeName === nodename){
                $(achcer).addClass(classAdd);
            }else{
                loopNodeNameAddClass(achcer.parentNode, nodename, classAdd, true);
            }
        }      
    }else{
        if(count == false){
            loopNodeNameAddClass(achcer.parentNode, nodename, classAdd, true);
        }  
    }
}
///-------------------------------------------------------------------


///SET ALLL ONCHANGE
document.onselectionchange = function() {

    if ($("#editable").is(":focus")) {

        if (input_editable === document.activeElement) {rangesave = saveSelection();}

        var sel = window.getSelection().anchorNode;
    
        try {
            if(loopNodeNameCheck(sel,"BLOCKQUOTE")) {
                $("blockquote *").removeAttr("style");
            }
        } catch (error) {
            console.log(error)
        }
    
        try {
                if(loopTagCheck(sel, 'B')  || loopStyleCheck(sel, 'fontWeight', 'bold') || loopStyleCheck(sel, 'fontWeight', '700') ) document.getElementById('btn-bold-align').classList.add('select-icon');
                else  document.getElementById('btn-bold-align').classList.remove('select-icon');
    
                if(loopTagCheck(sel, 'I')  || loopStyleCheck(sel, 'fontStyle', 'italic') ) document.getElementById('btn-italic-align').classList.add('select-icon');
                else  document.getElementById('btn-italic-align').classList.remove('select-icon');
    
                if(loopTagCheck(sel, 'U')  || loopStyleCheck(sel, 'textDecorationLine', 'underline') ) document.getElementById('btn-underline-align').classList.add('select-icon');
                else  document.getElementById('btn-underline-align').classList.remove('select-icon');
    
                loopStyleCheckHeight(sel);
                getTypeAlign(sel);
        } catch (error) {
            console.log(error)
        }


    } else {
        console.log("Doesn't Have Focus");
    }




};


///-------------------------------------------------------------------

function removeStyle() {
    document.getElementById('editable').focus();
    sel = window.getSelection();
    sel = sel.anchorNode;

    sel.style = "";
    try {
        sel = sel.parentNode;
        sel.style = "";    
    } catch (error) {
        console.log(error)
    }
}

input_editable.onkeydown = function(event) {
    var key = event.keyCode || event.charCode;


    if( key == 13){

        var sel = window.getSelection();
        if(sel.anchorOffset == 0 && !sel.anchorNode.wholeText){
            if(loopNodeNameCheck(sel.anchorNode,"BLOCKQUOTE")) {
                event.preventDefault();
                document.execCommand('outdent', false, null);
                removeStyle();
            }
        }

    }

    if( key == 8){

        var sel = window.getSelection();
        if(sel.anchorOffset == 0){
            if(loopNodeNameCheck(sel.anchorNode,"BLOCKQUOTE")) {
                event.preventDefault();
                document.execCommand('outdent', false, null);
                removeStyle();
            }
        }

    }

};


///-------------------------------------------------------------------

///CONTROL COPY PASTE:

input_editable.onpaste = (e) => {
    // cancel paste
    e.preventDefault();
    // get text representation of clipboard
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
    // insert text manually
    document.execCommand("insertText", false, text);
};


///------------------------------------------------------------------

function displayItemBarNakit(link,image,height){
    try {
        document.getElementById('make-link-dropdown-nakit').style.display = link;
        document.getElementById('make-image-dropdown-nakit').style.display = image;
        document.getElementsByClassName('text-height-dropdown-nakit').item(0).style.display = height;
        
        document.getElementsByClassName('mark-head-sheet-nakit').item(0).style.display = link;
        document.getElementsByClassName('mark-head-sheet-nakit').item(1).style.display = image;     
    
        if(height === 'none') document.getElementById('btn-text-height-nakit').classList.remove('select-icon');
        if(image === 'none') $(".make-image-input-nakit").val('');
        if(link === 'none') $(".make-link-input-nakit").val('');   
    } catch (error) {
        
    }
}




///RESIZE:

window.onresize = function(event) {
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}else{
    displayItemBarNakit('none','none','none');
}
};




