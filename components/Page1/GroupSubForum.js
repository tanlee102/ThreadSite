import React from 'react'
import Link from 'next/link'
import {converTime} from '../../helper/converTime'


const GroupSubForum = ({darkMode, data, saveSubForumBtn, userData, setDisplayModal , setTypeModal,setFormState, setItemSelection, setTempID}) => {

    return (

    <div class="block-hub" dark-mode={String(darkMode)}>

        {data.map((item, index) => (

            <>
            { item.obj.length > 0 ?
            <div key={item.key} class="block-group">
        
            
            <span class="title-block-group">
                <Link href={"/category/"+item.key}>
                <div>
                    <label>{item.name}</label>
                    <svg viewBox="0 0 240.823 240.823">
                        <path id="Chevron_Right_1_" d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
                            l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
                            C187.881,124.315,187.881,116.495,183.189,111.816z"/>
                    </svg>
                </div>
                </Link>
            </span>

            {/* } */}
            
            <div className='item-hub'> 
            

            { item.obj.map((ite, ide) => (
                        
                        <div key={ite.ID} class="item-tab block-tab set-border-box-1">
                             <Link href={"/forums/"+ite.ID}>
                            <span class="logo-block-tab">
                                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-chat-right-fill" viewBox="0 0 16 16">
                                    <path d="M14 0a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"></path>
                                </svg>
                            </span>
                            </Link>
                            <span class={userData.admin ? "fr-info-block-tab fr-info-block-tab-admin" : "fr-info-block-tab"}>
                                <Link href={"/forums/"+ite.ID}>
                                <span class="info-block-tab">
                                    <div className='set-two-line-overflow'>{ite.title} </div>
                                    <div class="list-in-line set-anchor-gray-color"><ul><li>Thread: {ite.total_thread ? ite.total_thread : 0}</li><li>Bài viết: {ite.total_post ? ite.total_post : 0}</li></ul></div>
                                </span>
                                </Link>
                                <span class="info-news-post-block-tab">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-filter-right" viewBox="0 0 16 16">
                                        <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z"></path>
                                      </svg> 
                                    </span>
                                    <Link href={"/threads/"+ite.Thread_ID+"/1"}>
                                    <div>                            
                                        <p className='set-two-line-overflow'>{ite.title_latest_thread}</p>
                                        <span className='set-anchor-gray-color'>{converTime(ite.time_latest_thread)}</span>             
                                    </div>
                                    </Link>
                                </span>
                            </span>
    
    
    
    
                            { userData.admin || userData.id == Number(ite.Owner_ID)?
                            <span class="pin-block-tab-item hide-pin-subforum" onClick={() => {setDisplayModal(true), setTypeModal(4), setTempID(ite.ID), setFormState({subforum: ite.title, intro: ite.introduce}), setItemSelection({key: item.key})}}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">    
                                    <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
                                </svg>
                            </span>
                            : ""
                            }
    
                            <span class={ ite.Is_save  ? "pin-block-tab-item chose-pin-block-tab-item" : "pin-block-tab-item"} onClick={() => saveSubForumBtn(ite.ID, ite.Is_save ? true : false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-diamond-fill" viewBox="0 0 16 16">
                                    <path  d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"></path>
                                  </svg>
                            </span>   
    
    
                         
                        </div>
           
            ))}



            </div>

            </div>


        
        : "" }
        </>
        ))
        }
    </div>

  )
}

export default GroupSubForum
