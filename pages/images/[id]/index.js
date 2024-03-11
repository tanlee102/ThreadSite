import React, { useState, useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Cookies from 'js-cookie';

import { loadPips } from '../../../data/fetch';
import {deleteLogged, checkToken} from '../../../data/axios_fetch';

import Breadcrumb from '../../../components/Another/Breadcrumb';
import Meta from '../../../components/Meta';
import LoadMore from '../../../components/Another/LoadMore';

import { env_confirm_log, env_variable } from '../../../env';
import { LayoutContext } from '../../../components/_layout';
import { MainContext } from '../../../components/_main';
import ListImages from '../../../components/Page9/ListImages';
import UpLoadIamges from '../../../components/Page9/UpLoadIamges';
import SetupStorageImages from '../../../components/Page9/SetupStorageImages';
import ContainMenuImages from '../../../components/Page9/ContainMenuImages';


const Images = ({deviceType, listPips}) => {

  const breadcrumb = [{label: 'Quản lý ảnh', link: "/images/main"}];

  const { darkMode, userData }  = useContext(MainContext);
  const router = useRouter();
  var id = String(router.query.id);

//   useEffect(() => {
//     if(!Cookies.get('refresh_token')){
//       Router.push('/');
//     }
//   }, []);

//   const [datasLogged, setDatasLogged] = useState(id==="logged" ? loadalllogged : []);

  // const [loadState, setLoadState] = useState(false);
  // const [page, setPage] = useState(0);

  return (
    <div>
      <Meta title={"Tài khoản | " + env_variable.LABEL_TAB_BAR}></Meta>
      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

      <div class="fr-account" dark-mode={darkMode ? "true" : "false"}>
             
        <ContainMenuImages deviceType={deviceType} />

        <div class="setting-account">

            {id==="main" ? <ListImages datas={listPips}/> : ""}
            {id==="upload" ? <UpLoadIamges /> : ""}
            {id==="storage" ? <SetupStorageImages /> : ""}
            
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

  let listPips = {};
  listPips = context.params.id === "main" ? await loadPips(accessToken) : {};

  return {
    props: {
      deviceType: isMobile, dark_mode, listPips
    }
  }
}

export default Images