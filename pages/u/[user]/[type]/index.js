import  React, { useState, useEffect, useContext }  from 'react';
import  { useRouter } from 'next/router';
import qs from 'querystring';

import { followMember, saveSubForum, checkToken} from '../../../../data/axios_fetch'
import { loadHeadInfo, loadFollower, loadFollowed, loadPostTimeline, loadPostLiked, loadMemberSubForum, loadToken, loadMemberLatestPoll} from '../../../../data/fetch'

import { LayoutContext } from '../../../../components/_layout';
import { MainContext } from '../../../../components/_main';
import Meta from '../../../../components/Meta';
import Breadcrumb from '../../../../components/Another/Breadcrumb';
import LoadMore from '../../../../components/Another/LoadMore';

import FollowingSection from '../../../../components/Page5/FollowingSection';
import PostSection from '../../../../components/Page5/PostSection';
import ProfileHead from '../../../../components/Page5/ProfileHead';
import ProfileMenu from '../../../../components/Page5/ProfileMenu';
import ProfileSubMenu from '../../../../components/Page5/ProfileSubMenu';
import ListSubForum from '../../../../components/Page1/ListSubForum';
import PollItems from '../../../../components/Poll/PollItems';
import { env_variable } from '../../../../env';


const Member = ({datas, headinfo, id_wall, is_block}) => {

    const rangeMember = env_variable.RANGEMEMBER;
    const subforum_per_page = env_variable.RANGESUBFORUM;
    const rangePostLine = env_variable.RANGEPOSTLINE;
    const rangePoll = env_variable.RANGEPOLL;

    const {conFirmFun, setDisplayLoginModel}  = useContext(LayoutContext); 
    const {darkMode , userData}  = useContext(MainContext); 
    
    const breadcrumb = [{label: 'Trang cá nhân', link: '/u/'+userData.user_name}];

    const router = useRouter();

    const [loadState, setLoadState] = useState(false);
    const [page, setPage] = useState(0);


    var type = router.query.type;
    if(type === 'posts') type = 2;
    if(type === 'forums') type = 3;
    if(type === 'follow') type = 4;
    if(type === 'polls') type = 5;

    var user = router.query.user;

    const [datasFollower, setDatasFollower] = useState((type === 4) ? datas : []);
    const [datasPost, setDatasPost] = useState((type === 2) ? datas : []);
    const [datasSubForum, setDatasSubForum] = useState((type === 3) ? datas : []);
    const [datasPoll, setDatasPoll] = useState((type === 5) ? datas : []);


    var sorting_setting = router.query.sorting_setting;

    if(sorting_setting){}else{
      if(type === 4) sorting_setting = 'follower'
      if(type === 2) sorting_setting = 'posted'
    }

    var listMenu = [];

    if(type === 4) listMenu = [
      {
        param: 'follower',
        label: 'Theo dõi',
      },
      {
        param: 'followed',
        label: 'Đang theo dõi'
      },
    ]
    if(type === 2) listMenu = [
      {
        param: 'posted',
        label: 'Đã đăng',
      },
      {
        param: 'liked',
        label: 'Đã thích',
      },
    ]

    var urlMenu = '';
    if(type === 4) urlMenu = '/u/'+user+'/follow?sorting_setting=';
    else if(type === 2) urlMenu = '/u/'+user+'/posts?sorting_setting=';

    var objtemp = listMenu.find(x => x.param === sorting_setting);
    const [choseMenu, setChoseMenu] = useState(listMenu.indexOf(objtemp));





    const followListMemberBtn = (isfollowed,member_id,index) =>{
      followMember({
        member_id: member_id,
        isfollowed: !isfollowed
      },(code, result) => {
        if(code == 1){

          let newArr = [...datasFollower]; 
          newArr[index].exfo = !isfollowed;
          setDatasFollower(newArr);

        }else{
          alert('Đã xảy ra lỗi hệ thống!!');
  
        }
      });
    }

    const loadListFollowBtn = async () => {
      checkToken(async (accessToken) => {
        let datas = [];
        if(sorting_setting === 'followed'){
          datas = await loadFollowed(id_wall, page+1, accessToken);
        }else{
          datas = await loadFollower(id_wall, page+1, accessToken);
        }
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
      });
    }
    
    const loadListPostTimelineBtn = async () => {
      checkToken(async (accessToken) => {
        let datas = [];
        if(sorting_setting === 'liked'){
          datas = await loadPostLiked(id_wall, page+1, accessToken);
        }else{
          datas = await loadPostTimeline(id_wall, page+1);
        }
        setTimeout(() => {

          setDatasPost([...datasPost, ...datas]);
          setPage(page+1);
          setLoadState(false);
            if(datas.length >= rangePostLine) setLoadState(false);
            else setLoadState(-1);
          
        },400);
      });
    }

    const loadMemberSubForumBtn = async () => {
      checkToken(async (accessToken) => {
        if(datasSubForum.length>0){
          let data = await loadMemberSubForum(id_wall , datasSubForum[datasSubForum.length-1].ID, accessToken);
          setTimeout(() => {
            if(data.length > 0){
              setDatasSubForum([...datasSubForum, ...data]);
              if(subforum_per_page > data.length) setLoadState(-1);
              else setLoadState(false);
            }else{
              setLoadState(-1);
            }
          },400);
        }else{
          setLoadState(-1);
        }
      })
    }

    const loadMemberPollBtn = async () => {
    
      if(datasPoll.length>0){
        let data = await loadMemberLatestPoll(page+1, id_wall);
        setTimeout(() => {
          if(data.length > 0){
            setPage(page+1);
            setDatasPoll([...datasPoll, ...data]);
            if(rangePoll > data.length) setLoadState(-1);
            else setLoadState(false);
          }else{
            setLoadState(-1);
          }
        },400);
      }else{
        setLoadState(-1);
      }
    
  }

    const saveSubForumBtn = (index,ID_SubForum,issaved) => {
      if(userData.id != "_" && userData.id)
      saveSubForum({
        member_id: userData.id,
        subforum_id: ID_SubForum,
        is_save: issaved
      },(code, result) => {
     
        if(code == 1){
          let newArr = [...datasSubForum];
          newArr[index]['Is_save'] = !issaved;
          setDatasSubForum(newArr);
        }else{
          alert('Đã xảy ra lỗi hệ thống!!')
        }
      });
      else setDisplayLoginModel(true);
    }

  return (
    <>

    <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

    <div class="fr-member"  dark-mode={darkMode ? "true" : "false"}>

        <div class="fr-member_">

            <ProfileHead conFirmFun={conFirmFun} headinfo={headinfo} userData={userData} id_wall={id_wall}/>

            { !is_block ? 
            <div class="body-member">
                <ProfileMenu type={type}/>
                { (type === 2) ? <ProfileSubMenu listMenu={listMenu} urlMenu={urlMenu} choseMenu={choseMenu}  setChoseMenu={setChoseMenu} /> : ""}
                { (type === 4) ? <ProfileSubMenu listMenu={listMenu} urlMenu={urlMenu} choseMenu={choseMenu}  setChoseMenu={setChoseMenu} /> : ""}
                <div class="content-body-member">
                  {(type === 2) ? <PostSection darkMode={darkMode}  data={datasPost}/> : ""}
                  {(type === 3) ? <ListSubForum 
                              data={datasSubForum} 
                              darkMode={darkMode} 
                              saveSubForumBtn={saveSubForumBtn} 
                              userData={userData} />
                  : ""}
                  {(type === 5) ? <PollItems data={datasPoll} darkMode={darkMode}></PollItems> : ""}
                  {(type === 4) ? <FollowingSection darkMode={darkMode}  data={datasFollower} followListMemberBtn={followListMemberBtn} userData={userData}/> : ""}
                </div>
            </div>

            : 

            <div className='fr-block-banner'>
              <span>Bạn đã bị người dùng này chặn!</span>
            </div>
            }
      
        </div>

        { !is_block ? 
        <>
        {(type === 2) && rangePostLine <= datasPost.length ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadListPostTimelineBtn}/> : ""}
        {(type === 4  && datasFollower.length >= rangeMember) ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadListFollowBtn}/> : ""}
        {(type === 3) && subforum_per_page <= datasSubForum.length ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadMemberSubForumBtn}/> : ""}
        {(type === 5) && rangePoll <= datasPoll.length ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadMemberPollBtn}/> : ""}
        </> : "" }
        
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
  let id_wall = '';
  let sorting_setting = '';

  let is_block = false;
  let privacy = {};
  let is_followed = false;
  let user_id = cookies.user_package ? JSON.parse(cookies.user_package).id : -1;

  if(cookies.refresh_token || context.params.user) {

      id_wall = cookies.user_id;
      if(context.params.user) id_wall = context.params.user;

      sorting_setting = '';
      if(context.query.sorting_setting) sorting_setting = context.query.sorting_setting;

      headinfo = await loadHeadInfo( id_wall , accessToken);

      privacy = headinfo[2][0];

      id_wall = headinfo[4].member_id;
    

      if(headinfo[3].length > 0) is_followed = true;
      if(headinfo[1].length > 0) is_block = true; 

      headinfo = headinfo[0][0];
      if (headinfo === undefined || headinfo === null) {headinfo = {name: '___'}}

      if(!is_block)
      if(context.params.type === 'posts'){

        if(sorting_setting === 'liked'){
          if(((privacy.post_liked == 0) ||  (privacy.post_liked == 1 && is_followed == true)) ||   user_id === Number(id_wall) )  datas =  await loadPostLiked(id_wall,0, accessToken); 
        }else datas = await loadPostTimeline(id_wall,0);

      }else if(context.params.type == 'forums'){

        datas = await loadMemberSubForum(id_wall, -1, accessToken);

      }else if(context.params.type == 'follow'){
        
        if(sorting_setting === 'followed'){
          if(((privacy.member_following == 0) ||  (privacy.member_following == 1 && is_followed == true)) ||  user_id === Number(id_wall)) datas = await loadFollowed(id_wall, 0, accessToken);
        }else datas = await loadFollower(id_wall, 0, accessToken);

      }else if(context.params.type == 'polls'){

        datas = await loadMemberLatestPoll(0, id_wall);

      }
  }

  return {
    props: {
      datas, headinfo, id_wall, dark_mode, is_block
     }
  }

}

export default Member