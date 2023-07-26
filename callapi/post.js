import { env_confirm_log, env_variable } from '../env';
import { createPost, deletePost, deleteThread } from '../data/axios_fetch';
import { nokitConvert } from '../components/Nokit/nokitConvert';
import { checkLengthInput } from './checkLengthInput';

export const addPost = (conFirmFun, thread_id, reply_id, type, data, name_user_reply, next) => {

        let text = '';
        if(type==true){
          text = String(document.getElementById('editable').innerHTML);
        }else{
          text = nokitConvert(data, false)
        }

        let listcheck = [{content: text, label: 'MAX_POST_LENGTH'}];

        if(checkLengthInput(listcheck, false)){
            conFirmFun('Thêm bài viết', 'Bạn có muốn thêm bài viết?', () => {
                conFirmFun('Thêm bài viết');
                setTimeout(() => {
                  createPost({
                    thread_id: thread_id,
                    reply_id: reply_id,
                    content: text,
                    name_user_reply: name_user_reply,
                  } ,(code, result) => {
                    if(code == 1){
                      conFirmFun();
                      next(true,result);
                    }else{
                      alert('Có lỗi khi thêm bài viết!!');
                      next(false,result);
                    }
                  })
                },500)
            });

        }else{
          conFirmFun('Thêm bài viết', 'Thiếu dữ liệu hoặc vượt quá ký tự!')
          next(false,{});
        }
}

export const removePost = (conFirmFun, ID_Post, ID_Thread, index, next) => {
  conFirmFun('Xóa bài viết', 'Bạn có muốn xóa bài viết?', () => {
    conFirmFun('Xóa bài viết');
    setTimeout(() => {
      if(index == 1){
        deleteThread({
          thread_id: ID_Thread,
        } , (code, result) => {
          if(code == 1){
            conFirmFun();
            next(true,result);
          }else{
            alert('Có lỗi khi xóa bài viết!!');
            next(false,result);
          }
        });
      }else{
          deletePost({
            thread_id: ID_Thread,
            post_id: ID_Post
          }, (code, result) => {
            if(code == 1){
              conFirmFun();
              next(true,result);
            }else{
              alert('Có lỗi khi xóa bài viết!!');
              next(false,result);
            }
          })
      }
    }, 500);
  })
}