import React, { useContext, useEffect, useState } from 'react';
import { loadMangaInfo } from '../../../data/fetch';
import Link from 'next/link';
import { MainContext } from '../../../components/_main';
import { useRouter } from 'next/router';

import Meta from '../../../components/Meta';
import { env_variable } from '../../../env';


const Mangas = ({datas}) => {

    const {userData} = useContext(MainContext)
    const [renderedChapters, setRenderedChapters] = useState([]);


    useEffect(() => {
      const wrapBar = document.getElementsByClassName('wrap-bar')[0];
      wrapBar.style.position = 'relative';

      if (datas?.list_chap?.length > 0) {
        const chapters = datas.list_chap.map((item, index) => (
          <Link key={index} href={'/chapters/' + item?.ID}>
            <li>
              <div>
                {datas?.info?.title} Chương {item?.Number_chap}
              </div>
              {item?.title ? <div>{item.title}</div> : ''}
            </li>
          </Link>
        ));
        setRenderedChapters(chapters);
      }

    }, []);

    const router = useRouter();
    var id = router.query.id;

  return (
    <>
    
    <Meta title={datas?.info?.title + ' | ' + env_variable.LABEL_TAB_BAR}>
      <meta name="description" content={datas?.info?.intro}/>
      <meta name="keywords" content={String(datas?.info?.intro).split(" ").join(", ")}/>

      <meta property="og:title" content={datas?.info?.title}/>
      <meta property="og:image" content={datas?.info?.url_image}/>
      <meta property="og:description" content={datas?.info?.intro}/>
    </Meta>

    <div className='contain-manga'>
        <div className='contain-list-of-chap'>
        { userData.admin ? 
            <Link href={'/mangas/'+id+'/add?title='+datas?.info?.title} ><span className='move-add-chapter'>Thêm chương mới</span></Link>
        : ""}
            <div id='label-list-of-chap'>DANH SÁCH CÁC CHƯƠNG</div>
            <div>
                <ul className='list-of-chap'>
                  {renderedChapters}
                  {/* {datas?.list_chap?.length > 0 ? 
          
                    datas.list_chap.map((item, index) => (
                      <Link key={index} href={"/chapters/"+item?.ID}>
                      <li>
                        <div>{datas?.info?.title} Chương {item?.Number_chap}</div>
                        {item?.title ? 
                          <div>{item.title}</div>
                        : ""}
                      </li>
                      </Link>
                    ))

                    : ""
                  } */}
                </ul>
            </div>
        </div>
        <div className='wrap-info-of-manga'>
          <div className='contain-info-of-manga'>
            <div>
                <img src={datas?.info?.url_image}/>
              </div>
          
              <div>
                  <div>{datas?.info?.title}</div>
                  <div>{datas?.info?.intro}</div>
              </div>
          </div>
        </div>
    </div>

    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

  const datas = await loadMangaInfo(String(context.params.id));

  return { 
    props: 
    { 
      datas, dark_mode
    },
  }
}

export default Mangas