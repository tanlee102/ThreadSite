import { createThread, deleteThread, updatePinThread } from '../data/axios_fetch';
import { nokitConvert } from '../components/Nokit/nokitConvert';
import { checkLengthInput } from './checkLengthInput';

export const addThread = (conFirmFun, subforum_id, tagthread_id, title, typeKit, dataNoKit, next) => {

      let text = '';
      if(typeKit==true){
        text = String(document.getElementById('editable').innerHTML);
      }else{
        text = nokitConvert(dataNoKit);
      }

      var image = '_'
      if(Number(tagthread_id) == 2){
          var m,
          urls = [], 
          rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
          while ( m = rex.exec( text ) ) {
              urls.push( m[1] );
              break;
          }
          if(urls.length > 0) image = urls[0];
      }


      if(image === '_' && Number(tagthread_id) == 2){

        conFirmFun('Thêm bài viết', 'Thêm ảnh vào bài viết!!')
        next(false,{});

      }else{

          let listcheck = [];
          listcheck.push({content: title, label: 'MAX_POST_TITLE_LENGTH'})
          listcheck.push({content: text, label: 'MAX_POST_LENGTH'})
      
          if(checkLengthInput(listcheck, false)){
              conFirmFun('Thêm bài viết', 'Bạn có muốn đăng bài viết?', () => {
                  conFirmFun('Thêm bài viết');
                  setTimeout(() => {
                    createThread({
                      title: title,
                      image: image,
                      tagthread_id: tagthread_id,
                      subforum_id: subforum_id,
                      content: text,
                    } ,(code, result) => {
                      if(code == 1){
                          conFirmFun();
                          next(true,result);
                        }else{
                          alert('Có lỗi khi đăng bài viết!!');
                          next(false,result);
                        }
                    })
                  }, 500)
              });
          }else{
            conFirmFun('Thêm bài viết', 'Thiếu dữ liệu hoặc vượt quá ký tự!')
            next(false,{});
          } 
      }
}


export const removeThread = (conFirmFun, thread_id, next) => {
  conFirmFun('Xóa bài viết', 'Bạn có muốn xóa bài viết?', () => {
    conFirmFun('Xóa bài viết');
    setTimeout(() => {
      deleteThread({
        thread_id: thread_id,
      }, (code, result) => {
        if(code == 1){
          conFirmFun();
          next(true,result);
        }else{
          conFirmFun('Xóa bài viết', 'Đã có lỗi!');
          next(false,{});
        }
      }); 
    }, 500);
  });
}

export const pinThread = (conFirmFun, subforum_id, thread_id, priority, next) => {
  conFirmFun('Pin bài viết', priority > 0 ? 'Bạn có muốn bỏ pin bài viết?' : 'Bạn có muốn pin bài viết?', () => {
    conFirmFun('Pin bài viết');
    setTimeout(() => {
      updatePinThread({
        subforum_id: subforum_id,
        thread_id: thread_id,
        priority: priority,
      }, (code, result) => {
        if(code == 1){
          conFirmFun();
          next(true,result);
        }else{
          conFirmFun('Pin bài viết', 'Đã có lỗi!');
          next(false,{});
        }
      });
    }, 500);
  });
}