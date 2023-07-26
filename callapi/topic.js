import { env_confirm_log } from '../env'
import { insertTopic } from '../data/axios_fetch'

export const addTopic = (conFirmFun, title, next) => {
    conFirmFun(env_confirm_log.TOPIC.add, env_confirm_log.TOPIC.ask_add, () => {
        conFirmFun(env_confirm_log.TOPIC.add)
        setTimeout(() => {
            insertTopic({
              title: title,
            }, (code, result) => {
              if(code == 1){
                conFirmFun(env_confirm_log.TOPIC.add, env_confirm_log.TOPIC.suc_add)
                next(true);
              }else{
                next(false);
                alert(result);
              }
            });
        },500);
    })
}