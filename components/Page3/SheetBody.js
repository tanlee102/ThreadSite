import Router, { useRouter } from 'next/router';
import React, {useState, useEffect , useRef, useLayoutEffect, useContext } from 'react'
import {converTime} from '../../helper/converTime'
import { MainContext } from '../_main';
import SheetContent from './SheetContent';

const SheetBody = ({item, removePostBtn, likePostBtn, movePostBtn, index_}) => {

  const [isliked, setIsLiked] = useState(item.is_liked);
  const [totalliked, setTotalLiked] = useState(item.total_like)

  const { setReplydata, userData } = useContext(MainContext);

  const replyReBtn = (item_) => {
    if(movePostBtn){
      document.getElementsByClassName("sheet-item-body reply-sheet-item-body").item(0).scrollIntoView({behavior: "instant", block: "center"});
      setReplydata({
        display: true,
        id_user: item_.Member_ID,
        ten_user: item_.name,
        id_post: item_.ID,
      })
    }else{
      if(userData.logged){
        Router.push('/threads/data/go?post_id='+item_.ID);
      }
    }
  }

  const router = useRouter();
  const myRef = useRef(null)
  useEffect(() => {
    if (myRef.current) {
    if(router.query.post_id){
      if(Number(router.query.post_id) == item.ID){
        myRef.current.scrollIntoView({behavior: "smooth",block: "start"}) ;
      }
    }
    }
  }, []);


  return (
        <div class="sheet-item-body" ref={myRef}>

            <div class="head-sheet-item-body">
              {item ? <span>{converTime(item.time)}</span> : ""}
              <span> {item.index ? '#'+item.index : "" }</span>
            </div>

            {item.hasOwnProperty('reply') ? 
              <div class="sheet-item-reply">
                <div class="head-sheet-item-reply" onClick={() => { movePostBtn ? movePostBtn(item.replyId) : null}}>
                  {item.replyName} viết:
                </div>
                <SheetContent content={item.reply} is_zoom={true}></SheetContent>
              </div>
            : "" }


            <div class="sheet-item-write">
              <SheetContent index_={index_} content={item.content} ></SheetContent>
            </div>


            <div class="sheet-item-button">
              <span>Báo cáo</span>

              {(item.Member_ID === Number(userData.id) || userData.admin) && removePostBtn ? <span onClick={() => {item.Thread_ID ? removePostBtn(item.ID,item.index,item.Thread_ID): removePostBtn(item.ID,item.index)}} className='set-float-left'>Xóa</span> : ""}

              <span onClick={() => { replyReBtn(item);  }}>       
                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-reply" viewBox="0 0 16 16">
                  <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"></path>
                </svg>
                Trả lời
              </span>

              { likePostBtn ? 
              <span onClick={() => {
                  likePostBtn(item.ID, !isliked); 
                  setIsLiked(!isliked); 
                  isliked ? setTotalLiked(totalliked - 1) : setTotalLiked(totalliked + 1)}}>       
            
                  {isliked == 1 ? 
                    <svg version="1.1" viewBox="0 0 51.997 51.997">
                      <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014	C52.216,18.553,51.97,16.611,51.911,16.242z"/>
                    </svg>
                    : 
                    <svg version="1.1" viewBox="0 0 460.958 460.958">
                      <path d="M337.843,23.957c-45.74,0-86.155,25.047-107.364,62.788c-21.209-37.741-61.623-62.788-107.364-62.788 C55.229,23.957,0,79.186,0,147.072c0,54.355,37.736,119.46,112.16,193.506c54.115,53.84,107.363,92.031,109.603,93.631 c2.607,1.861,5.662,2.792,8.716,2.792s6.109-0.93,8.715-2.792c2.241-1.6,55.489-39.791,109.604-93.631 c74.424-74.046,112.16-139.151,112.16-193.506C460.958,79.186,405.729,23.957,337.843,23.957z M327.919,319.032 c-39.843,39.681-80.171,71.279-97.44,84.307c-17.269-13.029-57.597-44.626-97.44-84.307C65.63,251.899,30,192.436,30,147.072 c0-51.344,41.771-93.115,93.115-93.115c47.279,0,87.03,35.369,92.464,82.271c0.876,7.565,7.284,13.273,14.9,13.273 c7.616,0,14.023-5.708,14.9-13.273c5.435-46.902,45.185-82.271,92.464-82.271c51.344,0,93.115,41.771,93.115,93.115 C430.958,192.436,395.328,251.899,327.919,319.032z"/>
                    </svg>
                  }

                  {totalliked ? totalliked : 0}
                </span>
                : <span></span>
                }

            </div>

        </div>
  )
}

export default SheetBody
