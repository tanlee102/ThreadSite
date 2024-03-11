import React from 'react'
import Link from 'next/link'
import {converTime} from '../../helper/converTime'
import {env_Image} from '/env'

const GroupSuggestionPost = ({darkMode,data}) => {

  return (

    <div className='contain-post-sug'>

    {data?.length > 0 ? 
    <Link href={'/news'}>
    <span class="title-block-group">
        <div>
            <label>Đề xuất</label>
                <svg viewBox="0 0 240.823 240.823">
                    <path id="Chevron_Right_1_" d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
                        l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
                        C187.881,124.315,187.881,116.495,183.189,111.816z"/>
            </svg>
        </div>
    </span>
    </Link>
    : ""
    }

    <div className='item-hub' dark-mode={String(darkMode)}>

        {data?.length > 0 ? 
        
        data.map((item, index) => (

            <div key={index} className='item-tab-sug item-tab_'>
                <div class="item-tab">

                    <div class="content-item-tab">
                        <Link href={"/threads/"+item.Thread_ID+"/1"}>
                        <div>
                        <div class="title-item-tab set-two-line-overflow">
                            <span style={{backgroundColor: "#"+item.code}}>
                                {item.TagName}
                            </span>
                            <span>
                                {item.title}
                            </span>
                        </div>
                        <div class="list-in-line">
                            <ul>
                                <li>{item.name}</li>
                                <li className='set-anchor-gray-color'>{converTime(item.time)}</li>
                            </ul>
                        </div>
                        </div>
                        </Link>
                            
                    </div>
                </div>
            </div>

        ))
        : ""
        }

    </div>

    </div>

  )
}

export default GroupSuggestionPost
