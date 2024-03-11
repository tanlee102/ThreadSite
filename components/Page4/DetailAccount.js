import React, { useState, useEffect, useContext }  from 'react'
import FormData from 'form-data'
import { env_variable, env_Image } from '../../env';
import { checkToken } from '../../data/axios_fetch';
import Cookies from 'js-cookie';
import { env_confirm_log } from '../../env';

import $ from 'jquery'
import { MainContext } from '../_main';

const DetailAccount = ({data, updateDetailUserBtn, conFirmFun}) => {

  const [datax, setDatax] = useState(data); 

  const {setUserData} = useContext(MainContext);

  var obj = {};

  useEffect(() => {
    obj = {...datax};
    obj['birthday'] = String(obj.birthday).split("-");
    if(obj['birthday'].length < 3){
      obj['day'] = "00"; 
      obj['month'] = "00";
      obj['year'] = "0000";
    }else{
      obj['year'] = String(obj['birthday'][0].length == 1 ? "0"+obj['birthday'][0] : obj['birthday'][0]); 
      obj['month'] = String(obj['birthday'][1].length == 1 ? "0"+obj['birthday'][1] : obj['birthday'][1]); 
      obj['day'] = String(obj['birthday'][2]); 
    }
    setDatax(obj);
  }, []);


  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState()

  const clickImageBtn = () => $('#avatar-file-input').trigger('click');
  
  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined);
        return
    }
    setSelectedFile(e.target.files[0])
  }

  useEffect(() => {
    if (!selectedFile) {
        setPreview(datax.avatar)
        return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile]);



  
const updateAccount = () => {

  conFirmFun(env_confirm_log.UPDATEACCOUNT.log, env_confirm_log.UPDATEACCOUNT.ask, () => {
    conFirmFun(env_confirm_log.UPDATEACCOUNT.log)
    setTimeout(() => {
      
      if(selectedFile){
        checkToken(async (accessToken) => {
          let formData = new FormData();
          formData.append('image', selectedFile, selectedFile.name);
          formData.append('token', accessToken);
          let url  = env_variable.URL_HOST_IMAGE

          $.ajax({
            type:'POST',
            url: url,
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){

              updateDetailUserBtn(datax);

              let user_package = JSON.parse(Cookies.get('user_package', { domain: env_variable.HOST_COOKIE_NAME }));
              user_package['avatar'] = String(data);
              Cookies.set('user_package', JSON.stringify(user_package), { expires: 90, domain: env_variable.HOST_COOKIE_NAME, path: '/'});
  
              setUserData((prevState) => ({
                ...prevState,
                avatar: String(user_package['avatar']),
              }));

            },
            error: function(data){
              alert('upload image failed!!');
            }
          });
        })

      }else{
        updateDetailUserBtn(datax);
      }

    }, 700)
  })
}




  return (

    <>

    <div class="form-account">

    <div>
        <span>Họ tên:</span>
        <input value={datax.name}  type="text" maxLength={env_variable.MAX_NAME_MEMBER_LENGTH}
              onChange={e => {
                obj = {...datax};
                obj['name'] = e.target.value;
                setDatax(obj);
              }}
        />
    </div>

    <div>
        <span>Ảnh đại diện:</span>
        <span >
          <img id="icon-btn-image-form-account" onClick={() => clickImageBtn()}  src={env_Image(preview)} alt=""/> 
          <p>click vào ảnh để thay đổi</p>     
        </span>
        <input id="avatar-file-input" className='hide-element' type="file" accept=".jpg, .jpeg, .png" onChange={onSelectFile}/>
    </div>

    <div>

      <span>Ngày sinh:</span>

      <span id="date-input-form-account">
        <input placeholder="Ngày" type="number" min="1" max="31" value={datax['day']}  
              onChange={e => {
                obj = {...datax};
                obj['day'] = e.target.value;
                setDatax(obj);
              }}/>

        <input placeholder="Năm" type="number" min="1" max="12" value={datax['month']} 
              onChange={e => {
                obj = {...datax};
                obj['month'] = e.target.value;
                setDatax(obj);
              }}/>

        <input placeholder="Năm" type="number" min="1940" max="2025" value={datax['year']} 
              onChange={e => {
                obj = {...datax};
                obj['year'] = e.target.value;
                setDatax(obj);
              }}/>

      </span>

    </div>


    <div>
      <span >Bio:</span>
      <input  class="long-text-input-form-account" type="text" value={datax.quote}  maxLength={env_variable.MAX_DEFAULT_USER_LENGTH}
            onChange={e => {
              obj = {...datax};
              obj['quote'] = e.target.value;
              setDatax(obj);
            }}/>
    </div>


    <div>
      <span >Đến từ:</span>
      <input  class="long-text-input-form-account" type="text" value={datax.address} maxLength={env_variable.MAX_DEFAULT_USER_LENGTH}
            onChange={e => {
              obj = {...datax};
              obj['address'] = e.target.value;
              setDatax(obj);
            }}/>
    </div>


    <div>
      <span>Liên hệ:</span>
      <input  class="long-text-input-form-account" type="text" value={datax.contact} maxLength={env_variable.MAX_DEFAULT_USER_LENGTH}
            onChange={e => {
              obj = {...datax};
              obj['contact'] = e.target.value;
              setDatax(obj);
            }}/>
    </div>

    <div class="submit-form-account">
      <span onClick={() => {updateAccount()}}><i class="fa-solid fa-floppy-disk"></i> &nbsp;Lưu thay đổi</span>
    </div>


  
  </div>


  </>
  )
}

export default DetailAccount



          // axios.post(url, formData, {
          //   headers: {
          //     'Content-Type': 'multipart/form-data'
          //   }})   
          //   .then(response => {
          //       let user_package = JSON.parse(Cookies.get('user_package', { domain: env_variable.HOST_COOKIE_NAME }));
          //       user_package['avatar'] = String(response.data);

          //       Cookies.set('user_package', JSON.stringify(user_package), { expires: 90, domain: env_variable.HOST_COOKIE_NAME, path: '/'});
          //       updateDetailUserBtn(datax)

          //       setUserData((prevState) => ({
          //         ...prevState,
          //         avatar: String(user_package['avatar']),
          //       }));
          //   })
          // .catch(e => {
          //   console.log(e);
          // })
