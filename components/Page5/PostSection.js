import Link from 'next/link'
import React from 'react'
import {converTime} from '../../helper/converTime'
import {env_Image} from '/env'

const PostSection = ({data, darkMode}) => {
  return (
    <div className='item-hub' dark-mode={String(darkMode)}>


    {data.map((ite, index) => ( 
    
    <Link key={index} href={"/threads/data/go?post_id="+ite.ID}>
        <div class="item-tab set-border-box-1 set-margin-top-1px">
        <span class="ava-item-tab">
            <img src={env_Image(ite.thumbnail)} alt=""/>
        </span>

        <span className="content-item-tab">
            <div class="title-item-tab">
                <span style={{backgroundColor: "#"+ite.code}} >
                    {ite.TagName}
                </span>
                <span>
                    {ite.ThreadName}
                </span>
            </div>
            <div class="extra-item-tab extra-item-tab-blue set-one-line-overflow">
                    {ite?.content?.replace(/<[^>]*>/g, '')}            
            </div>
            <div class="list-in-line set-anchor-gray-color">
                <ul>
                    <li>#{ite.rank} </li>
                    <li>{converTime(ite.time)}</li>
                    <li>{ite.SubForumName}</li>
                </ul>
            </div>
        </span>
    </div>
    </Link>

    ))}


    </div>
  )
}

export default PostSection
