import { env_confirm_log } from '../env';
import { insertChapter } from '../data/axios_fetch';
import { nokitImageConvert } from '../components/Nokit/nokitImageConvert';


export const addChapter = (conFirmFun, title, content, number_chap, manga_id, next) => {

    conFirmFun(env_confirm_log.CHAPTER.add, env_confirm_log.CHAPTER.ask_add, () => {
        conFirmFun(env_confirm_log.CHAPTER.add)
        setTimeout(() => {
            insertChapter({
              title: title,
              content: nokitImageConvert(content),
              number_chap: number_chap,
              manga_id: manga_id
            }, (code, result) => {
              if(code == 1){
                conFirmFun(env_confirm_log.CHAPTER.add, env_confirm_log.CHAPTER.suc_add)
                next(true, result)
              }else{
                next(false)
                alert('Đã xảy ra lỗi hệ thống!!');
              }
            })
      },500);
    })

}
