import  { useState, useContext }  from 'react'
import { useRouter } from 'next/router'
import Meta from '../../components/Meta'

import Breadcrumb from '../../components/Another/Breadcrumb';

import { loadMangaLatestUpdate, loadMangaTop } from '../../data/fetch'
import ProfileSubMenu from '../../components/Page5/ProfileSubMenu';
import LoadMore from '../../components/Another/LoadMore';
import { MainContext } from '../../components/_main';
import { env_variable } from '../../env';
import Link from 'next/link';


const News = ({datas}) => {

  const breadcrumb = [{label: 'Truyện', link: '/mangas/'}];

  const {darkMode}  = useContext(MainContext); 

  const router = useRouter()
  var sorting_setting = 'chronological'
  if(router.query?.sorting_setting) sorting_setting = router.query.sorting_setting;

  const [listManga, setListManga] = useState(datas)

  var listMenu = [
    {
      param: 'chronological',
      label: 'Mới cập nhật',
    },
    {
      param: 'total_view',
      label: 'Đọc nhiều nhất'
    }
  ]
  var urlProfileMenu = '/mangas?sorting_setting=';
  var objtemp = listMenu.find(x => x.param === sorting_setting);


  const [loadState, setLoadState] = useState(false);
  const [page, setPage] = useState(1);

  const [choseMenu, setChoseMenu] = useState(listMenu.indexOf(objtemp));


  const RangeMangas = 12;

  const loadListMangaBtn = async () => {

      let datas = [];
      if(sorting_setting==='total_view'){
        
        datas = await loadMangaTop(page+1);
        setTimeout(() => {
          if(datas.length > 0){
            setListManga([...listManga, ...datas]);
            setPage(page+1);
            if(datas.length < RangeMangas) setLoadState(-1);
            else setLoadState(false);
          }else{
            setLoadState(-1);
          }
        }, 400);

      }else if(sorting_setting==='chronological'){

        datas = await loadMangaLatestUpdate(page+1);
        setTimeout(() => {
          if(datas.length > 0){
            setListManga([...listManga, ...datas]);
            if(datas.length < RangeMangas) setLoadState(-1);
            else setLoadState(false);
          }else{
            setLoadState(-1);
          }
        }, 400);
        
      }

  }



  return (
    <>
      <Meta title={"Truyện | " + env_variable.LABEL_TAB_BAR}></Meta>
      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

      <ProfileSubMenu listMenu={listMenu} urlMenu={urlProfileMenu} choseMenu={choseMenu}  setChoseMenu={setChoseMenu} />

      <div class="item-mag-hub" dark-mode={String(darkMode)}>

        {listManga?.length > 0 ? 
            
            listManga.map((item, index) => (
            
            <Link key={index} href={"/mangas/"+item.ID}>
            <div className='item-mag_'>
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

      {RangeMangas > listManga?.length ? "" : <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={() => {loadListMangaBtn()}}/>} 

      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>
    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

  let datas = [];

  let sorting_setting = '';
  if(context.query.sorting_setting) sorting_setting = context.query.sorting_setting;

  if(sorting_setting === 'total_view'){
    datas = await loadMangaTop(1);
  }else{
    datas = await loadMangaLatestUpdate(1);
  }

  return {
    props: {
      datas, dark_mode
    }
  }
}

export default News
