import  { useState, useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';

import MenuAccount from '../../../components/Page4/MenuAccount';
import ProfileSubMenu from '../../../components/Page5/ProfileSubMenu';
import Breadcrumb from '../../../components/Another/Breadcrumb';

import { loadNewPost, loadNewMember, loadWordsByBlock } from '../../../data/fetch';
import { checkToken } from '../../../data/axios_fetch';

import Meta from '../../../components/Meta';
import LoadMore from '../../../components/Another/LoadMore';
import Sheet_ from '../../../components/Page3/Sheet_';
import MemberSection from '../../../components/Page7/MemberSection';
import SettingSection from '../../../components/Page7/SettingSection';
import { LayoutContext } from '../../../components/_layout';
import { MainContext } from '../../../components/_main';
import { env_variable } from '../../../env';
import { removePost } from '../../../callapi/post';


const Account = ({deviceType, loadlistpost, loadlistmember, loadwordsbyblock}) => {

  const rangeMember = env_variable.RANGEMEMBER; 

  const breadcrumb = [{label: 'Quản trị', link: '/manage/1'}]; 
  const {conFirmFun}  = useContext(LayoutContext); 
  const {darkMode, userData}  = useContext(MainContext); 

  const router = useRouter(); 
  var id = router.query.id; 

  const converData = (datas) => {
    if(datas.length > 0){ 
      const pkx = datas[0]; 
      const pky = datas[2]; 
        for(let i = 0; i < pkx.length; i++){
          pkx[i].content = datas[1][i]?.content; 
          if(pkx[i].ID != pkx[i].RePost_ID){
            pkx[i].expSheet = true; 
            pkx[i].replyName =  datas[1][i]?.name_user_reply;  
            let element = pky.find(o => o.id_post === pkx[i].RePost_ID);   
            if(element){
              pkx[i].replyId = element?.id_post; 
              pkx[i].reply = element?.content; 
            }
          }
        }
      return pkx;
    }else{
      return [];  
    }
  }

  const [loadState, setLoadState] = useState(false);  
  const [page, setPage] = useState(0);  


  const [listpost, setListPost] = useState(converData(loadlistpost));
  const [curLoadID, setCurLoadID] = useState(0);

  const [listmember, setListMember] = useState(loadlistmember);

  const listMenuAccount = [
    {label:'Nhật ký hoạt động', url: '/manage/0'},
    {label:'Bài viết', url: '/manage/1'},
    {label:'Thành viên', url: '/manage/2'},
    {label:'Cài đặt', url: '/manage/3'},
    {label:'Thống kê', url: '/manage/4'},
    {label:'Traffic', url: '/manage/5'},
    {label:'Backup', url: '/manage/6'},
  ]

  var init_search = '';
  if(router.query.search) init_search = router.query.search;
  const [search, setSearch] = useState(init_search);

  var sorting_setting = router.query.sorting_setting;
  if(!sorting_setting){
    if(id == 1) sorting_setting = 'posted';
    if(id == 2) sorting_setting = 'latest';
  }

  var listMenu = [];

  if(id == 1) listMenu = [
    {
      param: 'posted',
      label: 'Mới đăng',
    },
    {
      param: 'reported',
      label: 'Báo cáo',
    },
  ]

  if(id == 2) listMenu = [
    {
      param: 'latest',
      label: 'Mới tham gia',
    },
    {
      param: 'banned',
      label: 'Bị cấm',
    },
  ]

  var urlMenu = '';
  if(id == 1) urlMenu = '/manage/1?'+(search.length> 0 ? 'search='+search : "")+'&sorting_setting=';
  if(id == 2) urlMenu = '/manage/2?'+(search.length> 0 ? 'search='+search : "")+'&sorting_setting=';

  var objtemp = listMenu.find(x => x.param === sorting_setting);
  const [choseMenu, setChoseMenu] = useState(listMenu.indexOf(objtemp));
  
  const loadListPostBtn = async () => {
    checkToken(async (access_token) => {
      let datas = [];
      datas = await loadNewPost(Number(curLoadID - 1), access_token);
      setTimeout(() => {
        let data0_ = datas[0];
        if(data0_.length > 0){
            setListPost([...listpost, ...converData(datas)]);
            setCurLoadID(data0_[data0_.length-1].ID);
            if(data0_.length < 5) setLoadState(-1);
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
      datas = await loadNewMember(sorting_setting, search, page+1, access_token );
      setTimeout(() => {
        let data0_ = datas;
        if(data0_.length > 0){
            setListMember([...listmember, ...data0_]);
            setPage(page+1);
            if(data0_.length < rangeMember) setLoadState(-1);
            else setLoadState(false);
        }else{
            setLoadState(-1);
        }
      }, 400);
    });
  }


  useEffect(() => {

    if(listpost.length < 5 && id == 1) setLoadState(-1);
    if(listmember.length < rangeMember && id == 2) setLoadState(-1);
    if(listpost.length > 0 ) setCurLoadID(listpost[listpost.length-1].ID);
    
  }, []);

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      Router.push('/manage/'+id+'?search='+search+'&sorting_setting='+sorting_setting);
    }
  }

  const removePostBtn = (ID_Post, index, thread_id) => {
    removePost(conFirmFun, ID_Post, thread_id, index, (success) => {
      if(success) setListPost(listpost.filter(item => item.ID !== ID_Post));
    });
  }



  return (

    <div>
      <Meta title={"Quản lý | AniVnThread"}></Meta>
      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

      <div class="fr-account" dark-mode={darkMode ? "true" : "false"}>    
          <MenuAccount conFirmFun={conFirmFun} listMenuAccount={listMenuAccount} idItem={id} deviceType={deviceType} />

          <div class="manage-account setting-account">

              { 1==id || 2==id ?
              <div class="wrap-search-manage-account">
                  <div class="manage-search-bar">
                    <input type="text" class="searchTerm-manage-account" value={search} 
                    onChange={e => {
                      setSearch(e.target.value);
                    }}  placeholder="Nhập từ khóa bạn cần tìm?" onKeyDown={_handleKeyDown}/>
                    <button type="submit" class="searchButton-manage-account" onClick={() => {Router.push('/manage/'+id+'?search='+search+'&sorting_setting='+sorting_setting)}}><i class="fa fa-search"></i></button>
                  </div>
              </div>
              : ""}
              
              { 1==id ? <ProfileSubMenu listMenu={listMenu} urlMenu={urlMenu} choseMenu={choseMenu}  setChoseMenu={setChoseMenu} /> : ""}
              { 2==id ? <ProfileSubMenu listMenu={listMenu} urlMenu={urlMenu} choseMenu={choseMenu}  setChoseMenu={setChoseMenu} /> : ""}

              { 1==id ? <div class="sheet" dark-mode={darkMode ? "true" : "false"}><Sheet_ data={listpost} id_user={userData.id} is_admin={userData.admin} removePostBtn={removePostBtn} conFirmFun={conFirmFun}/></div> : ""}
              { 2==id ? <MemberSection conFirmFun={conFirmFun} darkMode={darkMode} data={listmember} userData={userData} /> : "" }
              { 3==id ? <SettingSection listwordsbyblock={loadwordsbyblock}/> : "" }

              {id==1 ?  <LoadMore loadState={loadState} setLoadState={setLoadState}  btnAct={loadListPostBtn }/> : "" }
              {id==2 && listmember.length >= rangeMember ?  <LoadMore loadState={loadState} setLoadState={setLoadState}  btnAct={loadListMemberBtn}/> : "" }

          </div>    

      </div>
    </div>
  )
}


export async function getServerSideProps(context) {

  const UA = context.req.headers['user-agent'];
  const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));

  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

  let accessToken = cookies.access_token;
  if(!accessToken) accessToken = context.res.getHeaders().access_token;


  let sorting_setting = '-';
  if(context.query.sorting_setting) sorting_setting = context.query.sorting_setting;

  let search = '';
  if(context.query.search) search = context.query.search;


  let loadlistpost = [];
  let loadlistmember = [];
  let loadwordsbyblock = [];
  
  if(cookies.refresh_token) {
    
    if(context.params.id == 1){
      loadlistpost = await loadNewPost(-1,accessToken);
    }else if(context.params.id == 2){
      loadlistmember = await loadNewMember(sorting_setting, search, 0, accessToken);
    }else if(context.params.id == 3){
      loadwordsbyblock = await loadWordsByBlock(accessToken);
    }

  }

  return {
    props: {
      deviceType: isMobile, loadlistpost, loadlistmember, loadwordsbyblock, dark_mode
    }
  }
}

export default Account