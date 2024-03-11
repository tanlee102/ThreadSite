import Link from 'next/link'
import React, { useContext } from 'react'
import {converTime} from '../../helper/converTime'
import { MainContext } from '../_main'
import {env_Image} from '/env'

const NotificationAccount = ({darkMode, data}) => {

    const { userData } = useContext(MainContext)

  return (
    <div class="member-hub notification-hub form-account" dark-mode={darkMode ? "true" : "false"}>

    {
        data.map((ite, index) => (

        <div key={index} class="item-tab notification-tab">

            <Link href={"/u/"+ite.user_name}>
            <div class="ava-notification-tab">
                <span>
                    <img src={env_Image(ite.thumbnail)} alt=""/>
                </span>
            </div>
            </Link>
    

            <div class="content-notification-tab">

                {(ite.name === 'Post' || ite.name === 'Thread')?
                <Link href={"/threads/data/go?post_id="+ite.post_entityid}>
                <div>
                    <div class="text-notification-tab">
                        <a>{ite.name_actor}</a>
                        <span>{ite.total_actor > 1 ? " và " : ""} </span>
                        <a>{ite.total_actor > 1 ? ((Number(ite.total_actor) - 1) + " người khác ") : ""} </a>
                        <span>{ite.first_state} </span>
                        <a>{ite.Thread_Title} </a>
                        <span>{ite.last_state} </span>
                    </div>
                    <div class="time-notification-tab">
                        {converTime(ite.update_time)}
                    </div>
                </div>
                </Link>
                :""
                }


                {(ite.name === 'SubForum')?
                <Link href={ite.post_entityid ? "/threads/data/go?post_id="+ite.post_entityid : "/forums/"+ite.EntityID}>
                <div>
                    <div class="text-notification-tab">
                        <a>{ite.name_actor}</a>
                        <span>{ite.total_actor > 1 ? " và " : ""} </span>
                        <a>{ite.total_actor > 1 ? ((Number(ite.total_actor) - 1) + " người khác ") : ""} </a>
                        <span>{ite.first_state} </span>
                        <a>{ite.SubForum_Title} </a>
                        <span>{ite.last_state} </span>
                    </div>
                    <div class="time-notification-tab">
                        {converTime(ite.update_time)}
                    </div>
                </div>
                </Link>
                :""
                }


                {(ite.name === 'Follower') ?
                <Link href={"/u/"+ite.user_name}>
                <div>
                    <div class="text-notification-tab">
                        <a>{ite.name_actor}</a>
                        <span>{ite.total_actor > 1 ? " và " : ""} </span>
                        <a>{ite.total_actor > 1 ? ((Number(ite.total_actor) - 1) + " người khác ") : ""} </a>
                        <span>{ite.first_state} </span>
                    </div>
                    <div class="time-notification-tab">
                        {converTime(ite.update_time)}
                    </div>
                </div>
                </Link>
                :""
                }


                {(ite.name === 'msgs') ?
                <Link href={"/u/"+userData.user_name}>
                <div>
                    <div class="text-notification-tab">
                        <a>{ite.name_actor}</a>
                        <span>{ite.total_actor > 1 ? " và " : ""} </span>
                        <a>{ite.total_actor > 1 ? ((Number(ite.total_actor) - 1) + " người khác ") : ""} </a>
                        <span>{ite.first_state} </span>
                    </div>
                    <div class="time-notification-tab">
                        {converTime(ite.update_time)}
                    </div>
                </div>
                </Link>
                :""
                }

            </div>

        </div>
        
        ))
    }


  </div>
  )
}

export default NotificationAccount
