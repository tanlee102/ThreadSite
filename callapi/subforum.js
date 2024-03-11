import { env_confirm_log } from '../env'
import { insertSubForum, updateSubForum, deleteSubForum } from '../data/axios_fetch'
import { checkLengthInput } from './checkLengthInput';



export const addSubForum = (conFirmFun, title, category_id, introduce, next) => {
    let listcheck = [];
    listcheck.push({content: title, label: 'MAX_SUBFORUM_NAME_LENGTH'})
    listcheck.push({content: introduce, label: 'MAX_SUBFORUM_INTRODUCE_LENGTH'})

    if(checkLengthInput(listcheck))
    conFirmFun(env_confirm_log.SUBFORUM.add, env_confirm_log.SUBFORUM.ask_add, () => {
        conFirmFun(env_confirm_log.SUBFORUM.add)
        setTimeout(() => {
            insertSubForum({
              title: title,
              category_id: category_id,
              introduce: introduce,
            }, (code, result) => {
              if(code == 1){
                conFirmFun(env_confirm_log.SUBFORUM.add, env_confirm_log.SUBFORUM.suc_add)
                next(true, result)
              }else{
                next(false)
                alert('Đã xảy ra lỗi hệ thống!!');
              }
            })
      },500);
    })

}


export const modernizeSubForum = (conFirmFun, title, introduce, subforum_id, next) => {
  let listcheck = [];
  listcheck.push({content: title, label: 'MAX_SUBFORUM_NAME_LENGTH'})
  listcheck.push({content: introduce, label: 'MAX_SUBFORUM_INTRODUCE_LENGTH'})

  if(checkLengthInput(listcheck))
    conFirmFun(env_confirm_log.SUBFORUM.update, env_confirm_log.SUBFORUM.ask_update, () => {
        conFirmFun(env_confirm_log.SUBFORUM.update)
        setTimeout(() => {
            updateSubForum({
              title: title,
              introduce: introduce,
              subforum_id: subforum_id,
            }, (code, result) => {
              if(code == 1){
                conFirmFun(env_confirm_log.SUBFORUM.update, env_confirm_log.SUBFORUM.suc_update)
                next(true)
              }else{
                next(false)
                alert('Đã xảy ra lỗi hệ thống!!');
              }
            })
        },500)
    })
}

export const removeSubForum = (conFirmFun, subforum_id, next) => {
    conFirmFun(env_confirm_log.SUBFORUM.delete, env_confirm_log.SUBFORUM.ask_delete, () => {
        conFirmFun(env_confirm_log.SUBFORUM.delete)
        setTimeout(() => {
            deleteSubForum({
              subforum_id: subforum_id,
            }, (code, result) => {
              if(code == 1){
                conFirmFun(env_confirm_log.SUBFORUM.delete, env_confirm_log.SUBFORUM.suc_delete)
                next(true)
              }else{
                next(false)
                alert('Đã xảy ra lỗi hệ thống!!');
              }
            })
        
        },500)
    })
}