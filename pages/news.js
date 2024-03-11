import  { useState, useEffect, useContext }  from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router';
import qs from 'querystring';
import Meta from '../components/Meta'

import Breadcrumb from '../components/Another/Breadcrumb';

import { loadListLatestThread, loadListTopThread, loadToken, loadNewFeed} from '../data/fetch'
import { checkToken, likePost } from '../data/axios_fetch';
import ProfileSubMenu from '../components/Page5/ProfileSubMenu';
import GroupThread from '../components/Page2/GroupThread';
import LoadMore from '../components/Another/LoadMore';
import Sheet_ from '../components/Page3/Sheet_';
import { LayoutContext } from '../components/_layout';
import { MainContext } from '../components/_main';
import { removePost } from '../callapi/post';
import { removeThread } from '../callapi/thread';
import { env_variable } from '../env';


const News = ({listthread, dataPosts}) => {

  const RangePost = env_variable.RANGEPOST;
  const RangeThread = env_variable.RANGETHREAD;

  const breadcrumb = [{label: 'Bài viết', link: '/news/'}];

  const {darkMode, userData}  = useContext(MainContext); 
  const {conFirmFun}  = useContext(LayoutContext); 

  const router = useRouter()
  var sorting_setting = router.query.sorting_setting;

  if(sorting_setting){}else{
    if(dataPosts.length > 0) sorting_setting = 'newsfeed'
    else sorting_setting = 'chronological'
  }
  var listMenu = [
    {
      param: 'newsfeed',
      label: 'News Feed',
    },
    {
      param: 'chronological',
      label: 'Mới nhất',
    },
    {
      param: 'total_post',
      label: 'Top bài viết'
    }
  ]
  var urlProfileMenu = '/news?sorting_setting=';
  var objtemp = listMenu.find(x => x.param === sorting_setting);


  const [loadState, setLoadState] = useState(false);
  const [page, setPage] = useState(0);


  const [choseMenu, setChoseMenu] = useState(listMenu.indexOf(objtemp));
  const [isFetching, setIsFetching] = useState(false);
  const [listThread, setListThread] = useState(listthread);


  const converData = (datas) =>{
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
          pkx[i].replyId = element.id_post;
          pkx[i].reply = element.content;
        }
      }
    }
    return pkx;
    }else{
      return [];  
    }
  }

  const [listpost, setListPost] = useState(converData(dataPosts))  


  useEffect(() => {
    if(sorting_setting === 'newsfeed')
    if(isFetching==true){
      setLoadState(true);
      setTimeout(() => {
      checkToken(async (access_token) => {
        let datas = [];
        datas = await loadNewFeed( access_token );
          if(datas.length > 0){
            let data0_ = datas[0];
            if(data0_.length > 0){
              setListPost([...listpost, ...converData(datas)])
                if(data0_.length < RangePost){ setLoadState(-1); }
                else{  setIsFetching(-1); setLoadState(-1);}
            }else{
              setLoadState(-1);
            }
          }else{
            setLoadState(-1);
          }  
      })
    }, 500);
    }
  }, [isFetching]);


  useEffect(() => {
    if(sorting_setting === 'newsfeed' || listThread.length < RangeThread) setLoadState(-1);
      const handleScroll = () => {
        if(sorting_setting==='newsfeed')
        if (
          window.innerHeight +
            Math.max(
              window.pageYOffset,
              document.documentElement.scrollTop,
              document.body.scrollTop
            ) >
          document.documentElement.offsetHeight - 100
        ) {
          console.log('fetching...')
          setIsFetching(true);
        } else {
          return;
        }
      };
      window.addEventListener('scroll', handleScroll);
    }, [])


    
    const loadListThreadBtn = async () => {
      checkToken(async (access_token) => {
  
        let datas = [];
        if(sorting_setting==='total_post'){
          
          datas = await loadListTopThread(page+1, access_token);
          setTimeout(() => {
            if(datas.length > 0){
              setListThread([...listThread, ...datas]);
              setPage(page+1);
              if(datas.length < RangeThread) setLoadState(-1);
              else setLoadState(false);
            }else{
              setLoadState(-1);
            }
          }, 400);

        }else if(sorting_setting==='chronological'){

          datas = await loadListLatestThread(Number(listThread[listThread.length - 1].Thread_ID), access_token );
          setTimeout(() => {
            if(datas.length > 0){
              setListThread([...listThread, ...datas]);
              if(datas.length < RangeThread) setLoadState(-1);
              else setLoadState(false);
            }else{
              setLoadState(-1);
            }
          }, 400);
          
        }
      })
    }

    
    const deleteThreadBtn = (id_thread) => {
      removeThread(conFirmFun, id_thread, (success) => {
        if(success){
          if(sorting_setting === 'chronological'){
            setListThread(listThread.filter(item => item.Thread_ID !== id_thread));
          }else Router.push(window.location.pathname);
        }
      });
    }

    const likePostBtn = (ID_Post, isliked) => {
      if(userData.logged){
        likePost({
          post_id: ID_Post,
          isliked: isliked
        },(code, result) => {
          if(code == 1){
          }else{
            conFirmFun("Thích bài viết", "Đã xảy ra lỗi hệ thống");
            alert(result);
          }
        });
      }else{
        setDisplayLoginModel(true);
      }
    }

    const removePostBtn = (ID_Post,index,thread_id) => {
      removePost(conFirmFun, ID_Post, thread_id, index, () => {
          setListPost(listpost.filter(item => item.ID !== ID_Post));
      });
    }
  

  return (
    <>
      <Meta title={"Bài viết | " + env_variable.LABEL_TAB_BAR}></Meta>
      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

      <ProfileSubMenu listMenu={listMenu} urlMenu={urlProfileMenu} choseMenu={choseMenu}  setChoseMenu={setChoseMenu} />

      { 'newsfeed'===sorting_setting ? 
      <div class="sheet" dark-mode={darkMode ? "true" : "false"} >
          <Sheet_ data={listpost} removePostBtn={removePostBtn} conFirmFun={conFirmFun} likePostBtn={likePostBtn} movePostBtn={""}/>
      </div>
      : 
      <div class="cluster-hub" dark-mode={darkMode ? "true" : "false"}>
        <div class="others-cluster-group">
            <GroupThread deleteThreadBtn={deleteThreadBtn} data={listThread} userData={userData}/>
        </div>
      </div>
      }

      <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadListThreadBtn}/> 

      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>
    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

  let accessToken = cookies.access_token;
  if(!accessToken) accessToken = context.res.getHeaders().access_token;

  let listthread = [];
  let dataPosts = [];

  let sorting_setting = '';
  if(context.query.sorting_setting) sorting_setting = context.query.sorting_setting;

  if(sorting_setting === 'total_post')
    listthread = await loadListTopThread(0, accessToken);
  else if(sorting_setting === 'chronological')
    listthread = await loadListLatestThread(-1, accessToken);
  else{
    if(cookies.refresh_token){
      dataPosts = await loadNewFeed(accessToken);
    }else{
      listthread = await loadListLatestThread(-1, accessToken);
    }
  }

  if(!context.query.sorting_setting){
    if(dataPosts.length > 0){}else{
      listthread = await loadListLatestThread(-1, accessToken);
    }
  } 

  return {
    props: {
      listthread, dataPosts, dark_mode
    }
  }
}

export default News
