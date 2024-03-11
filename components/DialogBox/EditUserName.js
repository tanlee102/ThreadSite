import Cookies from 'js-cookie';
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { checkUserName, updateUserName } from '../../data/axios_fetch';
import { env_variable } from '../../env';
import { hideMainScrollBar } from '../../helper/hideMainScrollBar';

const ConfirmBox = ({isDisplay,setIsDisplay,setUserData, userData}) => {

    const [textIn, setTextIn] = useState('');

    useEffect(() => {
        setTextIn(userData.user_name);
    }, [userData])

    const [checkSame, setCheckSame] = useState(false);

    const handleChange = event => {
        const result = event.target.value.replace(/[^a-z0-9]/gi, '').replace(/\s/g,'').toLowerCase();
        setTextIn(result);
      };
    

    const checkUserNameBtn = () =>{
        checkUserName({
            user_name: textIn,
        },(code, result) => {
          if(code == 1){
            if(result.data == false) {
                setCheckSame(false)
            }else{
                setCheckSame(true)
            }
          }else{
          }
        });
      }


      const updateUserNameBtn = () => {
        if(!checkSame && textIn.length>0)
        setTimeout(() => {
            updateUserName({
                user_name: textIn,
            },(code, result) => {
              if(code == 1){
                let user_package = JSON.parse(Cookies.get('user_package'));
                user_package['user_name'] = textIn;
                Cookies.set('user_package', JSON.stringify(user_package), { expires: 90, domain: env_variable.HOST_COOKIE_NAME, path: '/'});
                setUserData((prevState) => ({
                    ...prevState,
                    user_name: textIn
                }));
                setIsDisplay(false);
                setTextIn('')
              }else{
                alert('Đã xãy ra lỗi hệ thống!!!')
              }
            });            
        }, 400);
     }


  useEffect(() => {
    hideMainScrollBar(isDisplay);
  }, [isDisplay]);

  return (
    <div  class={isDisplay ? "dialog-confirm active-confirm" : "dialog-confirm"}>
  
        <div>
            <div>
                <header> 
                    <h3> Chỉnh sửa tên tài khoảng </h3> 
                    <i class="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
                </header>

                <div class="dialog-msg dialog-user-name"> 

                    <input value={textIn} onChange={handleChange} placeholder='Nhập tên tài khoảng' id='input-dialog-user-name' type="text" maxLength={env_variable.MAX_NAME_USER_LENGTH}
                    onBlur={(e) => checkUserNameBtn()}/>
                    {checkSame ? <span>Tên này đã được sử dụng.</span> : "" }

                </div>
                

                <footer>
                    <div class="controls"> 
                        <button class="button button-danger doAction" onClick={() => {updateUserNameBtn()}}>Vâng</button>  
                         <button class="button button-default cancelAction" onClick={() => setIsDisplay(false)}>Hủy</button> 
                    </div>
                </footer>

            </div>
        </div>

    </div>
  )
}

export default ConfirmBox
