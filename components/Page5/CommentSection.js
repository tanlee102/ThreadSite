import React from 'react'
// import $ from 'jquery'; 
import { useState, useEffect } from 'react';
import {env_Image} from '/env'

import {converTime} from '../../helper/converTime'
import Link from 'next/link';


const CommentSection = ({textComment,setTextComment,addMsgBtn, datas, deleteMsgBtn, deleteReMsgBtn, addReMsgBtn, loadReMsgsBtn, userData, allowed, isYourProfile}) => {

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            event.stopPropagation();
            event.preventDefault();
            addMsgBtn();
        }
    };
    const handleKeyDown_ = (event, ID, index) => {
        if (event.key === 'Enter') {
            event.stopPropagation();
            event.preventDefault();
            addReMsgBtn(ID, index);
        }
    };

    // const editInput = () => {
    //     $('textarea').each(function () {
    //         this.setAttribute('style', 'height:' + 29 + 'px; overflow-y:hidden;');
    //     }).on('input', function () {
    //         this.style.height = 'auto';
    //         this.style.height = (this.scrollHeight) + 'px';
    //     });
    // }

    const editInput = () => {
        const textareas = document.querySelectorAll('textarea');
      
        function adjustTextareaHeight(textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      
        textareas.forEach((textarea) => {
          textarea.style.height = '29px';
          textarea.style.overflowY = 'hidden';
      
          textarea.addEventListener('input', () => {
            adjustTextareaHeight(textarea);
          });
        });
    };

    useEffect(() => {
        editInput();
      }, []);

      useEffect(() => {
        editInput();
      }, [datas]);

    const [curID, setCurID] = useState(0);

return (
<> 

    {allowed ? 
    <div style={{display: userData.logged ? "flex" : "none"}} class="item-input-comment">
        <span class="fr-image-item-comment">
            <img src={env_Image(userData.avatar)} alt=""/>
        </span>
        <span>
            <textarea onKeyDown={handleKeyDown} value={textComment} onChange={(e) => setTextComment(String(e.target.value))} placeholder="Viết bình luận..." rows="1"></textarea>
            <button onClick={() => addMsgBtn()}>Viết</button>
        </span>
    </div>
    : ""
    }
    

    {
    datas.map((ite, index) => (   

    <>
      {ite ? 
    
        <div key={index} class="item-comment">

            <Link href={"/u/"+ite.user_name+"/"}>
            <span class="fr-image-item-comment">
                <img src={env_Image(ite.thumbnail ? ite.thumbnail : userData.avatar)} alt=""/>
            </span>
            </Link>
            <span class="fr-text-item-comment">
    
                <div class="list-in-line ">
                    <ul>
                        <Link href={"/u/"+ite.user_name+"/"}>
                            <li className='set-bold'> {ite.name} </li>
                        </Link>
                        <li className='set-slight'> {converTime(ite.time)} </li>
                    </ul>
                </div>
    
                <div class="fr-ms-item-comment">

                    <span>{ite.text}</span>
                    <span>

                        <span>
                            <p>Báo cáo</p>
                        </span>

                        { Number(userData.id) === Number(ite.Member_ID) || userData.admin > 0  || isYourProfile ? 
                        <span onClick={() => deleteMsgBtn(ite.ID, index)} className='delete-btn-ms-item-comment'>
                            <svg  viewBox="0 -1.5 19 19">
                            <path d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z"/>
                            </svg>
                            <p>Xóa</p>
                        </span>
                        : ""
                        }  
                        <span onClick={() => {setCurID(ite.ID)}}>
                            <svg viewBox="1 1 22 22" xmlns="http://www.w3.org/2000/svg"><path d="M21.71,4.72,19.28,2.29a1,1,0,0,0-1.41,0L12.29,7.87a1,1,0,0,0-.29.71V11a1,1,0,0,0,1,1h2.42a1,1,0,0,0,.71-.29l5.58-5.58A1,1,0,0,0,21.71,4.72ZM15,10H14V9l4.58-4.58,1,1Zm4,2h0a1,1,0,0,0-1,1,7,7,0,0,1-7,7H5.41l.64-.63a1,1,0,0,0,0-1.42A7,7,0,0,1,11,6a1,1,0,0,0,0-2h0A9,9,0,0,0,4,18.62L2.29,20.29a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h8a9,9,0,0,0,9-9A1,1,0,0,0,19,12Z"/></svg>                            
                            <p>Trả lời</p>
                        </span>

                    </span>


                    {ite.isMore == true ?
                    <span className='btn-more-reply-comment' onClick={() => {loadReMsgsBtn(ite.ID, ite.curLoadID, index)}}>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 21 21" enable-background="new 0 0 512 512" >
                            <path d="M9 16h7.2l-2.6 2.6L15 20l5-5-5-5-1.4 1.4 2.6 2.6H9c-2.2 0-4-1.8-4-4s1.8-4 4-4h2V4H9c-3.3 0-6 2.7-6 6s2.7 6 6 6z"/>
                        </svg> 
                        <span>xem thêm trả lời</span>
                    </span>
                    :""}


                    <span>
                        {ite.replydata.length > 0 ?
                        ite.replydata.map((item, index_) => (  
                        <>
                        <div class="item-comment item-reply-comment">
                            <Link href={"/u/"+item.user_name+"/"}>
                            <span class="fr-image-item-comment">
                                <img src={env_Image(item.thumbnail ? item.thumbnail : userData.avatar)} alt=""/>
                            </span>
                            </Link>
                            <span class="fr-text-item-comment">
                                <div class="list-in-line">
                                    <ul>
                                        <Link href={"/u/"+item.user_name+"/"}>
                                        <li class="set-bold">{item.name} </li>
                                        </Link>
                                        <li class="set-slight">{converTime(item.time)}</li>
                                    </ul>
                                </div>
                                
                                <div class="fr-ms-item-comment">


                                    <span>{item.text}</span>
                                    <span> 
                                        
                                        <span>
                                            <p>Báo cáo</p>
                                        </span>
                                        { Number(userData.id) === Number(item.Member_ID) || userData.admin > 0 || isYourProfile ? 
                                        <span className='delete-btn-ms-item-comment' onClick={() => deleteReMsgBtn(ite.ID, item.ID_, index, index_)}>
                                            <svg  viewBox="0 -1.5 19 19">
                                            <path d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z"/>
                                            </svg>
                                            <p>Xóa</p>
                                        </span>
                                        : ""}  

                                    </span>
                                </div>
                            </span>
                        </div>
                        </>
                        )):""}

                        {allowed ? 
                        <div class="item-input-comment item-input-reply-comment" style= {{display: curID === ite.ID ? 'flex' : 'none'}}>
                            <span class="fr-image-item-comment">
                                <img src={userData.avatar} alt=""/>
                            </span>
                            <span>
                                <textarea  onKeyDown={(e) => handleKeyDown_(e, ite.ID, index)} id={curID === ite.ID ? 're-comment-input' : ''}  placeholder="Viết bình luận..."  rows="1"></textarea>
                                <button onClick={() => {addReMsgBtn(ite.ID, index)}}>Viết</button>
                            </span>
                        </div>
                        :""}
                        
                    </span>
                
        
                </div>

            </span>
            
        </div>

    : ""}  
    </>

    ))}

</>
)}

export default CommentSection
