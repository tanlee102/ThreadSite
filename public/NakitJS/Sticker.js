///SET STICKER:
document.getElementsByClassName('btn-move-hz-bar-left').item(0).style.display = 'none';
document.getElementsByClassName('btn-move-hz-bar-right').item(0).style.display = 'block';

    // $('.hz-bar').scroll( function() {
    document.getElementsByClassName('hz-bar').item(0).onscroll = (e) => {
        var $width = $('.hz-bar').outerWidth()
        var $scrollWidth = $('.hz-bar')[0].scrollWidth; 
        var $scrollLeft = $('.hz-bar').scrollLeft();

        if ($scrollWidth - $width <= $scrollLeft + 10){
            document.getElementsByClassName('btn-move-hz-bar-left').item(0).style.display = 'block';
            document.getElementsByClassName('btn-move-hz-bar-right').item(0).style.display = 'none';
        }else if ($scrollLeft <= 10){
            document.getElementsByClassName('btn-move-hz-bar-left').item(0).style.display = 'none';
            document.getElementsByClassName('btn-move-hz-bar-right').item(0).style.display = 'block';
        }else{
            document.getElementsByClassName('btn-move-hz-bar-left').item(0).style.display = 'block';
            document.getElementsByClassName('btn-move-hz-bar-right').item(0).style.display = 'block';
        }
    };

document.getElementsByClassName('fr-sticker').item(0).style.display = 'none';

document.getElementById('btn-make-sticker-nakit').onclick = (event) => {
    if(document.getElementsByClassName('fr-sticker').item(0).style.display === 'none'){
        document.getElementById('btn-make-sticker-nakit').classList.add('select-icon');
        document.getElementsByClassName('fr-sticker').item(0).style.display = 'block'

        if($('.hz-bar').outerWidth() == $('.hz-bar')[0].scrollWidth){
            document.getElementsByClassName('btn-move-hz-bar-left').item(0).style.display = 'none';
            document.getElementsByClassName('btn-move-hz-bar-right').item(0).style.display = 'none';
        }
       document.getElementById('btn-bold-align').focus();  
    }else{
        event.preventDefault();
        document.getElementById('btn-make-sticker-nakit').classList.remove('select-icon');
        document.getElementsByClassName('fr-sticker').item(0).style.display = 'none'
    }
};


document.getElementById('btn-insert-sticker-nakit').onclick = (event) => {
    event.preventDefault();
    try {
        document.getElementById('editable').focus();
        var selection = window.getSelection();
        var s = selection;
        s.removeAllRanges()
        s.addRange(rangesave)
        document.execCommand('insertHTML', false, '<img class="icon-nakit"  src="'+event.target.src+'" alt=":cheers:" title="Cheers :cheers:">');
  
    } catch (error) {
        console.log(error);
    }
};

document.getElementsByClassName('btn-move-hz-bar-left').item(0).onclick = function (){
        $('.hz-bar').scrollLeft(0);
        $('.hz-bar').mouseup()
    }

document.getElementsByClassName('btn-move-hz-bar-right').item(0).onclick = function (){
        $('.hz-bar').scrollLeft($('.hz-bar')[0].scrollWidth);
        $('.hz-bar').mouseup()
    }



///-------------------------------------------------------------------
    var count_scroll = 0;
    var attachment = false, lastPosition, position, difference;

    document.getElementsByClassName('hz-bar').item(0).onmousedown = (e) => {
        attachment = true, lastPosition = [e.clientX, e.clientY];
    }

    document.getElementsByClassName('hz-bar').item(0).onmouseup = (e) => {
        e.preventDefault();
        attachment = false;
        if(count_scroll < 10){
            e.preventDefault();
            if(e.target.tagName === 'SPAN'){
                document.getElementsByClassName('select-item-hz-bar').item(0).classList.remove('select-item-hz-bar');
                e.target.classList.add('select-item-hz-bar');
            }
            count_scroll = 0;
        }else count_scroll = 0;
    } 

    document.getElementsByClassName('hz-bar').item(0).onmousemove = (e) => {
        if( attachment == true ){
            position = [e.clientX, e.clientY];
            difference = [ (position[0]-lastPosition[0]), (position[1]-lastPosition[1]) ];
            $(".hz-bar").scrollLeft( $(".hz-bar").scrollLeft() - difference[0] );
            $(".hz-bar").scrollTop( $(".hz-bar").scrollTop() - difference[1] );
            lastPosition = [e.clientX, e.clientY];
            count_scroll = count_scroll + 1;
        }
    }

