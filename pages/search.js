import  { useState, useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import qs from 'querystring';
import Meta from '../components/Meta';

import Breadcrumb from '../components/Another/Breadcrumb';

import { loadListSearchThread, loadListSearchMember, loadListSearchSubForum, loadListSearchPoll } from '../data/fetch';
import { removeThread } from '../callapi/thread';

import { saveSubForum } from '../data/axios_fetch';
import { checkToken } from '../data/axios_fetch';

import ProfileSubMenu from '../components/Page5/ProfileSubMenu';
import GroupThread from '../components/Page2/GroupThread';
import LoadMore from '../components/Another/LoadMore';
import FollowingSection from '../components/Page5/FollowingSection';
import ListSubForum from '../components/Page1/ListSubForum';
import PollItems from '../components/Poll/PollItems';

import { MainContext } from '../components/_main';
import { LayoutContext } from '../components/_layout';
import { env_variable } from '../env';


const Search = ({listthread, listmember, listsubforum, listpoll}) => {

  const rangeMember = env_variable.RANGEMEMBER;
  const rangeThread = env_variable.RANGETHREAD;
  const rangeSubForum = env_variable.RANGESUBFORUM;
  const rangePoll = env_variable.RANGEPOLL;

  const breadcrumb = [{label: 'Tìm kiếm', link: "/"}];

  const {darkMode, userData}  = useContext(MainContext); 
  const {conFirmFun}  = useContext(LayoutContext); 

  const router = useRouter(); 
  var sorting_setting = router.query.sorting_setting; 

  var text = '';  
  text = router.query.text; 

  if(sorting_setting){}else{  
    sorting_setting = 'post'; 
  }

  var listMenu = [
    {
      param: 'post',
      label: 'Bài viết',
    },
    {
      param: 'member',
      label: 'Thành viên',
    },
    {
      param: 'subforum',
      label: 'Nhóm'
    },
    {
      param: 'poll',
      label: 'Bình chọn'
    }
  ]
  
  var urlProfileMenu = '/search?'+(text.length> 0 ? 'text='+text : "")+'&sorting_setting=';
  var objtemp = listMenu.find(x => x.param === sorting_setting);

  const [choseMenu, setChoseMenu] = useState(listMenu.indexOf(objtemp));

  const [loadState, setLoadState] = useState(false);
  const [page, setPage] = useState(0);

  const [listThread, setListThread] = useState(listthread);
  const [listMember, setListMember] = useState(listmember);
  const [listSubForum, setListSubForum] = useState(listsubforum);
  const [listPoll, setListPoll] = useState(listpoll);


  const loadListThreadBtn = async () => {
    checkToken(async (access_token) => {
      let datas = [];
      datas = await loadListSearchThread(text, page+1, access_token);
      setTimeout(() => { 
        if(datas.length > 0){ 
          setListThread([...listThread, ...datas]);
          setPage(page+1);
          if(datas.length < rangeThread) setLoadState(-1);
          else setLoadState(false);
        }else{
          setLoadState(-1);
        }
      }, 400);
    });
  }

  const loadListMemberBtn = async () => {
    checkToken(async (access_token) => {
      let datas = [];
      datas = await loadListSearchMember(text, page+1, access_token);
      setTimeout(() => { 
        if(datas.length > 0){
          setListMember([...listMember, ...datas]);
          setPage(page+1);
          setLoadState(false);
          if(datas.length < rangeMember) setLoadState(-1);
          else setLoadState(false);
        }else{
          setLoadState(-1);
        }
      }, 400);
    });
  }

  const loadListSubForumBtn = async () => {
    checkToken(async (access_token) => {
      let datas = [];
      datas = await loadListSearchSubForum(text, page+1, access_token);
      setTimeout(() => { 
        setListSubForum([...listSubForum, ...datas]);
        setPage(page+1);
        if(datas.length < rangeSubForum) setLoadState(-1);
        else setLoadState(false);
      }, 400);
    })
  }

  const loadListPollBtn = async () => {
    checkToken(async (access_token) => {
      let datas = [];
      datas = await loadListSearchPoll(text, page+1, access_token);
      setTimeout(() => { 
        setListPoll([...listPoll, ...datas]);
        setPage(page+1);
        if(datas.length < rangePoll) setLoadState(-1);
        else setLoadState(false);
      }, 400);
    })
  }

  const deleteThreadBtn = (id_thread) => {
    removeThread(conFirmFun, id_thread, (success) => {
      if(success){
        setListThread(listThread.filter(item => item.Thread_ID !== id_thread));
      }
    });
  }

  const saveSubForumBtn = (index,ID_SubForum,issaved) => {
    if(userData.id != "_" && userData.id)
    saveSubForum({
      member_id: userData.id,
      subforum_id: ID_SubForum,
      is_save: issaved,
    },(code, result) => {
      if(code == 1){
        let newArr = [...listSubForum];
        newArr[index]['Is_save'] = !issaved;
        setListSubForum(newArr);
      }else{
        alert('Đã xảy ra lỗi hệ thống!!');
      }
    });
    else alert('Bạn phải đăng nhập!!');
  }

  useEffect(() => {
    document.getElementById('search-bar').value = text;
  },[]);


  return (
    <>
    <Meta title={"Tìm kiếm | " + env_variable.LABEL_TAB_BAR}></Meta>
    <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

    <div className='search-text-label'>
      Kết quả của: {text}
    </div>

    <ProfileSubMenu listMenu={listMenu} urlMenu={urlProfileMenu} choseMenu={choseMenu}  setChoseMenu={setChoseMenu} />


    {sorting_setting === 'post' ?
      <>
      <div class="cluster-hub" dark-mode={darkMode ? "true" : "false"}>
          <div class="others-cluster-group">
              <GroupThread data={listThread} userData={userData} deleteThreadBtn={deleteThreadBtn}/>
          </div>
      </div>
      { rangeThread <= listThread.length  ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadListThreadBtn}/> : "" }
      </>
    :  ""}

    {sorting_setting === 'member' ?
      <>
      <div class="content-body-member">
          <FollowingSection data={listMember} userData={userData}/>
      </div> 
      { listMember.length >= rangeMember ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadListMemberBtn}/> : ""}
      </>
      : ""
    }

    {sorting_setting === 'subforum' ?
      <>
      <div>
          <ListSubForum 
            data={listSubForum} 
            darkMode={darkMode} 
            saveSubForumBtn={saveSubForumBtn} 
            userData={userData} />
      </div> 
      { listSubForum.length >= rangeSubForum ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadListSubForumBtn}/> : ""}
      </>
      : ""
      }


      {sorting_setting === 'poll' ?
        <>
          <div className='contain-list-item-poll' dark-mode={darkMode ? "true" : "false"}>
              <PollItems data={listPoll} darkMode={darkMode}/>
          </div>
          { rangePoll <= listPoll.length  ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadListPollBtn}/> : "" }
        </>
        :  ""
      }


      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>
    </>
  )
}


export async function getServerSideProps(context) {

  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

  let accessToken = cookies.access_token;
  if(!accessToken) accessToken = context.res.getHeaders().access_token;

  let sorting_setting = ''; 
  if(context.query.sorting_setting) sorting_setting = context.query.sorting_setting; 

  let text = '';
  if(context.query.text) text = context.query.text;

  let listthread = [];
  let listmember = [];
  let listsubforum = [];
  let listpoll = [];

  if(sorting_setting === 'member') 
    listmember = await loadListSearchMember(text, 0, accessToken);
  else if(sorting_setting === 'subforum')
    listsubforum = await loadListSearchSubForum(text, 0, accessToken);
  else if(sorting_setting === 'poll')
    listpoll = await loadListSearchPoll(text, 0, accessToken);
  else
    listthread = await loadListSearchThread(text, 0, accessToken);

  return {
    props: {
      listthread, listmember, listsubforum, listpoll, dark_mode
    }
  }
}

export default Search