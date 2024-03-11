export const nokitImageConvert = (data) => {
    var listimage = [];
    data.forEach(element => {
      if(element.img){
        listimage.push(String(element.img))
        // text = text + '<div class="url-chapters"><img src="' + element.img + '" loading="lazy" /></div>';
      }else if(element.break){
        // text = text + '<div><br></div>';
      }
    });
    return listimage;
}