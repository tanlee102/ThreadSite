import { converTime } from '../../helper/converTime'

import React from 'react'
import OptionPanelPart from './OptionPanelPart'
import Link from 'next/link'
import { env_Image } from '../../env'


const MemberSection = ({darkMode,data,userData,conFirmFun}) => {

  return (
    <div className='manage-hub member-hub' dark-mode={darkMode ? "true" : "false"}>
    {data.map((ite, index) => ( 

        <div key={index} class="item-tab member-tab set-border-box-1 set-margin-top-1px">
            <div class="content-member-tab">
                <Link href={'/u/'+ite.user_name}>
                <div class="ava-item-tab">
                    <a href="">
                        <img src={env_Image(ite.thumbnail)} alt=""/>
                    </a>
                </div>
                </Link>
                <div class="content-item-tab">
                    <div class="title-item-tab set-bold set-black-white">{ite.name}</div>
                    <div class="list-in-line set-anchor-gray-color">
                        <ul>
                            <li>Tham gia: {converTime(ite.date_join)} </li>
                            <li>email: {ite.email}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <OptionPanelPart conFirmFun={conFirmFun} isBan={ite.isBan} isBlock={ite.isBlock} idMember={ite.ID}/>

        </div>

    ))}

    </div>
  )
}

export default MemberSection
