import { env_confirm_log } from '../env'
import { insertTagThread } from '../data/axios_fetch'

export const addTagThread = (conFirmFun, title, colorpanel_id, next) => {
    conFirmFun(env_confirm_log.TAG.add,env_confirm_log.TAG.ask_add, () => {
        conFirmFun(env_confirm_log.TAG.add)
        setTimeout(() => {
            insertTagThread({
              title: title,
              colorpanel_id: colorpanel_id,
            }, (code, result) => {
              if(code == 1){
                conFirmFun(env_confirm_log.TAG.add, env_confirm_log.TAG.suc_add)
                next(true)
              }else{
                next(false)
                alert(result);
              }
            })
        },500)
    });

}