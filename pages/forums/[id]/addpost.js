import React, { useState, useEffect, useContext } from 'react';
import Router, { useRouter } from 'next/router'

import { loadInfoAddPost } from '../../../data/fetch';
import { addThread } from '../../../callapi/thread';
import { nokitConvert } from '../../../components/Nokit/nokitConvert';

import Nakit from '../../../components/Nakit';
import Nokit from '../../../components/Nokit/Nokit';
import Meta from '../../../components/Meta';
import Breadcrumb from '../../../components/Another/Breadcrumb';

import { MainContext } from '../../../components/_main';
import { LayoutContext } from '../../../components/_layout';

import useCheckLoadKit from '../../../helper/useCheckLoadKit';
import { env_variable } from '../../../env';


const Addpost = ({tagthread, infoaddpost}) => {

  const breadcrumb = [{label: infoaddpost.CategoryName, link: "/category/"+infoaddpost.Category_ID},{label:infoaddpost.SubForumName, link:"/forums/"+infoaddpost.SubForum_ID}];

  const {conFirmFun, previewFunc}  = useContext(LayoutContext); 
  const {darkMode, typeKit, setTypeKit, dataNoKit, setDataNokit, getDataNokit}  = useContext(MainContext); 

  const [listSelection, setListSelection] = useState(tagthread)
  const [selection, setSelection] = useState(tagthread[0].ID)
  const [code, setCode] = useState(tagthread[0].code)
  const [borderColor, setBorderColor] = useState(null);


  const router = useRouter();
  var id = router.query.id;


  useCheckLoadKit(getDataNokit);
  useEffect(() => {
    setDataNokit([
      {text: ' ', isBold: false, key: 1},
    ]);
    document.getElementsByClassName('fr-text').item(0).innerHTML = '';
  }, [router.asPath]);


  const handleChange = (event) => {
    const myVa = event.target.value;
    setSelection(myVa);
    setCode(tagthread.find(o => o.ID === Number(myVa)).code);
  }


  const addPostBtn = () => { 
    addThread(conFirmFun, id, selection, (document.getElementById('create-title-post').value), typeKit, dataNoKit, (success, result) => {
      if(success){
          previewFunc();
          setDataNokit([
            {text: " ", isBold: false, key: 1},
          ]);
          document.getElementsByClassName('fr-text').item(0).innerHTML = '';
          setTimeout(() => {
            Router.push('/threads/'+Number(result.data.thread_id)+'/go?post_id='+Number(result.data.post_id))       
          }, 0);
      }
    });
  }



  return (

    <>

    <Meta title={"Thêm bài viết | " + env_variable.LABEL_TAB_BAR}>
        {typeKit ? <>
        <script src="/NakitJS/Nakit.js" defer></script>
        <script src="/NakitJS/BoldItalicUnderline.js" defer></script>
        <script src="/NakitJS/IndentOutdent.js" defer></script>
        <script src="/NakitJS/LeftRightCenter.js" defer></script>
        <script src="/NakitJS/MakeImage_1.js" defer></script>
        <script src="/NakitJS/MakeLink_1.js" defer></script>
        <script src="/NakitJS/Sticker.js" defer></script>
        <script src="/NakitJS/TextHeight.js" defer></script>
        </> : ""}
    </Meta>

    <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

    <div class="fr-create-post">

      <div class="fr-create-title-post">
          <input type="text" style={{borderColor:  borderColor ? '#'+borderColor : ""}} onFocus={() => setBorderColor(code)} onBlur={() => setBorderColor(null)}  autocomplete="off" id="create-title-post" placeholder="Tiêu đề"/>
      </div>

      <div className='fr-head-create-post'>

        {listSelection.length > 0 ?
          <div style={{backgroundColor: '#'+code}} className='fr-chose-tag-post'> 
            <select className="chose-tag-post" style={{backgroundColor: '#'+code}} value={selection}  onChange={(e) => {handleChange(e)}} >
            {listSelection.map(item => (
              <option key={item.ID} value={item.ID} >{item.title}</option>
            ))}
            </select>
          </div>
        : ""
        }

        <span onClick={() => setTypeKit(!typeKit)}>
            <svg viewBox="0 0 100 100"><path d="M77.4,78.1H40.5c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h36.9  c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6C79.8,77,78.8,78.1,77.4,78.1C77.5,78.1,77.5,78.1,77.4,78.1z"/> <path d="M26.6,78.1H22c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h4.6   c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6C29,77,28,78,26.8,78.1C26.7,78.1,26.7,78.1,26.6,78.1z"/>  <path d="M53.8,57.6c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h23.6  c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6c0,1.2-1,2.3-2.2,2.3c0,0-0.1,0-0.1,0H53.8z"/>  <path d="M62.6,37.1c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h14.8   c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6c0,1.2-1,2.3-2.2,2.3c0,0-0.1,0-0.1,0H62.6z"/> <path d="M20.8,58.2C19.6,47.5,28,36.4,38,34.5l2.7-0.6c0.5-0.1,0.9-0.6,0.8-1.2c0-0.3-0.2-0.5-0.4-0.6l-6.7-4.5  c-0.7-0.5-0.8-1.4-0.3-2c0,0,0,0,0-0.1l1.7-2.5c0.4-0.7,1.4-0.9,2-0.4c0,0,0,0,0.1,0L54,33.5c0.7,0.4,0.9,1.4,0.4,2c0,0,0,0,0,0.1  l-11,16.2c-0.4,0.7-1.4,0.9-2,0.4c0,0,0,0-0.1,0l-2.5-1.7c-0.7-0.4-0.9-1.4-0.4-2c0,0,0,0,0-0.1l4.4-6.7c0.3-0.4,0.3-1.1-0.2-1.4   c-0.2-0.2-0.5-0.3-0.8-0.2l-1.6,0.3c-7.8,1.5-14.4,10.3-13.7,17.9c0,0.7-1.1,1.7-1.9,1.9h-1.9C21.8,60.3,20.8,59.1,20.8,58.2z"/> </svg>
            <div>TYping</div>
        </span>

      </div>

      <div style={{display: typeKit ? 'block' : 'none'}}><Nakit></Nakit> </div>
      <div style={{display: !typeKit ? 'block' : 'none'}}><Nokit data={dataNoKit} setData={setDataNokit}></Nokit></div>

      <div class="submit-reply-sheet-item">

          <span style={{backgroundColor: '#'+code}}  onClick={() => {addPostBtn()}}>
            <svg x="0px" y="0px" viewBox="0 0 512 512" > <path d="M505.265,162.41L347.727,24.564c-5.809-5.081-14.06-6.282-21.091-3.111c-7.05,3.19-11.559,10.201-11.559,17.92v19.692 H19.692C8.802,59.065,0,67.887,0,78.757v393.846c0,10.89,8.802,19.692,19.692,19.692h393.846c10.89,0,19.692-8.802,19.692-19.692 V255.082l72.034-63.035c4.293-3.742,6.735-9.137,6.735-14.828C512,171.548,509.558,166.152,505.265,162.41z M393.846,452.911	H39.385V98.45h275.692v4.825c-44.741,14.159-171.697,66.895-177.211,211.042c-0.394,9.689,6.361,18.215,15.892,20.086	c1.26,0.256,2.54,0.354,3.801,0.354c8.133,0,15.616-5.061,18.471-12.958c19.909-54.725,101.77-64.177,139.047-65.634v58.9	c0,7.739,4.51,14.75,11.559,17.94c2.304,1.063,4.766,1.457,7.227,1.556c0.315,0.02,0.591,0.197,0.906,0.197	c0.394,0,0.768-0.177,1.142-0.197c1.477-0.099,2.875-0.374,4.293-0.768c0.67-0.197,1.339-0.335,1.969-0.591	c1.989-0.807,3.899-1.851,5.553-3.308l46.119-40.35V452.911z"/> </svg>
            <p>Đăng bài</p>
          </span>

          <span onClick={() => {previewFunc(typeKit ?  String(document.getElementById('editable').innerHTML) :  nokitConvert(dataNoKit, true), addPostBtn, [1,2].includes(Number(document.getElementsByClassName("chose-tag-post").item(0).value)) )}}>
            <svg viewBox="0 0 512 512" ><path d="m251.6,185.7c-36.9,0-67,31.5-67,70.3 0,38.7 30,70.3 67,70.3 36.9,0 67-31.5 67-70.3 0-38.7-30.1-70.3-67-70.3z"/><path d="m251.6,367.1c-59.4,0-107.8-49.8-107.8-111.1 0-61.3 48.4-111.1 107.8-111.1s107.8,49.8 107.8,111.1c0,61.3-48.4,111.1-107.8,111.1zm246.3-121.9c-63.8-102.4-149.8-158.8-241.9-158.8-92.1,0-178.1,56.4-241.9,158.8-4.1,6.6-4.1,15 0,21.6 63.8,102.4 149.8,158.8 241.9,158.8 92.1,0 178-56.4 241.9-158.8 4.1-6.6 4.1-15 0-21.6z"/> </svg>
            <p>Xem trước</p>
          </span>

      </div>

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

  let infoaddpost = [];

  if(cookies.refresh_token) {
    infoaddpost = await loadInfoAddPost(Number(context.params.id), accessToken); 
  }

  const tagthread = infoaddpost[1];
  infoaddpost = infoaddpost[0][0];

  return {
    props: { 
      infoaddpost, tagthread, dark_mode
     }
  }
}

export default Addpost