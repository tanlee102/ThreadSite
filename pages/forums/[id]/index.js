import React, { useState, useEffect, useContext } from 'react';
import Router, { useRouter } from 'next/router'

import { loadThreadHead, loadThreadOther } from '../../../data/fetch'
import { saveSubForum, checkToken} from '../../../data/axios_fetch'
import { removeSubForum, modernizeSubForum } from '../../../callapi/subforum';

import { AppContext } from '../../_app';
import { LayoutContext } from '../../../components/_layout';
import { MainContext } from '../../../components/_main';
import Meta from '../../../components/Meta';
import Breadcrumb from '../../../components/Another/Breadcrumb';

import Modal from '../../../components/Another/Modal';
import CreateModalForm from '../../../components/Another/CreateModalForm';
import ButtonModalUpdate from '../../../components/Page1/ButtonModalUpdate';

import LoadMore from '../../../components/Another/LoadMore';
import HeadGroup from '../../../components/Another/HeadGroup';
import ProfileSubMenu from '../../../components/Page5/ProfileSubMenu';
import GroupInfoThread from '../../../components/Page2/GroupInfoThread';
import GroupThread from '../../../components/Page2/GroupThread';
import { pinThread, removeThread } from '../../../callapi/thread';
import { env_variable } from '../../../env';


