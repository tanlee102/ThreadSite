import React, { useContext, useState } from 'react'
import Meta from '../../components/Meta'
import AddPollItemBox from '../../components/DialogBox/AddPollItem';
import { insertPoll } from '../../data/axios_fetch';
import Router from 'next/router';
import { env_variable } from '../../env';
import Breadcrumb from '../../components/Another/Breadcrumb';
import { MainContext } from '../../components/_main';

const Add = () => {

  const breadcrumb = [{label: "Bình chọn", link: "/polls"}];
  const {darkMode}  = useContext(MainContext);

  const [inputUrl, setInputUrl] = useState('');
  const [inputLabel, setInputLabel] = useState('');

  const [keyx, setKey] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);

  const [data, setData] = useState([
            // {key:1, label: "Bleach 320", url:""}, 
      ])

  function findHashtags(searchText) {
    var regexp = /\B\#\w\w+\b/g
    var result = searchText.match(regexp);
    if (result) {
        return (result.map(item => item.replace('#','')));
    } else {
        return [];
    }
  }

  const addPolling = () => { 
    let datatags = findHashtags(String(document.getElementById('input-hashtag-field').innerHTML).replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' '));
    let title = String(document.getElementById('input-hashtag-field').innerHTML).replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').replace(/#\S+/g, '').replace(/\s+/g, ' ');
    if(datatags.length <= 10){
      if(title.length <= 250 && title.length > 0){
        if(data.length >= 2){
            insertPoll({
              title: title,
              items: data,
              tags: datatags,
            } ,(code, result) => {
              if(code == 1){
                  setData([]);
                  document.getElementById('input-hashtag-field').innerHTML = "";
                  Router.push("/polling/"+String(result.data.poll_id));
                }else{
                  alert('Đã xảy ra lỗi!!');
                }
            })
        }else{
          alert('Ít nhất 2 mục!!');
        }
      }else{
        alert("Tiêu đề không được trống và chỉ được tối đa 250 ký tự!")
      }
    }else{
      alert("Chỉ được tối đa 10 hashtag!")
    }
  }

  return (
    <>
      <Meta title={"Thêm bình chọn | " + env_variable.LABEL_TAB_BAR}>
        <script src="/Hashtag.js" defer></script>
      </Meta>

      <Breadcrumb darkMode={darkMode} datas={breadcrumb} />

      <div className='contain-add-polling' dark-mode={String(darkMode)}>

            <div className='add-polling'>
                <div id="input-hashtag-field" contentEditable='true' placeholder="Nhập tiêu đề và hashtag..." className='input-title-polling'></div>

                <div className='polling-bars' dark-mode={String(darkMode)}>
                  {data.map((ite, index) => ( 
                              <div key={ite.key} onClick={() => {setIsDisplay(true), setIsUpdating(true), setInputLabel(ite.label), setInputUrl(ite.url), setKey(ite.key)}} className='item-polling'>
                                  <div  className='filled-bar'></div>
                                  <div>
                                    { ite.url !== "" ? <span><img src={ ite.url }></img></span> : <span style={{width: '0px', margin: '0px 5px 0 0 '}}></span> }
                                  <span style={{width: ite.url !== "" ? 'calc(100% - 95px)' : 'calc(100% - 50px)'}}><p>{ ite.label }</p></span>
                                  <span>...</span>
                                  </div>
                              </div>
                  ))}
                </div>

                <div className='btn-add-poll-item'>
                    <span id='btn-add-poll-item' onClick={() => { data.length < 100 ? (setIsDisplay(true), setIsUpdating(false), setInputLabel(""), setInputUrl(""), setKey(Number(data.length))) : alert("Tối đa 100 mục!")}}> 
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"/>
                      </svg>
                      <span>Thêm bình chọn</span>
                    </span>
                </div>

            </div>

            <span className='btn-add-polling' onClick={() => {addPolling()}}> Đăng </span>

      </div>

      <AddPollItemBox data={data}
                      setData={setData} 
                      isUpdating={isUpdating} 
                      setIsUpdating={setIsUpdating}  
                      keyx={keyx}  
                      setKey={setKey} 
                      isDisplay={isDisplay} 
                      setIsDisplay={setIsDisplay}
                      inputUrl={inputUrl}
                      setInputUrl={setInputUrl}
                      inputLabel={inputLabel}
                      setInputLabel={setInputLabel}
                      >
                      </AddPollItemBox>
    </>
  )
}

export async function getServerSideProps(context) {

  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;

  return {
    props: {
       dark_mode
     }
  }
}


export default Add
