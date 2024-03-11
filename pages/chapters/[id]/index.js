import React, { useEffect, useState } from 'react';
import { loadChapter } from '../../../data/fetch';
import Link from 'next/link';
import Meta from '../../../components/Meta';

const Chapters = ({datas}) => {

    useEffect(() => {
        const wrapBar = document.getElementsByClassName('wrap-bar')[0];
        wrapBar.style.position = 'relative';
      }, []);

      
  return (

    <>

    <Meta title={datas?.title_manga?.title + ' Chương ' + datas?.data_chap?.Number_chap}>
      <meta name="description" content={datas?.title_manga?.intro + datas?.title_manga?.title + ' Chap ' + datas?.data_chap?.Number_chap}/>
      <meta name="keywords" content={datas?.title_manga?.author + String(datas?.title_manga?.intro).split(" ").join(", ") + datas?.title_manga?.title + ' Chap ' + datas?.data_chap?.Number_chap}/>

      <meta property="og:title" content={datas?.title_manga?.title + ' Chap ' + datas?.data_chap?.Number_chap}/>
      <meta property="og:image" content={datas?.title_manga?.url_image}/>
      <meta property="og:description" content={datas?.title_manga?.intro}/>
    </Meta>

    <div className='contain-chapter'>
      
        <div className='title-chapter'>{datas?.title_manga?.title} - Chương {datas?.data_chap?.Number_chap}</div>

        <div className='button-chapter'>
            <div>
            {datas?.pre_chap ? 
            <Link href={'/chapters/'+datas?.pre_chap?.ID}><span>Trước</span></Link>
            : ""}
            <Link href={'/mangas/'+datas?.title_manga?.ID}><span>Danh sách chương</span></Link>
            {datas?.nex_chap ? 
            <Link href={'/chapters/'+datas?.nex_chap?.ID}><span>Sau</span></Link>
            : ""}
            </div>
        </div>

        <div className='list-url-chapter'>
        {datas?.data_chap?.content?.length > 0 ? 
          datas?.data_chap?.content.map((item, index) => (
            <div key={index} class="url-chapters">
              <div class="lds-facebook"><div></div><div></div><div></div></div>
              <img src={item} loading="lazy" />
            </div>
          ))
        : "" }

        </div>

        <div className='button-chapter'>
        <div>
            {datas?.pre_chap ? 
            <Link href={'/chapters/'+datas?.pre_chap?.ID}><span>Trước</span></Link>
            : ""}
            <Link href={'/mangas/'+datas?.title_manga?.ID}><span>Danh sách chương</span></Link>
            {datas?.nex_chap ? 
            <Link href={'/chapters/'+datas?.nex_chap?.ID}><span>Sau</span></Link>
            : ""}
            </div>
        </div>

    </div>

    </>
  )
}

export async function getServerSideProps(context) {
    const cookies = context.req.cookies;
    let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  
  
    const datas = await loadChapter(String(context.params.id));
  
    return { 
      props: 
      { 
        datas, dark_mode
      },
    }
  }

export default Chapters
