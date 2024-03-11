import React, { useState, useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import qs from 'querystring';

import { createReMsg, createMsg, loadReMsg, followMember, checkToken, deleteReMsg, deleteMsg} from '../../../data/axios_fetch';
import { loadFirstMsgs,loadHeadInfo, loadToken} from '../../../data/fetch';

import { LayoutContext } from '../../../components/_layout';
import { MainContext } from '../../../components/_main';
import Meta from '../../../components/Meta';
import Breadcrumb from '../../../components/Another/Breadcrumb';
import LoadMore from '../../../components/Another/LoadMore';

import CommentSection from '../../../components/Page5/CommentSection';
import ProfileHead from '../../../components/Page5/ProfileHead';
import ProfileMenu from '../../../components/Page5/ProfileMenu';
import useStateRef from 'react-usestateref';

import { env_variable } from '../../../env';


const Member = ({datas, headinfo, allowed, is_block, member_id}) => {




    const rangeMsgs = env_variable.RANGEMSGS;

    const {conFirmFun, setDisplayLoginModel}  = useContext(LayoutContext);
    const {darkMode , userData}  = useContext(MainContext);

    const breadcrumb = [{label: 'Trang cá nhân', link: '/u/'+userData.user_name}];

    const [loadState, setLoadState] = useState(false);
    const [page, setPage] = useState(0);

    const [textComment, setTextComment] = useState("");

    // const [addtime, setAddtime] = useState(0);

    const convertCommentDatas = (datas) => {
      for(let i = 0; i < datas.length; i++){
        if(datas[i].replydata)
          if(datas[i].replydata[0]) datas[i].curLoadID = datas[i].replydata[0].ID_;
          else datas[i].curLoadID = 0;
      }
      return datas;
    }

    const [datasComment, setDatasComment, getDatasComment] = useStateRef(convertCommentDatas(datas));
    const [loading, setLoading, getLoading] = useStateRef(false);


    const addMsgBtn = () => {
      let text = String(textComment);
      if(getLoading.current === false)
      if(text.replaceAll(/\s/g,'').length > 0){
        setLoading(true);

        setTextComment("")
        
        let newArr = [...datasComment];
        let result = {};
        result['avatar'] = userData.avatar;
        result['name'] = '···';
        result['user_name'] = userData.user_name;
        result['text'] = text;
        result['time'] = new Date();
        result['replydata'] = [];
        newArr.unshift(result);
        setDatasComment(newArr);
  
        setTimeout(() => {
          createMsg({
            member_id: member_id,
            text: text,
          } , (code, result) => {
            if(code == 1){

              let newArr = [...getDatasComment.current]; 
              newArr.shift();
              result.data['avatar'] = userData.avatar;
              result.data['name'] = userData.name;
              result.data['user_name'] = userData.user_name;
              result.data['replydata'] = [];
              newArr.unshift(result.data);
              setDatasComment(newArr);
              setLoading(false);
  
            }else{
              alert(result);
              setLoading(false);
            }

          })        
        }, 1000);

      }
    }


    const addReMsgBtn = (ID, index) => {

      if(userData.logged){
        let text = String(document.getElementById('re-comment-input').value);

        if(getLoading.current === false)
        if(text.replaceAll(/\s/g,'').length > 0){
            setLoading(true);

            document.getElementById('re-comment-input').value = '';
            document.getElementById('re-comment-input').textContent = '';

            let newArr = [...datasComment]; 
            let result = {};
            result['avatar'] = userData.avatar;
            result['name'] = '···';
            result['user_name'] = userData.user_name;
            result['text'] = text;
            result['time'] = new Date();
            newArr[index].replydata.push(result);
            setDatasComment(newArr);

            setTimeout(() => {
              createReMsg({
                member_id: member_id,
                id: ID,
                text: text,
              } ,(code, result) => {
                if(code == 1){

                  let newArr = [...getDatasComment.current]; 
                  newArr[index].replydata.splice(-1);
                  result.data['avatar'] = userData.avatar;
                  result.data['name'] = userData.name;
                  result.data['user_name'] = userData.user_name;
                  newArr[index].replydata.push(result.data);
                  setDatasComment(newArr);
                  setLoading(false);
                  // newArr[index].addtime = newArr[index].addtime + 1;

                }else{

                  setLoading(false);
                  alert(result);
                }
              })
            }, 1000);
        }
      }else{
        setDisplayLoginModel(true);
      }

    }


    const deleteReMsgBtn = (ID, ID_, index, index_) => {
      conFirmFun("Bình luận", "Bạn có muốn xóa bình luận?", () => {
        conFirmFun("Bình luận");
        setTimeout(() => {
          deleteReMsg({
            id: ID,
            id_: ID_,
          } ,(code, result) => {
            if(code == 1){
              let newArr = [...datasComment];
              newArr[index].replydata.splice(index_, 1);
              setDatasComment(newArr);
            }else{
              alert(result);
            }
            conFirmFun();
          })
        }, 400);
      });
    }


    const deleteMsgBtn = (ID, index) => {
      conFirmFun("Bình luận", "Bạn có muốn xóa bình luận?", () => {
        conFirmFun("Bình luận");
        setTimeout(() => {
          deleteMsg({
            id: ID,
          } ,(code, result) => {
  
            if(code == 1){
              let newArr = [...datasComment];
              newArr.splice(index, 1);
              setDatasComment(newArr);
            }else{
              alert(result);
            }
            conFirmFun();
            
          });
        }, 400);
      });
    }


    const loadReMsgsBtn = (ID, curLoadID, index) => {
      loadReMsg({
        id: ID,
        curLoadID: curLoadID,
      }, (code, result) => {
        if(code == 1){
          if(result.data.arr.length > 0){
            let newArr = [...datasComment];
            newArr[index].replydata = (result.data.arr).concat(newArr[index].replydata);
            newArr[index].isMore = result.data.isMore;
            newArr[index].curLoadID = result.data.arr[0].ID_;
            setDatasComment(newArr);
          }
        }else{
          alert(result);
        }
      })
    }


    const loadMsgsBtn = async () => {
      let datas = await loadFirstMsgs(member_id, datasComment[datasComment.length - 1].ID);
      setTimeout(() => {
          
          setDatasComment([...datasComment,...convertCommentDatas(datas)]);   
          setPage(page+1);

          if(datas.length < rangeMsgs) setLoadState(-1);
          else setLoadState(false);

      }, 400);
    }


  return (
    <>
    <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

    <div class="fr-member" dark-mode={darkMode ? "true" : "false"}>

        <div class="fr-member_">

            <ProfileHead conFirmFun={conFirmFun} headinfo={headinfo} userData={userData} id_wall={member_id}/>

            { !is_block ? 
              <div class="body-member">
                <ProfileMenu type={1}/>
                <div class="content-body-member">
                    <CommentSection textComment={textComment} 
                                    setTextComment={setTextComment} 
                                    deleteMsgBtn={deleteMsgBtn} 
                                    deleteReMsgBtn={deleteReMsgBtn} 
                                    addReMsgBtn={addReMsgBtn}  
                                    addMsgBtn={addMsgBtn} 
                                    loadReMsgsBtn={loadReMsgsBtn} 
                                    allowed={allowed} 
                                    userData={userData} 
                                    datas={datasComment} 
                                    isYourProfile={member_id == userData.id}/>
                </div>
              </div>
              : 
              <div className='fr-block-banner'>
                <span>Bạn đã bị người dùng này chặn!</span>
              </div>
            }
      
        </div>

        { !is_block && datasComment.length >= rangeMsgs ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadMsgsBtn}/> : "" }
        
    </div>

    <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>
    
    </>
  )
}


