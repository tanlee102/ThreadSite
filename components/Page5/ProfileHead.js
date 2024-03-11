import React, {useState, useEffect, useContext} from 'react'
import moment from 'moment'
import Link from 'next/link'
import {useOutsideClick} from '../../helper/useOutsideClick'
import PopOutMemberPanel from '../Another/PopOutMemberPanel'
import {env_Image} from '/env'
import { followMember } from '../../data/axios_fetch'
import { LayoutContext } from '../_layout'
import Meta from '../Meta'
import Image from 'next/image'
import { env_variable } from '../../env'


const ProfileHead = ({headinfo, userData, id_wall, conFirmFun}) => {

    const { setDisplayLoginModel } = useContext(LayoutContext)

    let isYourProfile = Number(userData.id)===Number(id_wall);

    const followMemberBtn = (isfollowed) =>{
        if(userData.logged){
          followMember({
            member_id: id_wall,
            isfollowed: !isfollowed
          },(code, result) => {
            if(code == 1){
    
              setData(prevState => ({
                ...prevState,
                followed: !isfollowed
              }));
            
            }else{
              alert('Đã xảy ra lỗi hệ thống!!')
            }
          })
        }else{
          setDisplayLoginModel(true)
        }
      }


    const [data, setData] = useState(headinfo);
    useEffect(() => {
      setData(headinfo);
    }, [])

    const [optionPanelShow, setOptionPanelShow] = useState(false);

    const handleClickOutside = () => {
        setOptionPanelShow(false);
    };
    const ref = useOutsideClick(handleClickOutside);
  
    const handleClick = () => {
        setOptionPanelShow(true);
    };
  
    const handleHeaderClick = (event) => {
      event.stopPropagation();
    };

    const myLoader = () => {
      return env_Image(data.avatar)
    }



  return (
    <>

    <Meta title={String(data.name) + " | " + env_variable.LABEL_TAB_BAR}>
      
        <meta name="description" content={String("Hồ sơ của " + data.name + " " + data.quote)}/>

        <meta property="og:title" content={String(data.name)}/>
        <meta property="og:image" content={env_Image(data.avatar)}/>
        <meta property="og:description" content={String("Hồ sơ của " + data.name + " " + data.quote)}/>
    </Meta>

    <div class="profile-head-tab">

        <div class="co-ava-profile-head-tab">
          <div>
            <div className='ava-profile-head-tab'>
              <div className={'image-ava-profile-head-tab-container'}>
                <Image loader={myLoader} src="me.png" layout="fill" objectFit='cover' className={'image-ava-profile-head-tab'} />
              </div>
            </div>
          </div>
        </div>

    
        <div class="co-profile-head-tab">

            <div>{data.name}</div>
            
            
            <div style={{display: data.quote ? "flex" : "none"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-person-fill" viewBox="0 -5 34 34"><path d="m31.2 0h-7.2l-4.8 9.6v14.4h14.4v-14.4h-7.2zm-19.2 0h-7.2l-4.8 9.6v14.4h14.4v-14.4h-7.2z"/></svg>
                <span>{data.quote}</span> 
            </div>

            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16"><path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"></path></svg>
                <span>Ngày tham gia: { moment(new Date(data.date_join)).format("DD/MM/YYYY")}</span>
            </div>

            <div>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-calendar-check" viewBox="18 16 65 65"><path d="M49.2,21.7c-16.6,0-30,12.5-30,28c0,5,1.4,9.6,3.8,13.7c0.3,0.5,0.4,1.1,0.2,1.6l-2.8,8.9 c-0.5,1.6,1,3,2.6,2.5l8.8-3.1c0.6-0.2,1.2-0.1,1.7,0.2c4.6,2.7,10,4.2,15.8,4.2c16.6,0,30-12.5,30-28 C79.1,34.2,65.7,21.7,49.2,21.7z"/></svg>
                        <span>{data.total_post}</span>
                    <svg xmlns="http://www.w3.org/2000/svg"x="0px" y="0px" viewBox="-4 -20 355 355"> <path d="M254.791,33.251c-46.555,0-76.089,51.899-83.079,51.899c-6.111,0-34.438-51.899-83.082-51.899 c-47.314,0-85.947,39.021-88.476,86.27c-1.426,26.691,7.177,47.001,19.304,65.402c24.222,36.76,130.137,125.248,152.409,125.248 c22.753,0,127.713-88.17,152.095-125.247c12.154-18.483,20.731-38.711,19.304-65.402 C340.738,72.272,302.107,33.251,254.791,33.251"/></svg>
                        <span>{data.total_like}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-calendar-check" viewBox="-10 -10 336 336"><path id="XMLID_351_" d="M52.25,64.001c0,34.601,28.149,62.749,62.75,62.749c34.602,0,62.751-28.148,62.751-62.749 S149.602,1.25,115,1.25C80.399,1.25,52.25,29.4,52.25,64.001z"/><path id="XMLID_352_" d="M217.394,262.357c2.929,2.928,6.768,4.393,10.606,4.393c3.839,0,7.678-1.465,10.607-4.394 c5.857-5.858,5.857-15.356-0.001-21.214l-19.393-19.391l19.395-19.396c5.857-5.858,5.857-15.356-0.001-21.214 c-5.858-5.857-15.356-5.856-21.214,0.001l-30,30.002c-2.813,2.814-4.393,6.629-4.393,10.607c0,3.979,1.58,7.794,4.394,10.607 L217.394,262.357z"/><path id="XMLID_439_" d="M15,286.75h125.596c19.246,24.348,49.031,40,82.404,40c57.896,0,105-47.103,105-105 c0-57.896-47.104-105-105-105c-34.488,0-65.145,16.716-84.297,42.47c-7.764-1.628-15.695-2.47-23.703-2.47 c-63.411,0-115,51.589-115,115C0,280.034,6.716,286.75,15,286.75z M223,146.75c41.355,0,75,33.645,75,75s-33.645,75-75,75 s-75-33.645-75-75S181.644,146.75,223,146.75z"/></svg>
                    <span>{data.total_follower}</span>
                </span>
            </div>



            <div class="btn-profile-head-tab">

                <div>

                    { isYourProfile || !userData.logged ? "" :
                    <span class="follow-button unfollow-button option-profile-head-button" onClick={() => handleClick()}>
                        <svg version="1.1"  x="0px" y="0px" viewBox="0 0 472.576 472.576">
                            <circle cx="65.142" cy="236.288" r="65.142"/>
                            <circle cx="236.308" cy="236.288" r="65.142"/>
                            <circle cx="407.434" cy="236.288" r="65.142"/>
                        </svg>
                    </span>
                    }

                    {isYourProfile ? 
                        <Link href="/account/detail"><span class="follow-button unfollow-button">Chỉnh sửa</span></Link> 
                        :
                        <span onClick={() => followMemberBtn(data.followed)} class={data.followed ?  "follow-button unfollow-button" : "follow-button"}>
                            {data.followed ?   "Bỏ theo dõi" : "Theo dõi"}
                        </span>
                    }

                    { isYourProfile ? 
                        "" 
                        :
                        <div className={userData.admin ? "pop-out-member-panel pop-out-member-panel-admin" : "pop-out-member-panel"} ref={ref} style={{display: optionPanelShow ? "flex" : "none"}}>
                            <PopOutMemberPanel isAdmin={userData.admin} conFirmFun={conFirmFun} isBan={data.isBan} isBlock={data.isBlock} idMember={data.Member_ID}/>
                        </div>
                    }

                </div>

            </div>

        </div>

    </div>

    </>

  )
}

export default ProfileHead
