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

// // closes the span housing the hashtag
// function closeSpan() {
//     var span = document.createElement("span");
//     span.setAttribute("data-role", "remove");
//     // span.setAttribute("class", "delHashtag");
//     span.setAttribute("aria-hidden", "true");
//     return span;
// }


function checkInHasgTag(){
    var sel = document.getSelection();
    var nd = sel.anchorNode;
    return (String(nd.className).includes('bold-text-polling') || String(nd.parentNode.className).includes('bold-text-polling') || String(nd.parentNode.parentNode.className).includes('bold-text-polling'));
}



// $(document).ready(function() {

  

    var hashtags = false;

    // $(document).on('keydown', '#myInputField', function(e) {
      
    //     var keyCode =  e.keyCode;

    //     console.log(keyCode)

        
    // });




    // hashTagInput.addEventListener('textInput', function(e){


    //     alert(e.data.charCodeAt(0))


    // })

    var hashTagInput = document.getElementById('input-hashtag-field');
    hashTagInput.addEventListener('textInput', function(e){
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

                // document.getElementsByClassName("new")[0].setAttribute("contenteditable", false);
                // document.getElementsByClassName("new")[0].appendChild(closeSpan());
            }

        } 
        
        if (keyCode == 35 && ($(this).html() !== '')) { // hash key (#)
            e.preventDefault();
            // $(".tag").removeClass("new");
            input_field.html(input_field.html() + "</span><span class='tag bold-text-polling new'>#");
            placeCaretAtEnd(this);
            hashtags = true;
        }
        // else if(checkInHasgTag() && !(keyCode >= 48 && keyCode <= 57) && !(keyCode >= 65 && keyCode <= 90)){
        //     e.preventDefault();
        //     input_field.html(input_field.html() + "</span>&nbsp;");

        //     placeCaretAtEnd(this);
        //     hashtags = false;
        // }

   
    });











    // $(document).on('keydown', '#myInputField', function(e) {
        // var input_field = $(this);
        // var x = e.keyCode;

        // // alert(x)


        // // console.log(x)
     
        // if (x == 32) { // space key

       

        //     var sel = document.getSelection();
        //     nd = sel.anchorNode.parentNode.className;
        //     console.log(x)
        //     if (hashtags || String(nd).includes('bold-text-polling') ) {
        //         e.preventDefault();

              

        //         if(hashtags) input_field.html(input_field.html() + "</span>&nbsp;");
        //         else input_field.html(input_field.html() + "</span>");

        //         placeCaretAtEnd(this);
        //         hashtags = false;
        //         // document.getElementsByClassName("new")[0].setAttribute("contenteditable", false);
        //         // document.getElementsByClassName("new")[0].appendChild(closeSpan());
        //     }
        // } 
        
        // if (x == 51) { // hash key (#)
        //     e.preventDefault();

         
        //     // $(".tag").removeClass("new");
        //     input_field.html(input_field.html() + "<span class='tag bold-text-polling new'>#");
        //     placeCaretAtEnd(this);
        //     hashtags = true;
        // }
        // // various punctuation characters
        // // if (x == 8 || x == 9 || x >= 16 && x <= 18 || x == 27 || x == 33 || x == 34 || x >= 36 && x <= 47 || x >= 58 && x <= 64 || x >= 91 && x <= 94 || x == 96 || x >= 123 && x <= 126) {
        // //     if (hashtags) {
        // //         e.preventDefault();
        // //         input_field.html(input_field.html() + "</span>" + String.fromCharCode(x));
        // //         placeCaretAtEnd(this);
        // //         hashtags = false;
        // //         document.getElementsByClassName("new")[0].setAttribute("contenteditable", false);
        // //         document.getElementsByClassName("new")[0].appendChild(closeSpan());
        // //     }
        // // }
        // if (x == 13) { // return key
        //     document.execCommand('defaultParagraphSeparator', false, 'p');
        // }

    // });

    // $(document).on("click", ".delHashtag", function() {
    //     this.parentNode.parentNode.removeChild(this.parentNode);
    //     return false;
    // });
// });