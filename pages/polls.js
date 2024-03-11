import React, { useState, useEffect, useContext }  from 'react'
import { useRouter } from 'next/router'

import Meta from '../components/Meta'
import Breadcrumb from '../components/Another/Breadcrumb';

import ProfileSubMenu from '../components/Page5/ProfileSubMenu';

import { MainContext } from '../components/_main';
import { env_variable } from '../env';
import PollItems from '../components/Poll/PollItems';
import { loadLatestPoll, loadTopPoll } from '../data/fetch';
import LoadMore from '../components/Another/LoadMore';


const About = ({dataPoll}) => {

  const RangePoll = env_variable.RANGEPOLL;

  const breadcrumb = [{label: 'Bình chọn', link: '/polls/'}];

  const {darkMode}  = useContext(MainContext); 

  const router = useRouter();
  var sorting_setting = router.query.sorting_setting;

  if(sorting_setting){}else{
    sorting_setting = 'chronological'
  }
  var listMenu = [
    {
      param: 'chronological',
      label: 'Mới nhất'
    },
    {
        param: 'top',
        label: 'Nhiều nhất',
    },
  ]
  var urlProfileMenu = '/polls?sorting_setting=';
  var objtemp = listMenu.find(x => x.param === sorting_setting);

  const [choseMenu, setChoseMenu] = useState(listMenu.indexOf(objtemp));

  const [loadState, setLoadState] = useState(false);
  const [page, setPage] = useState(0);

  const [listpoll, setListPoll] = useState(dataPoll)  

      
  const loadListPollBtn = async () => {

      let datas = [];
      if(sorting_setting==='top'){
        
        datas = await loadTopPoll(page+1);
        setTimeout(() => {
          if(datas.length > 0){
            setListPoll([...listpoll, ...datas]);
            setPage(page+1);
            if(datas.length < RangePoll) setLoadState(-1);
            else setLoadState(false);
          }else{
            setLoadState(-1);
          }
        }, 400);

      }else if(sorting_setting==='chronological'){

        datas = await loadLatestPoll(page+1);
        setTimeout(() => {
          if(datas.length > 0){
            setListPoll([...listpoll, ...datas]);
            setPage(page+1);
            if(datas.length < RangePoll) setLoadState(-1);
            else setLoadState(false);
          }else{
            setLoadState(-1);
          }
        }, 400);
        
      }
    
  }

  useEffect(() => {
    if(listpoll.length < RangePoll) setLoadState(-1);
    }, [])

  return (
    <>
      <Meta title={"Bình chọn | " + env_variable.LABEL_TAB_BAR}></Meta>
      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

      <ProfileSubMenu listMenu={listMenu} urlMenu={urlProfileMenu} choseMenu={choseMenu}  setChoseMenu={setChoseMenu} />
      <div class="content-body-member">
        <PollItems data={listpoll} darkMode={darkMode}/>
      </div>

      <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadListPollBtn}/> 

      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>
    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

  let dataPoll = [];
  let sorting_setting = 'chronological';
  if(context.query.sorting_setting) sorting_setting = context.query.sorting_setting;

  if(sorting_setting === 'chronological')
    dataPoll = await loadLatestPoll(0);
  else if(sorting_setting === 'top')
    dataPoll = await loadTopPoll(0);


  return {
    props: {
        dataPoll, dark_mode
    }
  }
}

export default About