export async function getServerSideProps(context) {

  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

  let accessToken = cookies.access_token;
  if(!accessToken) accessToken = context.res.getHeaders().access_token;


  let datas = [];
  let headinfo = {};
  let user_name = '';
  

  let is_block = false;
  let privacy = {};
  let is_followed = false;
  let allowed = false;
  let member_id = -1;
  let user_id = cookies.user_package ? JSON.parse(cookies.user_package).id : -1;


  if(cookies.refresh_token || context.params.user) {

      user_name = user_id;
      if(context.query.user) user_name = context.query.user;

      let sorting_setting = '';
      if(context.query.sorting_setting) sorting_setting = context.query.sorting_setting;


      headinfo = await loadHeadInfo( user_name , accessToken);

      privacy = headinfo[2][0];

      if(headinfo[1].length > 0) is_block = true;
      if(headinfo[3].length > 0) is_followed = true;
      member_id = headinfo[4].member_id

      headinfo = headinfo[0][0];
      if (headinfo === undefined || headinfo === null) {headinfo = {name: '___'}}

      if(!is_block) datas = await loadFirstMsgs(member_id,0);

      if(((privacy?.send_message == 0) ||  (privacy?.send_message == 1 && is_followed == true)) ||  String(user_id) === String(member_id) ) allowed = true;

  }

  return {
    props: {
        datas, headinfo, member_id, allowed, dark_mode, is_block
     }
  }

}

export default Member