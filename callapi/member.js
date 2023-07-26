import { env_confirm_log } from '../env';
import { addBlockMember, removeBlockMember } from '../data/axios_fetch';


export const blockMember = (conFirmFun, isBlock, member_id, next) => {
    if(isBlock){
        conFirmFun("Thành viên", "Bạn có muốn bỏ chặn thành viên này?", () => {
          conFirmFun("Thành viên");
          setTimeout(() => {
              removeBlockMember({
                  member_id: member_id,
              },(code, result) => {
                  if(code == 1){
                      conFirmFun();
                      next(true,result);
                  }else{
                      conFirmFun("Thành viên", 'Đã xảy ra lỗi hệ thống!!');
                  }
              })
          },200)
        });
      }else{
        conFirmFun("Thành viên", "Bạn có muốn chặn thành viên này?", () => {
          conFirmFun("Thành viên");
          setTimeout(() => {
              addBlockMember({
                  member_id: member_id,
              },(code, result) => {
                  if(code == 1){
                      conFirmFun();
                      next(true,result);
                  }else{
                      conFirmFun("Thành viên", 'Đã xảy ra lỗi hệ thống!!');
                  }
              })
          },200)
        });
      }
}