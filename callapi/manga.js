import { env_confirm_log } from '../env';
import { insertManga } from '../data/axios_fetch';


export const addManga = (conFirmFun, title, introduce, urlimage, author, next) => {

    conFirmFun(env_confirm_log.MANGA.add, env_confirm_log.MANGA.ask_add, () => {
        conFirmFun(env_confirm_log.MANGA.add)
        setTimeout(() => {
            insertManga({
              title: title,
              intro: introduce,
              url_image: urlimage,
              author: author
            }, (code, result) => {
              if(code == 1){
                conFirmFun(env_confirm_log.MANGA.add, env_confirm_log.MANGA.suc_add)
                next(true, result)
              }else{
                next(false)
                alert('Đã xảy ra lỗi hệ thống!!');
              }
            })
      },500);
    })

}