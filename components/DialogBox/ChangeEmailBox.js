import Cookies from 'js-cookie';
import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { env_variable } from '../../env';
import { hideMainScrollBar } from '../../helper/hideMainScrollBar';
import { LayoutContext } from '../_layout';
import { changeEmailAccount } from '../../callapi/account';

const ChangeEmailBox = ({isDisplay,setIsDisplay,setUserData, setIsVerified, userData}) => {

    const {conFirmFun} = useContext(LayoutContext);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const onEmailChange = (e) => {
        setEmail(String(e.target.value))
          let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if ( re.test(String(e.target.value)) || String(e.target.value) === '') {
            setIsValidEmail(true)
          }else {
            setIsValidEmail(false)
          }
    }


    const changeEmailBtn = () => {
        if(String(email).trim() === String(userData.email).trim()){
            conFirmFun('Thay đổi Email', 'Email yêu cầu trùng với Email hiện tại!');
        }else{
            if(isValidEmail == true)
            if(email !== '' && password !== ''){
                conFirmFun("Thay đổi Email");
                changeEmailAccount(conFirmFun, email, password, (success, result) => {
                  if(success) {
                    conFirmFun('Thay đổi Email', 'Thành công!')
    
                    let user_package = JSON.parse(Cookies.get('user_package'));
                    user_package['email'] = email;
                    Cookies.set('user_package', JSON.stringify(user_package), { expires: 90, domain: env_variable.HOST_COOKIE_NAME, path: '/'});
                    setUserData((prevState) => ({
                        ...prevState,
                        email: email
                    }));
                    setIsDisplay(false);
                    setEmail('')
                    setPassword('')
                    setIsVerified(false)
    
                  }else{
          
                  }
                });
            }else{
              conFirmFun('Thay đổi Email', 'Vui lòng điền đầy đủ thông tin!')  
            }
        }

    }

    useEffect(() => {
        hideMainScrollBar(isDisplay);
    }, [isDisplay]);

  return (
    <div  class={isDisplay ? "dialog-confirm active-confirm" : "dialog-confirm"}>
  
        <div>
            <div>
                <header> 
                    <h3> Thay đổi Email </h3> 
                    <i class="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
                </header>

                <div class="dialog-msg dialog-user-name"> 

                    <input value={email} onChange={(e) => onEmailChange(e)}  placeholder='Nhập email mới' id='input-dialog-user-name' type="text" maxLength="50"/>
                    {!isValidEmail ? <span style={{marginTop: '5px'}} >Email không hợp lệ.</span> : "" }
                    <input value={password} onChange={(e) => setPassword(String(e.target.value).replace(/\s/g, ''))}  style={{marginTop: '10px'}} placeholder='Nhập mật khẩu' id='input-dialog-user-name' type="password" maxLength="70"/>

                </div>
                

                <footer>
                    <div class="controls"> 
                        <button class="button button-danger doAction" onClick={() => {changeEmailBtn()}}>Vâng</button>  
                         <button class="button button-default cancelAction" onClick={() => setIsDisplay(false)}>Hủy</button> 
                    </div>
                </footer>

            </div>
        </div>

    </div>
  )
}

export default ChangeEmailBox