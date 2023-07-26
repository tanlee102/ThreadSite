import  { useState, useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';

import MenuAccount from '../../../components/Page4/MenuAccount';
import ProfileSubMenu from '../../../components/Page5/ProfileSubMenu';
import Breadcrumb from '../../../components/Another/Breadcrumb';


import Meta from '../../../components/Meta';
import LoadMore from '../../../components/Another/LoadMore';
import Sheet_ from '../../../components/Page3/Sheet_';
import MemberSection from '../../../components/Page7/MemberSection';
import SettingSection from '../../../components/Page7/SettingSection';
import { MainContext } from '../../../components/_main';
import TermsAndRules from '../../../components/Page8/TermsAndRules';
import PrivacyRight from '../../../components/Page8/PrivacyRight';
import CookieUse from '../../../components/Page8/CookieUse';

const Account = ({deviceType}) => {

  const breadcrumb = [{label: 'Terms of use', link: '/rules/terms-and-rules'}]; 
  const {darkMode, userData}  = useContext(MainContext); 

  const router = useRouter(); 
  var id = router.query.id; 


  const listMenuAccount = [
    {label:'Rules and Terms', url: '/rules/terms-and-rules'},
    {label:'Privacy Policy', url: '/rules/privacy-policy'},
    {label:'Cookie Usage', url: '/rules/cookie-usage'},
  ]

  id = listMenuAccount.findIndex((element) => { 

    if(router.asPath.includes(element.url)) return true;
    else return false;

   })



  return (

    <div>
      <Meta title={"Điều khoản"}></Meta>
      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

      <div class="fr-account" dark-mode={darkMode ? "true" : "false"}>    
          <MenuAccount listMenuAccount={listMenuAccount} idItem={id} deviceType={deviceType} />

          <div class="setting-account">

            <div class="co-rules-body-content">
              <div class="rules-body-content">
                {id === 0 ?  <TermsAndRules></TermsAndRules> : ""}
                {id === 1 ?  <PrivacyRight></PrivacyRight> : ""}
                {id === 2 ?  <CookieUse></CookieUse> : ""}
              </div>
            </div>

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

  return {
    props: {
        deviceType: isMobile, dark_mode
    }
  }
}



export default Account
