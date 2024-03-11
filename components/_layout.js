import React, { useState } from 'react';
import Meta from "./Meta"
import Nav from "./Nav"

import ConfirmBox from '../components/DialogBox/ConfirmBox'
import PreviewBox from '../components/DialogBox/PreviewBox';
import Modal from '../components/Another/Modal'
import CreateLoginModal from '../components/Another/CreateLoginModal'
import CreateRegisterModal from './Another/CreateRegisterModal';
import CreateForgotPass from './Another/CreateForgotPass';


export const LayoutContext = React.createContext();

const Layout = ({children, darkMode}) => {

  const [displayLoginModel, setDisplayLoginModel] = useState(false);
  const [displayRegisterModel, setDisplayRegisterModel] = useState(false);
  const [displayForgotModel, setDisplayForgotModel] = useState(false);

  const [displayPreview, setDisplayPreview] = useState(false);
  const [dataPreview, setDataPreview] = useState({
    data: [],
    addPostBtn: null,
    type:false
  });

  const previewFunc = (data=null, addPostBtn=null, type=false) => {
      if(data == null && addPostBtn == null){
        setDisplayPreview(false);
      }else{
        setDisplayPreview(true);
        setDataPreview({
          data: data,
          addPostBtn: addPostBtn,
          type: type,
        })
      }
    }
  
    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [actionConfirm, setActionConfirm] = useState(null);    
    const conFirmFun = (title=null, content=null, fun=null) => {
      setActionConfirm({
        titleBox: title,
        contentBox: content,
        actionFu: fun,
      })
      if(title === null) setDisplayConfirm(false)
      else setDisplayConfirm(true)
    }

  return (
    <>
        <Meta/>
        <LayoutContext.Provider value={{conFirmFun, setDisplayConfirm, displayLoginModel, setDisplayLoginModel, setDisplayRegisterModel, setDisplayForgotModel, previewFunc}} >
          
          <Nav></Nav>

          <div className="App" dark-mode={Boolean(darkMode) ? "true" : "false"}>
            <div class="content" dark-mode={Boolean(darkMode) ? "true" : "false"}>
              <div class="fr-content">
                  {children}
              </div>

              <ConfirmBox isDisplay={displayConfirm} setIsDisplay={setDisplayConfirm} objAction={actionConfirm}/>
              <PreviewBox displayBox={displayPreview} setDisplayBox={setDisplayPreview} data={dataPreview}></PreviewBox>
              <Modal displayModel={displayLoginModel} setDisplayModel={setDisplayLoginModel} title={'Đăng nhập'} displayfooter={true} body={<CreateLoginModal />}/>
              <Modal displayModel={displayRegisterModel} setDisplayModel={setDisplayRegisterModel} title={'Tạo tài khoảng'} displayfooter={true} body={<CreateRegisterModal />}/>
              <Modal displayModel={displayForgotModel} setDisplayModel={setDisplayForgotModel} title={'Quên mật khẩu'} displayfooter={true} body={<CreateForgotPass />}/>

            </div>
          </div>

          
        </LayoutContext.Provider>
    </>
  )
}

export default Layout