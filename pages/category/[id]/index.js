import Meta from '../../../components/Meta';
import Breadcrumb from '../../../components/Another/Breadcrumb';

import React, { useContext, useState } from "react";
import Router, { useRouter } from 'next/router';

import { loadListSubForum} from '../../../data/fetch';
import { saveSubForum, checkToken} from '../../../data/axios_fetch';
import { addSubForum } from '../../../callapi/subforum';

import HeadGroup from '../../../components/Another/HeadGroup';
import Modal from '../../../components/Another/Modal';

import CreateModalForm from '../../../components/Another/CreateModalForm';
import ButtonModalTopic from '../../../components/Page1/ButtonModalTopic';
import ProfileSubMenu from '../../../components/Page5/ProfileSubMenu';
import ListSubForum from '../../../components/Page1/ListSubForum';
import LoadMore from '../../../components/Another/LoadMore';

import { MainContext } from '../../../components/_main';
import { LayoutContext } from '../../../components/_layout';
import { env_variable } from '../../../env';

export default function Category ({datasubforum}) {

    const subforum_per_page = env_variable.RANGESUBFORUM;

    const router = useRouter();
    var id = Number(router.query.id);

    const breadcrumb = datasubforum[1] ? [{label: id === 0 ? "Pin" : datasubforum[1][0]?.title, link: "/category/"+ ( id === 0 ? 0 : datasubforum[1][0]?.ID)}] : [{label: "Pin", link: "/category/0"}]

    const {conFirmFun, setDisplayLoginModel}  = useContext(LayoutContext); 
    const {darkMode, userData}  = useContext(MainContext); 

    const [data, setData] = useState(datasubforum[0]);
  
    var sorting_setting = router.query.sorting_setting;
    if(!sorting_setting) sorting_setting = 'top_group';
    
    let listMenu = [
        {
          param: 'top_group',
          label: 'Top All Time',
        },
        {
          param: 'chronological',
          label: 'Nhóm mới',
        },
    ]
    
    var urlProfileMenu = '/category/'+id+'?sorting_setting=';
    var objtemp = listMenu.find(x => x.param === sorting_setting);

    const [choseMenu, setChoseMenu] = useState(listMenu.indexOf(objtemp));

    const [displayModel, setDisplayModel] = useState(true);
    const [typeModal, setTypeModal] = useState(0);


    const labelState = [{label: 'Nhập tên Nhóm'}, {label: 'Giới thiệu', tag: 'textarea'}];
    const initialState = {
      subforum: "",
      intro: "",
    };
  
    const [formState, setFormState] = useState(initialState);

    const [loadState, setLoadState] = useState(false);
    const [page, setPage] = useState(0);



    const setAddSubForum = () =>{
      if(userData.logged){
        addSubForum(conFirmFun, formState.subforum, id, formState.intro, (success, result) => {
          if(success){
            setFormState({...formState, subforum: "", intro: ""})
            Router.push('/forums/'+result.data[0].ID)
          }
        })
      }else{
        setDisplayLoginModel(true);
      }
    }


    const saveSubForumBtn = (index,ID_SubForum,issaved) => {
      if(userData.id != "_" && userData.id)
      saveSubForum({
        member_id: userData.id,
        subforum_id: ID_SubForum,
        is_save: issaved
      },(code, result) => {
        if(code == 1){
          let newArr = [...data];
          newArr[index]['Is_save'] = !issaved;
          setData(newArr);
        }else{
          alert('Đã xảy ra lỗi hệ thống!!')
        }
      })
      else setDisplayLoginModel(true);
    }
  

    const loadListSubForumBtn = async () => {
      if(data.length>0){

        checkToken(async (accessToken) => {
          let datas = (await loadListSubForum(sorting_setting, id, data[data.length-1].ID ,page+1, accessToken))[0];
          setTimeout(() => {

            if(datas.length > 0){
              setData([...data, ...datas])
              setPage(page+1);
              if(subforum_per_page <= datas.length) setLoadState(false);
              else setLoadState(-1);
              
            }else{
              setLoadState(-1);
            }
          },400);
        })

      }else{
        setLoadState(-1);
      }
    }



  return (
    <>
    <Meta title={"Thể loại - " + (datasubforum[1] ? id !== 0 ? datasubforum[1][0]?.title :  "Pin" : "") }></Meta>

    <Breadcrumb 
    datas={breadcrumb} 
    darkMode={darkMode}/>

    { id == 0 ? "" : 
    <>
      <HeadGroup 
              link={false} 
              button={'Tạo nhóm'} 
              darkMode={darkMode} 
              setDisplayModal={setDisplayModel} 
              setTypeModal={setTypeModal}
        />
        <ProfileSubMenu listMenu={listMenu} urlMenu={urlProfileMenu} choseMenu={choseMenu}  setChoseMenu={setChoseMenu} />
    </>
    }

    <ListSubForum 
          data={data} 
          darkMode={darkMode} 
          saveSubForumBtn={saveSubForumBtn} 
          userData={userData} />

    {subforum_per_page <= data?.length ? <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={loadListSubForumBtn}/> : "" }

    {typeModal==1 ? 
          <Modal 
              displayModel={displayModel} 
              setDisplayModel={setDisplayModel} 
              title={'Thêm nhóm'} 
              displayfooter={true}
              body={
                  <CreateModalForm 
                        formState={formState} 
                        labelState={labelState} 
                        setFormState={setFormState} 
                  />} 
              footer={
                  <ButtonModalTopic 
                        addBtn={setAddSubForum}
                  />}
          /> 
    : ""}

    </>
  )
}


export async function getServerSideProps(context) {
    const cookies = context.req.cookies;
    let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

    let accessToken = cookies.access_token;
    if(!accessToken) accessToken = context.res.getHeaders().access_token;

    let sorting_setting = '-';
    if(context.query.sorting_setting) sorting_setting = context.query.sorting_setting;

    const datasubforum = await loadListSubForum(sorting_setting, context.params.id, -1, 0,accessToken);
  
    return {
      props: 
      { 
        datasubforum, dark_mode
      },
    }
}