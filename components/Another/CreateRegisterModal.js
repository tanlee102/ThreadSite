import React, { useContext, useRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { LayoutContext } from '../_layout';
import { addAccount, verifyMail } from '../../callapi/account';

import Cookies from 'js-cookie';
import { env_variable } from '../../env';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CreateRegisterModal = () => {

    const router = useRouter();
    const recaptchaRef = useRef();
    const {conFirmFun, setDisplayLoginModel, setDisplayRegisterModel}  = useContext(LayoutContext);

    const [load, setLoad] = useState(false);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [isMatchPass, setIsMatchPass] = useState(true)
    const [isCorrectPass, setIsCorrectPass] = useState(true)

    const [reCaptcha, setReCaptcha] = useState(null);

    function onChangeReCaptcha(value) {
        setReCaptcha(value);
    }

    const onChangeRePassword = (e) => {
      let str = String(e.target.value).replace(/\s/g, '');
      setRePassword(str)
      if(str === password || str === '' ||  password === ''){
        setIsMatchPass(true)
      }else{
        setIsMatchPass(false)
      }
    }

    const onChangePassword = (e) => {
      let str = String(e.target.value).replace(/\s/g, '');
      setPassword(str)
      if(str === repassword || str === '' ||  repassword === ''){
        setIsMatchPass(true)
      }else{
        setIsMatchPass(false)
      }
      if(str.length < 8 && str.length != 0){
        setIsCorrectPass(false);
      }else{
        setIsCorrectPass(true);
      }
    }

    const onEmailChange = (e) => {
      setEmail(String(e.target.value).toLowerCase())
        let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if ( re.test(String(e.target.value)) || String(e.target.value) === '') {
          setIsValidEmail(true)
        }else {
          setIsValidEmail(false)
        }
    }


    const createAccountBtn = () => {
      if(load == false)
      if(name.trim() !== '' && email !== '' && password !== '' && repassword !== ''){
        if(password === repassword && isCorrectPass == true && isValidEmail == true  && String(name.trim()).length >= 2){
          setLoad(true);    
          addAccount(conFirmFun, reCaptcha, name, email, password, (success, result) => {
            if(success) {
              verifyMail(conFirmFun, email, (success, result_) => {

                Cookies.set('user_package', result.data.user_package, { expires: 90, domain: env_variable.HOST_COOKIE_NAME, path: '/'});
                Cookies.set('refresh_token', result.data.refresh_token, { expires: 90, domain: env_variable.HOST_COOKIE_NAME, path: '/'});

                setTimeout(function() {
                  window.location.replace('/verify?type=new');
                }, 450);

              });
            }else{
              recaptchaRef.current.reset();
              setReCaptcha(null);
              setLoad(false); 
            }
          });
        }
      }else{
        conFirmFun('Tạo tài khoản', 'Vui lòng điền đầy đủ thông tin!')  
      }
    }
      
  return (
    <div className="contain-login">

      <div className="content-login">
          <div>
              <input style={{marginBottom: (name.length == 0 || String(name.trim()).length >= 2) ? '10px' : '5px'}} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nhập họ và tên"/>
              <span style={{color: "tomato",display: (name.length == 0 || String(name.trim()).length >= 2) ? "none" : "block"}} className="info-text-login">Tên phải ít nhất 2 ký tự.</span>

              <input style={{marginBottom: isValidEmail ? '10px' : '5px'}}  value={email} onChange={(e) => onEmailChange(e)} type="email" placeholder="Nhập email"/>
              <span style={{color: "tomato",display: isValidEmail ? "none" : "block"}} className="info-text-login">Email không hợp lệ.</span>
              
              <input style={{ marginBottom: isCorrectPass ? '10px' : '5px'}} value={password} onChange={(e) => onChangePassword(e)} type="password" placeholder="Nhập mật khẩu"/>
              <span style={{color: "tomato",display: isCorrectPass ? "none" : "block"}} className="info-text-login">Mật khẩu phải ít nhất 8 ký tự.</span>
              <input style={{ marginBottom: isMatchPass ? '10px' : '5px'}}  value={repassword} onChange={(e) => onChangeRePassword(e)} type="password" placeholder="Nhập lại mật khẩu"/>
              <span style={{color: "tomato",display: isMatchPass ? "none" : "block"}} className="info-text-login">Không khớp mật khẩu.</span>

              <div className='contain-recaptcha'>
              <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LcccwsoAAAAAF8e0OJQy8ym93hBPETHnGTD6ai1"
                    onChange={onChangeReCaptcha}
                />
              </div>

              <span className="btn-login" onClick={() => createAccountBtn()}>
                {!load ? <p>Tạo tài khoản</p> : <div class="loader-circle-small"><div></div></div> }
              </span>

              {router.pathname === '/signup' ?
                <Link href={"/login"}><span className="btn-text-login">Đăng nhập?</span></Link>
                :
                <span className="btn-text-login" onClick={() => {if(!load){ setDisplayRegisterModel(false); setDisplayLoginModel(true)}}} >Đăng nhập?</span>
              }

          </div>

      </div>

   </div>
  )
}

export default CreateRegisterModal
