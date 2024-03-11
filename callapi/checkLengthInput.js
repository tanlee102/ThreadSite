import { env_variable } from "../env";

const checkLengthInput_ = (data, min, max) => {
  const content_length = String(data).length;
  return content_length >= Number(min) && content_length <= Number(max);
};

export const checkLengthInput = (data, isAlert = true) => {
    let check = true;
    data.forEach(element => {
      if(!checkLengthInput_(element.content , 1, env_variable[element.label]) || !String(element.content.replace(/\s/g,'')).length > 0){
        check = false;
      }
    });
    if(check == false){
      if(isAlert) alert("Thiếu dữ liệu hoặc vượt quá ký tự!")
    }
    return check;
  }