const Forums = ({threadOthers, threadHead}) => {


  const thread_per_page = env_variable.RANGETHREAD;

  const breadcrumb = [{label: threadHead.CategoryName, link: "/category/"+threadHead.Category_ID}];

  const {darkMode, userData}  = useContext(MainContext); 
  const {conFirmFun, setDisplayLoginModel}  = useContext(LayoutContext); 
  const {removeRetainComponent}  = useContext(AppContext); 

  const [loadState, setLoadState] = useState(false);
  const [page, setPage] = useState(0);

  const router = useRouter();
  var id = router.query.id;
  
  var sorting_setting = router.query.sorting_setting;
  if(!sorting_setting) sorting_setting = 'chronological'
  
  var listMenu = [
    {
      param: 'chronological',
      label: 'Bài viết mới',
    },
    {
      param: 'recent_activity',
      label: 'Hoạt động mới'
    },
    {
      param: 'total_post',
      label: 'Số bài viết'
    }
  ]
  var urlProfileMenu = '/forums/'+id+'?sorting_setting=';
  var objtemp = listMenu.find(x => x.param === sorting_setting);

  const [choseMenu, setChoseMenu] = useState(listMenu.indexOf(objtemp));

  const [data0, setData0] = useState(threadOthers[1]);
  const [data1, setData1] = useState(threadOthers[0]);


  const loadThreadOtherBtn = async () => {
    if(data1.length>0){
      checkToken(async (accessToken) => {
        let datas = await loadThreadOther(sorting_setting, id, data1[data1.length-1].Thread_ID ,page+1, accessToken);
        setTimeout(() => {
          if(datas[1].length > 0){
            setData1([...data1, ...datas[1]])
            if(datas[1].length >= thread_per_page){
              setPage(page+1);
              setLoadState(false);
            }else{
              setLoadState(-1);
            }
          }else{
            setLoadState(-1);
          }
        },400);
      });
    }else{
      setLoadState(-1);
    }
  }

  const updatePinBtn = (priority, id_thread) => {
    pinThread(conFirmFun, id, id_thread, priority, (success) => {
        if(removeRetainComponent(router.asPath)){
          Router.push(window.location.pathname);
        }
    })
  }

  const deleteThreadBtn = (id_thread) => {
    removeThread(conFirmFun, id_thread, (success) => {
      if(success){
        if(sorting_setting === 'chronological'){
          setData0(data0.filter(item => item.Thread_ID !== id_thread));
          setData1(data1.filter(item => item.Thread_ID !== id_thread));
        }else Router.push(window.location.pathname);
      }
    });
  }

  useEffect(() => {
    setData0(threadOthers[1]);
    setData1(threadOthers[0]);
  },[threadOthers])




  const [displayModel, setDisplayModel] = useState(false);

  const labelState1 = [{label: 'Nhập tên Nhóm'}, {label: 'Giới thiệu', tag: 'textarea'}];
  const initialState1 = {
    subforum: threadHead.title,
    intro: threadHead.introduce,
  };

  const [formState1, setFormState1] = useState(initialState1);
  const [saved, setSaved] = useState(Number(threadHead.time_save)!==0 ? true : false);

  const setUpdateSubForum = () =>{
    modernizeSubForum(conFirmFun, formState1.subforum, formState1.intro ,id, (success) => {
      if(success){
      }
    })
  }

  const setDeleteSubForum = () =>{
    removeSubForum(conFirmFun ,id , (success) => {
      if(success){
        Router.push("/");
      }
    })
  }

  const saveSubForumBtn = () => {
    setSaved(!saved)
    if(userData.id != "_" && userData.id)
    saveSubForum({
      member_id: Number(userData.id),
      subforum_id: Number(id),
      is_save: saved
    },(code, result) => {
      if(code == 1){
      }else{
        setSaved(!saved)
        alert('Đã xảy ra lỗi hệ thống!!');
      }
    })
    else setDisplayLoginModel(true)
  }
  
  const moveToAddPost = () => {
    if(userData.logged){
      router.push("/forums/"+id+"/addpost")
    }else{
      setDisplayLoginModel(true);
    }
  }

  return (
    <>
    <div>
      <Meta title={threadHead.title + " | " +env_variable.LABEL_TAB_BAR}>
        <meta name="description" content={threadHead.CategoryName + " " + threadHead.title + " " + ( data1[0] ? data1[0]?.title : "")}/>
        <meta name="keywords" content={threadHead.CategoryName + "," + threadHead.title + "," + ( data1[0] ? data1[0]?.title : "")}/>

        <meta property="og:title" content={threadHead.title}/>
        <meta property="og:image" content={env_variable.SHORT_ICON_BAR}/>
        <meta property="og:description" content={threadHead.CategoryName + " " + threadHead.title + " " + ( data1[0] ? data1[0]?.title : "")}/>
      </Meta>

      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>
      <HeadGroup link={true} title={threadHead.title} button={'Thêm bài viết'} darkMode={darkMode} actButton={moveToAddPost}/>

      <ProfileSubMenu listMenu={listMenu} urlMenu={urlProfileMenu} choseMenu={choseMenu}  setChoseMenu={setChoseMenu} />

      <span className='open-btn-info-thread'>
          <span onClick={() => setDisplayModel(true)}>
            { userData.admin || userData.id == Number(threadHead.Owner_ID) ? 
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"><path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path></svg>
            :
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 490.667 490.667"><path d="M245.333,0C110.059,0,0,110.059,0,245.333s110.059,245.333,245.333,245.333s245.333-110.059,245.333-245.333  S380.608,0,245.333,0z M245.333,85.333c29.397,0,53.333,23.936,53.333,53.333S274.731,192,245.333,192S192,168.064,192,138.667  S215.936,85.333,245.333,85.333z M309.333,405.333H202.667c-17.643,0-32-14.357-32-32c0-17.643,14.357-32,32-32h10.667v-64  h-10.667c-17.643,0-32-14.357-32-32s14.357-32,32-32H288c5.888,0,10.667,4.779,10.667,10.667v117.333h10.667  c17.643,0,32,14.357,32,32C341.333,390.976,326.976,405.333,309.333,405.333z"/></svg>
            }
          </span>
          <span className={saved ? 'chose-pin-block-tab-item' : ""} onClick={() => saveSubForumBtn()}><svg xmlns="http://www.w3.org/2000/svg"  class="bi bi-diamond-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"></path></svg></span>
      </span>


      <div class="cluster-hub" dark-mode={darkMode ? "true" : "false"}>

          {(sorting_setting === 'chronological' && data0?.length > 0) ? 
            <div class="pin-cluster-group">
                <GroupThread data={data0} userData={userData} is_owner={userData.id == Number(threadHead.Owner_ID)} updatePinBtn={updatePinBtn} deleteThreadBtn={deleteThreadBtn}/>
            </div> 
          : ""}

          <div class="others-cluster-group">
              <GroupThread data={data1} userData={userData} is_owner={userData.id == Number(threadHead.Owner_ID)} updatePinBtn={updatePinBtn} deleteThreadBtn={deleteThreadBtn}/>
          </div>

      </div>

      {sorting_setting !== 'recent_activity' && thread_per_page <= data1?.length ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadThreadOtherBtn}/> : ""}

      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

    </div>


    <Modal 
        displayModel={displayModel} 
        setDisplayModel={setDisplayModel} 
        title={'Thông tin'}
        displayfooter={true}

        body={userData.admin || userData.id == Number(threadHead.Owner_ID) ? 
        <CreateModalForm 
          formState={formState1}
          labelState={labelState1}
          setFormState={setFormState1}
          />
        : 
        <GroupInfoThread content={threadHead} />}
        footer={ userData.admin || userData.id == Number(threadHead.Owner_ID) ? 
          <ButtonModalUpdate 
            updateBtn={setUpdateSubForum}
            deleteBtn={setDeleteSubForum}
          /> 
        : ""
        }
    />

    </>
  )
}


export async function getServerSideProps(context) {

  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

  let accessToken = cookies.access_token;
  if(!accessToken) accessToken = context.res.getHeaders().access_token;

  let sorting_setting = '-';
  if(context.query.sorting_setting) sorting_setting = context.query.sorting_setting;

  const threadOthers = await loadThreadOther(sorting_setting, context.params.id, -1, 0, accessToken);

  const threadHead = await loadThreadHead(context.params.id, accessToken)

  return {
    props: {
      threadOthers, threadHead, dark_mode
     }
  }
}

export default Forums