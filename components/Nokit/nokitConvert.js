export const nokitConvert = (data, is_article=true) => {
    var text = '';

    var regex = new RegExp('<br>', 'g');
    var regex1 = new RegExp('&nbsp;', 'g');
    var count = 0;
    data.forEach(element => {
      if(element.text){
        if(String(document.getElementsByClassName('text-notkit').item(count).innerHTML) !== ''){
          let sty = "";
          if(element.isBold) sty = sty + "font-weight:bold; ";
          if(element.isCenter) sty = sty + "text-align:center;";
          text = text + '<div style="'+sty+'">'+String(document.getElementsByClassName('text-notkit').item(count).innerHTML).replace(regex, '').replace(regex1, '')+'</div>'
        }
        count = count + 1;
      }else if(element.img){
        if(is_article)
          text = text + '<div><img class="image-nakit image-nokit" loading="lazy" src="' + element.img + '" /></div>';
        else 
          text = text + '<a target="_blank" href="' + element.img + '"><div><img class="image-nakit image-nokit" src="' + element.img + '" loading="lazy" /></div></a>';
      }else if(element.break){
        text = text + '<div><br></div>';
      }else if(element.embed){
        text = text + '<div class="embed-nokit">'+element.embed+'</div>';
      }else if(element.video){
        text = text + '<div class="nokit-video"><video controls >   <source src="'+element.video+'" type="video/mp4">  Your browser does not support the video tag.</video></div>';
      }
    });

    return text;
}