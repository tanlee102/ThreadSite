import validator from "validator";
import { env_variable } from "../env";

export const checkLengthInput = (data, isAlert = true) => {
    let check = true;
    data.forEach(element => {
      if(!validator.isLength(element.content , {min:1, max: env_variable[element.label]}) || !String(element.content.replace(/\s/g,'')).length > 0){
        check = false;
      }
    });
    if(check == false){
      if(isAlert) alert("Thiếu dữ liệu hoặc vượt quá ký tự!")
    }
    return check;
  }