import React from 'react'
import Link from 'next/link'

const GroupMag = ({data, darkMode}) => {
  return (
    <div class="block-hub" dark-mode={String(darkMode)}>

    <div class="block-group">
    <Link href={'/mangas'}>
    <span class="title-block-group">
        <div>
            <label>Truyện</label>
                <svg viewBox="0 0 240.823 240.823">
                    <path id="Chevron_Right_1_" d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
                        l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
                        C187.881,124.315,187.881,116.495,183.189,111.816z"/>
            </svg>
        </div>
    </span>
    </Link>

    <div class="item-hub" dark-mode={String(darkMode)}>

        {data?.length > 0 ? 
            
            data.map((item, index) => (
            
            <Link key={index} href={"/mangas/"+item.ID}>
            <div className='item-mag'>
                <div className='head-item-mag'>
                    <img src={item.url_image}/>
                    <div className='label-item-mag'>
                        <div>
                        <span>{item.title}</span>
                        <span>{item?.author}</span>
                        </div>
                    </div>
                </div>
                <div className='body-item-mag'>
                    <span>Chương: {item.latestChapter}</span>
                    <span>{item.total_view}</span>
                </div>
            </div>
            </Link>

            ))
            : ""
        }

    </div>

    </div>

    <div className='co-btn-more-mag'><Link href={'/mangas'}><span>Xem thêm</span></Link></div>
    </div>
  )
}

export default GroupMag
