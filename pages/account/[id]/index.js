import React, { useState, useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Cookies from 'js-cookie';

import {loadDetailUser, loadFollowed, loadAllLogged, loadNotification, loadPrivacy, loadBlocked, checkVerified} from '../../../data/fetch';
import {updateDetailUser, followMember, deleteLogged, checkToken} from '../../../data/axios_fetch';

import Breadcrumb from '../../../components/Another/Breadcrumb';
import Meta from '../../../components/Meta';
import LoadMore from '../../../components/Another/LoadMore';

import MenuAccount from '../../../components/Page4/MenuAccount';
import DetailAccount from '../../../components/Page4/DetailAccount';
import NotificationAccount from '../../../components/Page4/NotificationAccount';
import PrivacyAccount from '../../../components/Page4/PrivacyAccount';
import LoggedAccount from '../../../components/Page4/LoggedAccount';
import SecureAccount from '../../../components/Page4/SecureAccount';
import FollowingSection from '../../../components/Page5/FollowingSection';

import { env_confirm_log, env_variable } from '../../../env';
import { LayoutContext } from '../../../components/_layout';
import { MainContext } from '../../../components/_main';
import { blockMember } from '../../../callapi/member';


const Account = ({deviceType, loaddetail, loadprivacy, loadfollowed, loadblocked, loadalllogged, loadnotification, checkverified}) => {

  const rangeMember = env_variable.RANGEMEMBER;
  const rangeNotification = env_variable.RANGENOTIFICATION;

  const breadcrumb = [{label: 'Tài khoản', link: "/account/detail"}];

  const { darkMode, userData }  = useContext(MainContext);
  const { conFirmFun } = useContext(LayoutContext);
  const router = useRouter();
  var id = String(router.query.id);

  const listMenuAccount = [
    {label:'Trang cá nhân', url: '/u/'+userData.user_name},
    {label:'Chi tiết tài khoảng', url: '/account/detail'},
    {label:'Bảo mật', url: '/account/secure'},
    {label:'Riêng tư', url: '/account/privacy'},
    {label:'Lịch sử đăng nhập', url: '/account/logged'},
    {label:'Đang theo dõi', url: '/account/followed'},
    {label:'Thông báo', url: '/account/notification'},
    {label:'Đã chặn', url: '/account/blocked'},
  ]

  useEffect(() => {
    if(!Cookies.get('refresh_token')){
      Router.push('/');
    }
  }, []);

  const [datasLogged, setDatasLogged] = useState(id==="logged" ? loadalllogged : []);
  const [datasFollower, setDatasFollower] = useState(id==="followed" ? loadfollowed : []);
  const [datasNotification, setDatasNotification] = useState(id==="notification" ? loadnotification : []);
  const [datasBlocked, setDataBlocked] = useState(id==="blocked" ? loadblocked : []);

  const [loadState, setLoadState] = useState(false);
  const [page, setPage] = useState(0);

  
  const updateDetailUserBtn = (params) => {
      params['user_id'] = userData.id;
      let curTi = params['month']; if((curTi+'').length == 1) params['month'] = "0" + curTi;
      curTi = params['day']; if((curTi+'').length == 1) params['day'] = "0" + curTi;
      params['birthday'] = params['year'] + "-" + params['month'] + "-" + params['day'];
      updateDetailUser(params, (code, result) => {
        if(code == 1){
          conFirmFun(env_confirm_log.UPDATEACCOUNT.log, env_confirm_log.UPDATEACCOUNT.suc)
        }else{
          alert(result);
        }
      })
  }

  const deleteLoggedBtn = (time,device,index) =>{
    conFirmFun(env_confirm_log.LOGOUT.log, env_confirm_log.LOGOUT.ask_another, () => {
      conFirmFun(env_confirm_log.LOGOUT.log)
      setTimeout(() => {
        deleteLogged({
          time: time,
          device: device
        },(code, result) => {
          if(code == 1){
            setDatasLogged(prevActions => (
              prevActions.filter((value, i) => i !== index)
            ));
            conFirmFun(env_confirm_log.LOGOUT.log, env_confirm_log.LOGOUT.suc);
          }else{
            conFirmFun(env_confirm_log.LOGOUT.log, env_confirm_log.ERRLOG.system);
            alert(result);;
          }
        })
      }, 500)
      }
    )
  }

  const loadListFollowBtn = async () => {
    checkToken(async (accessToken) => {
      let datas = await loadFollowed(userData.id, page+1, accessToken );
      setTimeout(() => {
        if(datas.length > 0){
            setDatasFollower([...datasFollower, ...datas]);
            setPage(page+1);
            if(datas.length < rangeMember) setLoadState(-1);
            else setLoadState(false);
        }else{
            setLoadState(-1);
        }
      }, 400);
    })
  }

  const followListMemberBtn = (isfollowed,member_id,index) =>{
    followMember({
      member_id: member_id,
      isfollowed: !isfollowed
    },(code, result) => {
      if(code == 1){
        let newArr = [...datasFollower]; 
        newArr[index].exfo = !isfollowed;
        setDatasFollower(newArr)
      }else{
        alert('Đã xảy ra lỗi hệ thống!!')
        alert(result);
      }
    });
  }

  const loadListNotificationBtn = async () => {
    checkToken(async (accessToken) => {
      let datas = await loadNotification(page+1, accessToken );
      setTimeout(() => {
        setDatasNotification([...datasNotification, ...datas])
        setPage(page+1);
        if(datas.length < rangeNotification) setLoadState(-1);
        else setLoadState(false);
      }, 400);
    });
  }

  const loadListBlockBtn = async () => {
    checkToken(async (accessToken) => {
      let datas = await loadBlocked(page+1, accessToken);
      setTimeout(() => {
        if(datas.length > 0){
            setDataBlocked([...datasBlocked, ...datas]);
            setPage(page+1);
            if(datas.length < rangeMember) setLoadState(-1);
            else setLoadState(false);
        }else{
            setLoadState(-1);
        }
      }, 400);
    });
  }

  const blockListMemberBtn = (isBlock, member_id, index) =>{
    blockMember(conFirmFun, isBlock, member_id, (success) => {
      if(success){
        let newArr = [...datasBlocked];
        newArr[index].exfo = !isBlock;
        setDataBlocked(newArr);
        conFirmFun();
      }
    });
  }

  return (
    <div>
      <Meta title={"Tài khoản | " + env_variable.LABEL_TAB_BAR}></Meta>
      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

      <div class="fr-account" dark-mode={darkMode ? "true" : "false"}>
        
        <MenuAccount conFirmFun={conFirmFun} listMenuAccount={listMenuAccount} idItem={id} deviceType={deviceType}/>
        
        <div class="setting-account">

          {id==="detail" ? <DetailAccount conFirmFun={conFirmFun} data={loaddetail} updateDetailUserBtn={updateDetailUserBtn}/> : ""}
          {id==="secure" ? <SecureAccount checkverified={checkverified}/> : ""}
          {id==="privacy" ? <PrivacyAccount data={loadprivacy} /> : ""}
          {id==="logged" ? <LoggedAccount darkMode={darkMode} data={datasLogged} deleteLoggedBtn={deleteLoggedBtn}/> : ""}
          {id==="followed" ? <FollowingSection data={datasFollower}  darkMode={darkMode} userData={userData} followListMemberBtn={followListMemberBtn}/> : ""}
          {id==="notification" ? <NotificationAccount darkMode={darkMode} data={datasNotification}/> : ""}
          {id==="blocked" && datasBlocked.length > 0 ? <FollowingSection data={datasBlocked}  darkMode={darkMode} userData={userData} followListMemberBtn={blockListMemberBtn} isBlock={true}/> : ""}

          {id==="followed" && datasFollower.length >= rangeMember ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadListFollowBtn}/> : "" }
          {id==="notification" && datasNotification.length >= rangeNotification ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadListNotificationBtn}/> : "" }
          {id==="blocked" && datasBlocked.length >= rangeMember  ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadListBlockBtn}/> : "" }
        
        </div>    
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {

  const UA = context.req.headers['user-agent'];
  const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))

  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

  let accessToken = cookies.access_token;
  if(!accessToken) accessToken = context.res.getHeaders().access_token; 

  let loaddetail = {};
  let loadprivacy = {};
  let loadfollowed = [];
  let loadalllogged = [];
  let loadnotification = [];
  let loadblocked = [];
  let checkverified = {};


  if(cookies.refresh_token) {

    loaddetail = context.params.id === "detail" ? await loadDetailUser(accessToken) : {};

    loadprivacy = context.params.id === "privacy" ? await loadPrivacy(accessToken) : {};

    loadalllogged = context.params.id === "logged" ? await loadAllLogged(cookies.refresh_token, accessToken) : [];

    loadfollowed = context.params.id === "followed" ? await loadFollowed(JSON.parse(cookies.user_package).id, 0, accessToken) : [];
    
    loadnotification = context.params.id === "notification" ? await loadNotification(0, accessToken) : [];

    loadblocked = context.params.id === "blocked" ? await loadBlocked(0, accessToken) : [];

    checkverified = context.params.id === "secure" ? await checkVerified(accessToken) : {};
    
  }

  return {
    props: {
      deviceType: isMobile, loaddetail, loadprivacy, loadfollowed, loadalllogged, loadblocked, loadnotification, checkverified, dark_mode
    }
  }
}

export default Account