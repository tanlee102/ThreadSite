import React, { useState, useEffect, useContext }  from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router';

import Meta from '../components/Meta'
import Breadcrumb from '../components/Another/Breadcrumb';

import { loadListMember} from '../data/fetch'
import { followMember } from '../data/axios_fetch';
import ProfileSubMenu from '../components/Page5/ProfileSubMenu';
import FollowingSection from '../components/Page5/FollowingSection';
import { MainContext } from '../components/_main';
import { env_variable } from '../env';


const About = ({listmembers}) => {

  const breadcrumb = [{label: 'Thành viên', link: '/members/'}];

  const {darkMode, userData}  = useContext(MainContext); 

  const router = useRouter();
  var id = router.query.id;
  var sorting_setting = router.query.sorting_setting;

  if(sorting_setting){}else{
    sorting_setting = 'this_month'
  }
  var listMenu = [
    {
      param: 'this_month',
      label: 'Top của tháng'
    },
    {
        param: 'all_time',
        label: 'Top All Time',
    },
    {
      param: 'list_admin',
      label: 'Danh sách quản trị',
  },
  ]
  var urlProfileMenu = '/members?sorting_setting=';
  var objtemp = listMenu.find(x => x.param === sorting_setting);

  const [choseMenu, setChoseMenu] = useState(listMenu.indexOf(objtemp));
  const [listMember , setListMember] = useState(listmembers)

  const followListMemberBtn = (isfollowed,member_id,index) =>{
    followMember({
      member_id: member_id,
      isfollowed: !isfollowed
    },(code, result) => {
      if(code == 1){
        let newArr = [...listMember]; 
        newArr[index].exfo = !isfollowed;
        setListMember(newArr)
      }else{
        alert('Đã xảy ra lỗi hệ thống!!')
        alert(result);
      }
    })
  }

  return (
    <>
      <Meta title={"Thành viên | " + env_variable.LABEL_TAB_BAR}></Meta>
      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

      <ProfileSubMenu listMenu={listMenu} urlMenu={urlProfileMenu} choseMenu={choseMenu}  setChoseMenu={setChoseMenu} />
      <div class="content-body-member">
        <FollowingSection data={listmembers} userData={userData} darkMode={darkMode} followListMemberBtn={followListMemberBtn}/>
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

  let user_id = cookies.user_package ? JSON.parse(cookies.user_package).id : -1;
  if(!user_id) user_id = -1;  

  let listmembers = [];
  let sorting_setting = 'this_month';
  if(context.query.sorting_setting) sorting_setting = context.query.sorting_setting;
  listmembers = await loadListMember(sorting_setting, user_id);

  return {
    props: {
      listmembers, dark_mode
    }
  }
}

export default About
