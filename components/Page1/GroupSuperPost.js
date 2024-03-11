import React from 'react'
import Link from 'next/link'
import { converTime } from '../../helper/converTime'
import {env_Image} from '/env'

const GroupSuperPost = ({darkMode, data}) => {
  return (
    <div className='block-hub'  dark-mode={String(darkMode)}>
      <div className='block-group'>
        <Link href={'/news'}>
          <span class="title-block-group">
              <div>
                  <label>Hot</label>
                      <svg viewBox="0 0 240.823 240.823">
                          <path id="Chevron_Right_1_" d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
                              l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
                              C187.881,124.315,187.881,116.495,183.189,111.816z"/>
                  </svg>
              </div>
          </span>
          </Link>

          <div className='block-super-post'>
            
            <div className='super-post-hub' dark-mode={String(darkMode)}>



            {data?.length > 0 ?
            data.map((item, index) => (


                <div key={index} className='item-super-post'>

                    <Link href={"/threads/"+item.ID+"/1"}>
                    <div className='image-super-post'>
                        <div>
                            <img src={item.image} rel="preload" />
                        </div>
                    </div>
                    </Link>
                    <div className='title-super-post'>

                        <Link href={"/forums/"+item.IDSubForum}>
                        <div>{item.SubForumName}</div>
                        </Link>

                        <Link href={"/threads/"+item.ID+"/1"}>
                        <div>{item.title}</div>
                        </Link>

                        <Link href={"/u/"+item.user_name+"/"}>
                        <div class="list-in-line icon-list-in-line">
                            <ul>
                       
                                <li> <img src={env_Image(item.thumbnail)}/>{item.name}</li>
                                <li class="set-anchor-gray-color">{converTime(item.time)}</li>
                            </ul>
                        </div>
                        </Link>
            
                    </div>

                </div>

            )) 
            : ""}

            </div>

          </div>

      </div>
    </div>
  )
}

export default GroupSuperPost
