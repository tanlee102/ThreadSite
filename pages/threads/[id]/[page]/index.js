import { useContext, useEffect, useState } from 'react';
import Router from 'next/router'

import Meta from '../../../../components/Meta';

import { loadPosts, loadIndexPost, loadLike, loadLatestThread, loadSuggestThread } from '../../../../data/fetch';
import { likePost } from '../../../../data/axios_fetch';
import { addPost, removePost } from '../../../../callapi/post';

import Pagination from '../../../../components/Another/Pagination';
import Breadcrumb from '../../../../components/Another/Breadcrumb';
import SheetRely from '../../../../components/Page3/SheetRely';
import Sheet from '../../../../components/Page3/Sheet';
import GroupSuggestionPost from '../../../../components/Page1/GroupSuggestionPost';

import { MainContext } from '../../../../components/_main';
import { LayoutContext } from '../../../../components/_layout';
import { env_variable } from '../../../../env';
import Cookies from 'js-cookie';


const Threads = ({dataPosts, dataLikes, page, thread_id, post_per_page, latest, suggestThreads}) => {

  const datahead = dataPosts[4];

  const breadcrumb = [{label: datahead?.CategoryName, link: "/category/"+datahead?.Category_ID}, {label: datahead?.SubForumName, link: "/forums/"+datahead?.SubForum_ID}];
 
  const {conFirmFun, previewFunc, setDisplayLoginModel}  = useContext(LayoutContext); 
  const {darkMode, userData, replydata, typeKit, dataNoKit, setDataNokit}  = useContext(MainContext); 

  let totalPage = 0;
  if(dataPosts[3])
    totalPage = Math.ceil(dataPosts[3][0].total_rows/post_per_page);


  const pkx = dataPosts[0];
  const pky = dataPosts[2];
  if(pkx)
  for(let i = 0; i < pkx?.length; i++){
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
    if(datahead?.tagID == 1 && Number(page) == 1) number = number -2;
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



  const getTitleImage = (str) => {
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

  
  useEffect(() => {
  
      const lowHashCookie = Cookies.get('low_hash', { domain: env_variable.HOST_COOKIE_NAME });
      const subforumId = datahead?.SubForum_ID;
      const threadGroup = lowHashCookie ? JSON.parse(lowHashCookie) : {};
  
      if (threadGroup) {
        const curThreadList = threadGroup[subforumId] || [];
  
        if (!curThreadList.includes(thread_id)) {
          if (curThreadList.length > Number(env_variable.MAX_LOW_HASH_LENGTH)) {
            curThreadList.shift();
          }
  
          curThreadList.push(thread_id);
          threadGroup[subforumId] = curThreadList;
        }
      } else {
        threadGroup[subforumId] = [thread_id];
      }
  
      Cookies.set('low_hash', JSON.stringify(threadGroup), {
        expires: Number(env_variable.DAY_LOW_HASH_LENGTH),
        domain: env_variable.HOST_COOKIE_NAME,
        path: '/'
      });
      
  },[])


  return (
    <>
      <Meta title={datahead?.title_thread}>
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
        
        <meta name="description" content={String(dataPosts[1]?.[0]?.content ? dataPosts[1][0]?.content : "").replace(/<[^>]*>/g, '').substring(0,450)}/>

        <meta property="og:title" content={datahead?.title_thread}/>
        <meta property="og:image" content={getTitleImage(dataPosts[1]?.[0]?.content ? dataPosts[1][0]?.content : "")}/>
        <meta property="og:description" content={String(dataPosts[1]?.[0]?.content ? dataPosts[1][0]?.content : "").replace(/<[^>]*>/g, '').substring(0,450)}/>
      </Meta>

      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

    
          <div className='contain-head-post-sheet'>
                {(datahead?.tagID !== 1 && datahead?.tagID !== 2) ? 
                  <div class="title-thread">
                    <span style={{backgroundColor: '#'+datahead?.code}}>{datahead?.title_tag}</span>
                    <span>{datahead?.title_thread}</span>
                  </div>      
                  : 
                  <div class="title-article">{datahead?.title_thread}</div>
                }

                {((datahead?.tagID !== 1 && datahead?.tagID !== 2) || Number(page) !== 1) && totalPage > 1 ? 
                    <Pagination total_page={totalPage} cur_page={page} thread_id={thread_id} /> 
                :  ""}

          </div>

          <div className='contain-post-sheet'>
              
              <div class="sheet" dark-mode={darkMode ? "true" : "false"}>
                  <Sheet tagID={datahead?.tagID} data={listpost} removePostBtn={removePostBtn} likePostBtn={likePostBtn} movePostBtn={movePostBtn}/>
              </div>

              {totalPage > 1 ? 
              <div className='right-pagination'>
                  <Pagination total_page={totalPage} cur_page={page} thread_id={thread_id}/>
              </div>
              : ""
              }
              
              {userData.logged ? 
                <div class="sheet">
                    <SheetRely addPostBtn={addPostBtn} />
                </div>
                :
                <div className='bottom-login-post' onClick={() => {setDisplayLoginModel(true)}}>
                  <svg width="20px" height="20px" viewBox="0 0 32 32" ><path d="M18.257,6.671l-9.679,9.679c-0.137,0.138 -0.232,0.312 -0.271,0.502l-1.487,7.085c-0.069,0.329 0.032,0.671 0.269,0.909c0.236,0.239 0.577,0.343 0.906,0.277l7.143,-1.428c0.194,-0.039 0.372,-0.134 0.511,-0.274l9.679,-9.679l-7.071,-7.071Zm1.414,-1.414l7.071,7.071l1.793,-1.792c1.953,-1.953 1.953,-5.119 0,-7.072c0,0 0,0 0,0c-0.938,-0.937 -2.209,-1.464 -3.535,-1.464c-1.327,0 -2.598,0.527 -3.536,1.464l-1.793,1.793Z"/><path d="M3.5,30l24,0c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5l-24,0c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5Z"/></svg>
                  <p>Viết bình luận</p></div>
              }      


          </div>

          <div className= { (Number(datahead?.tagID) == 1 || Number(datahead?.tagID) == 2)  ?  'contain-post-suggestion margin-top-1-contain-post-suggestion' : 'contain-post-suggestion margin-top-2-contain-post-suggestion'} >
              <GroupSuggestionPost darkMode={darkMode} data={suggestThreads}></GroupSuggestionPost>
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
    const latest = await loadLatestThread();

    const SF_ID = dataPosts[4]?.SubForum_ID; 
    const cookieValue = cookies.low_hash; 
    const cookieData = cookieValue ? JSON.parse(cookieValue) : {};
    const low_hash = cookieData[SF_ID] || [];

    const suggestThreads = await loadSuggestThread(SF_ID, thread_id, low_hash);
    
    return {
      props: {
        dataPosts, dataLikes, latest, page, thread_id, post_per_page, suggestThreads, dark_mode
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