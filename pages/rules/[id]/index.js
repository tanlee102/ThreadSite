import  { useContext }  from 'react';
import { useRouter } from 'next/router';

import MenuAccount from '../../../components/Page4/MenuAccount';

import Breadcrumb from '../../../components/Another/Breadcrumb';


import Meta from '../../../components/Meta';
import { MainContext } from '../../../components/_main';
import TermsAndRules from '../../../components/Page8/TermsAndRules';
import PrivacyRight from '../../../components/Page8/PrivacyRight';
import CookieUse from '../../../components/Page8/CookieUse';
import { env_variable } from '../../../env';

const Account = ({deviceType}) => {

  const breadcrumb = [{label: 'Terms of Use', link: '/rules/terms-and-rules'}]; 
  const {darkMode}  = useContext(MainContext); 

  const router = useRouter(); 
  var id = router.query.id; 


  const listMenuAccount = [
    {label:'Rules and Terms', url: '/rules/terms-and-rules'},
    {label:'Privacy Policy', url: '/rules/privacy-and-policy'},
    {label:'Cookie Usage', url: '/rules/cookie-usage'},
  ]


  return (

    <div>
      <Meta title={"Điều khoản | " + env_variable.LABEL_TAB_BAR}></Meta>
      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

      <div class="fr-account" dark-mode={darkMode ? "true" : "false"}>    
          <MenuAccount listMenuAccount={listMenuAccount} idItem={id} deviceType={deviceType} />

          <div class="setting-account">

            <div class="co-rules-body-content">
              <div class="rules-body-content">
                {id === 'terms-and-rules' ?  <TermsAndRules></TermsAndRules> : ""}
                {id === 'privacy-and-policy' ?  <PrivacyRight></PrivacyRight> : ""}
                {id === 'cookie-usage' ?  <CookieUse></CookieUse> : ""}
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
