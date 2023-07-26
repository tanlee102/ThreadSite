import { useContext, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router'
import qs from 'querystring';

import Meta from '../../../../components/Meta';

import { loadPosts, loadToken, loadIndexPost, loadLike } from '../../../../data/fetch';
import { likePost } from '../../../../data/axios_fetch';
import { addPost, removePost } from '../../../../callapi/post';

import Pagination from '../../../../components/Another/Pagination';
import Breadcrumb from '../../../../components/Another/Breadcrumb';
import SheetRely from '../../../../components/Page3/SheetRely';
import Sheet from '../../../../components/Page3/Sheet';

import { MainContext } from '../../../../components/_main';
import { LayoutContext } from '../../../../components/_layout';
import { env_variable } from '../../../../env';


const Threads = ({dataPosts, dataLikes, page, thread_id, post_per_page}) => {

  const datahead = dataPosts[4];

  const breadcrumb = [{label: datahead?.CategoryName, link: "/category/"+datahead?.Category_ID}, {label: datahead?.SubForumName, link: "/forums/"+datahead?.SubForum_ID}];
 
  const {conFirmFun, previewFunc, setDisplayLoginModel}  = useContext(LayoutContext); 
  const {darkMode, userData, replydata, typeKit, dataNoKit, setDataNokit}  = useContext(MainContext); 

  let totalPage = 0;
  if(dataPosts[3])
    totalPage = Math.ceil(dataPosts[3][0].total_rows/post_per_page);


  const pkx = dataPosts[0];
  const pky = dataPosts[2];
  for(let i = 0; i < pkx.length; i++){
    pkx[i].content = dataPosts[1][i]?.content;
    pkx[i].index = Number(page - 1)*post_per_page + i + 1;
    let elike = dataLikes.find(o => o.ID === pkx[i].ID);
    if(elike){
      pkx[i].is_liked = elike.is_liked
    }
    if(pkx[i].ID != pkx[i].RePost_ID){
      pkx[i].expSheet = true;
      pkx[i].replyName =  dataPosts[1][i]?.name_user_reply;
      let element = pky.find(o => o.id_post === pkx[i].RePost_ID);
      if(element){
        pkx[i].replyId = element.id_post;
        pkx[i].reply = element?.content;
      }
    }
  }

  const [listpost, setListPost] = useState(pkx)  

  
  const addPostBtn = () => {
    addPost(conFirmFun, thread_id, replydata.id_post, typeKit, dataNoKit, replydata.ten_user, (success, result) => {
      if(success){
        previewFunc();
        setDataNokit([
          {text: " ", isBold: false, key: 1},
        ]);
        document.getElementsByClassName('fr-text').item(0).innerHTML = '';
        setTimeout(() => {
          Router.push('/threads/'+thread_id+'/go?post_id='+Number(result.data.id));     
        }, 0);
      }
    });
  }

  const removePostBtn = (ID_Post,index) => {
    removePost(conFirmFun, ID_Post, thread_id, index, (success, result) => {
      if(success) {
        if(index == 1){
            Router.push('/forums/'+datahead.SubForum_ID);
        }else{
            if(dataPosts[0].length <= 1){
              Router.push('/threads/'+thread_id+'/'+Number(page-1));
            }else{
              setListPost(listpost.filter(item => item.ID !== ID_Post));
              // Router.push('/threads/'+thread_id+'/'+page);
            }
        }
      }
    });
  }

  const likePostBtn = (ID_Post, isliked) =>{
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
      setDisplayLoginModel(true)
    }
  }

  const moveToSheet = (key) => {
    let number = (Number(key) - Number(page - 1)*post_per_page);
    if(datahead.tagID == 1 && Number(page) == 1) number = number -2;
    else number = number - 1;
    if(number >= 0) document.getElementsByClassName('sheet-item').item(number).scrollIntoView({behavior: "smooth",block: "center"});
  }

  const movePostBtn = (ID_Post) => {
    let element = listpost.find(o => o.ID === ID_Post);
    if(element){
      moveToSheet(element.index);
    }else{
      Router.push("/threads/"+thread_id+"/go?post_id="+ID_Post);
    }
  }



  const getTitleImage = (str) =>{
    var m,
    urls = [], 
    rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
    while ( m = rex.exec( str ) ) {
        urls.push( m[1] );
        break;
    }
    if(urls.length > 0) return urls[0]
    else return "";
  }


  return (
    <>
      <Meta title={datahead.title_thread}>
        {typeKit ?
        <>
        <script src="/NakitJS/Nakit.js" defer></script>
        <script src="/NakitJS/BoldItalicUnderline.js" defer></script>
        <script src="/NakitJS/IndentOutdent.js" defer></script>
        <script src="/NakitJS/LeftRightCenter.js" defer></script>
        <script src="/NakitJS/MakeImage_1.js" defer></script>
        <script src="/NakitJS/MakeLink_1.js" defer></script>
        <script src="/NakitJS/Sticker.js" defer></script>
        <script src="/NakitJS/TextHeight.js" defer></script>
        </>
        : "" }
        
        <meta name="description" content={String(dataPosts[1][0]?.content).replace(/<[^>]*>/g, '').substring(0,450)}/>

        <meta property="og:title" content={datahead.title_thread}/>
        <meta property="og:image" content={getTitleImage(dataPosts[1][0]?.content)}/>
        <meta property="og:description" content={String(dataPosts[1][0]?.content).replace(/<[^>]*>/g, '').substring(0,450)}/>
      </Meta>

      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

        {datahead.tagID !== 1 ? 
          <div class="title-thread">
            <span style={{backgroundColor: '#'+datahead.code}}>{datahead.title_tag}</span>
            <span>{datahead.title_thread}</span>
          </div>      
          : 
          <div class="title-article">{datahead.title_thread}</div>
        }

        {(datahead.tagID !== 1 || Number(page) !== 1) && totalPage > 1 ? 
            <Pagination total_page={totalPage} cur_page={page} thread_id={thread_id} /> 
        :  ""}
        
        <div class="sheet" dark-mode={darkMode ? "true" : "false"}>
            <Sheet tagID={datahead.tagID} data={listpost} removePostBtn={removePostBtn} likePostBtn={likePostBtn} movePostBtn={movePostBtn}/>
        </div>

        <div className='right-pagination'>
            <Pagination total_page={totalPage} cur_page={page} thread_id={thread_id}/>
        </div>
        
        {userData.logged ? 
          <div class="sheet">
              <SheetRely addPostBtn={addPostBtn} />
          </div>
          :
          <div className='bottom-login-post' onClick={() => {setDisplayLoginModel(true)}}>Đăng nhập để đăng bài.</div>
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
    
    const post_per_page =  env_variable.RANGEPOST;
    
    let index = 0;
    let page = 0;
    let thread_id = 0;
    if(context.params.page) page = Number(context.params.page);
    if(context.params.id) thread_id = Number(context.params.id);

    if(String(context.params.page) === 'go'){
      let getindex = await loadIndexPost(context.query.post_id);
      index = Number(getindex[0].index);
      thread_id = Number(getindex[0].Thread_ID);
      page = Math.ceil(index/post_per_page);
    }else{
      if(page == 0) page = 1;
    }

    const dataPosts = await loadPosts(thread_id, page, accessToken);
    const dataLikes = await loadLike(thread_id, page, accessToken);
    
    return {
      props: {
        dataPosts, dataLikes, page, thread_id, post_per_page, dark_mode
      }
    }

}

export default Threads


  // useEffect(() => {

  //   if(dataPosts[0].length < 1) Router.push('/threads/'+thread_id+'/'+Number(Math.ceil(dataPosts[3][0].total_rows/post_per_page)));
  //   if(router.query.post_id){
  //     setTimeout(function() {
  //       moveToSheet(index);
  //     }, 150);
  //   }
    
  // }, [dataPosts]);