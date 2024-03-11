import React, { useContext, useState } from 'react'
import { env_variable } from '../../../env'
import Meta from '../../../components/Meta'
import Breadcrumb from '../../../components/Another/Breadcrumb'
import { MainContext } from '../../../components/_main'
import ContainMenuImages from '../../../components/Page9/ContainMenuImages'
import LoadMore from '../../../components/Another/LoadMore'
import { useRouter } from 'next/router'
import { loadCountPics, loadPics, makeDeleteChapPip, makeReloadPip, makeUpdateChapPip } from '../../../data/fetch'
import Link from 'next/link'
import { LayoutContext } from '../../../components/_layout'
import { checkToken } from '../../../data/axios_fetch'
import GroupImages from '../../../components/Page9/GroupImages'

const List = ({datas, count}) => {

  const breadcrumb = [{label: 'PIP', link: "/images/main"}];

  const { darkMode, userData }  = useContext(MainContext);
  const { conFirmFun } = useContext(LayoutContext);

  const [loadState, setLoadState] = useState(false);
  const [curID, setCurID] = useState(datas.length > 0 ? datas[datas.length - 1].ID : 1000000);
  const [listImage, setListImage] = useState(datas)


  const [mangaID, setMangaID] = useState('');
  const [mangaCode, setMangaCode] = useState('');
  const [start, setStart] = useState();
  const [end, setEnd] = useState();


  const router = useRouter();
  var email = String(router.query.email);
  var pip_id = String(router.query.pip_id);
  var type = String(router.query.type);


  const loadListImages = async () => {
    // checkToken(async (access_token) => {
      let datax = [];
      datax = await loadPics(curID,  pip_id, type);
      setTimeout(() => {
        if(datax.length > 0){
            setListImage([...listImage, ...datax]);
            setCurID(datax[datax.length - 1].ID);
            if(datax.length < 1) setLoadState(-1);
            else setLoadState(false);
        }else{
            setLoadState(-1);
        }
      }, 400);
    // });
  }


  const reLoadPip = async () =>{
    conFirmFun("Load", "Bạn có muốn reload toàn bộ Pip này?", () => {
      conFirmFun("Load")
      setTimeout(async() => {
        let sign = await makeReloadPip(pip_id);
        console.log(sign)
        conFirmFun()
      }, 100)
    })
  }

  const updateChapPip = async () =>{
    conFirmFun("Load", "Bạn có muốn cập nhật những chương này?", () => {
      conFirmFun("Load")
      setTimeout(async() => {
        checkToken(async (access_token) => {
          let sign = await makeUpdateChapPip(pip_id, mangaID, mangaCode, start, end, access_token);
          console.log(sign)
          conFirmFun()
        });
      }, 100)
    })
  }

  const deleteChapPip = async () =>{
    conFirmFun("Load", "Bạn có muốn xóa database chương này?", () => {
      conFirmFun("Load")
      setTimeout(async() => {
        checkToken(async (access_token) => {
          let sign = await makeDeleteChapPip(pip_id, mangaCode, start, access_token);
          console.log(sign)
          conFirmFun()
        });
      }, 100)
    })
  }


  return (
    <div>
      <Meta title={"Tài khoản | " + env_variable.LABEL_TAB_BAR}></Meta>
      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>
      
      <div class="fr-account" dark-mode={darkMode ? "true" : "false"}>
             
        <ContainMenuImages />
        <div class="setting-account">
        
          <Link href={'/images/main/list?pip_id='+pip_id+'&type='+type+'&email='+email} ><div className='pip-label'>PIP: {email}</div></Link>          
          <div onClick={() => {reLoadPip()}} style={{marginLeft: '10px', backgroundColor: 'coral'}} className='pip-label'>RE LOAD</div>
          <Link href={'/images/main/add?pip_id='+pip_id+'&type='+type+'&email='+email} ><div className='pip-label btn-pip-image-add'>Thêm ảnh</div></Link>
          
          {type == 1 ? 
          <div className='contain-update-chapter-pip'>
            <span className='input-percent-pip-image'><input value={mangaID} onChange={(e) => setMangaID(e.target.value)} placeholder='Mã truyện'  type='text'/></span>
            <span className='input-percent-pip-image'><input value={mangaCode} onChange={(e) => setMangaCode(e.target.value)} style={{width: '200px'}} placeholder='Code truyện'  type='text'/></span>
            <span className='input-percent-pip-image'><input value={start} onChange={(e) => setStart(e.target.value)} placeholder='Start'  type='number'/></span>
            <span className='input-percent-pip-image'><input value={end} onChange={(e) => setEnd(Number(e.target.value))} placeholder='End'  type='number'/></span>
            <span className='btn-pip-add-image pip-label' onClick={() => {updateChapPip()}}>LOAD CHAPs</span>
            <span className='btn-pip-add-image pip-label' onClick={() => {deleteChapPip()}}>DELETE CHAP</span>
          </div>
          : ""}

          <div className='number-images-of-pip'>Total pics - {count[0].count}</div>

          <GroupImages data={listImage} type={type}/>

        </div>    

        {listImage.length > 0 ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={() => {loadListImages()}}/> : ""}

      </div>

    </div>
  )
}





export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

  let accessToken = cookies.access_token;
  if(!accessToken) accessToken = context.res.getHeaders().access_token;

  let datas = [];

  let pip_id = -1;
  if(context.query.pip_id) pip_id = context.query.pip_id;

  let type = 0;
  if(context.query.type) type = context.query.type;

  datas = await loadPics(1000000, pip_id, type);

  let count = await loadCountPics(pip_id, type);


  return {
    props: {
      datas, count, dark_mode
    }
  }
}



export default List