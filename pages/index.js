import React, { useContext, useEffect, useState } from "react";
import Router, { useRouter } from 'next/router';

import { loadColorList, loadTagThread, loadCategory, loadTopSubForum, loadLatestThread, loadToken} from '../data/fetch'
import { saveSubForum} from '../data/axios_fetch'
import { addSubForum, modernizeSubForum, removeSubForum } from '../callapi/subforum';

import { MainContext } from "../components/_main";
import { LayoutContext } from "../components/_layout";
import Meta from '../components/Meta';
import Breadcrumb from '../components/Another/Breadcrumb';

import Modal from '../components/Another/Modal';
import CreateModalForm from '../components/Another/CreateModalForm';
import ButtonModalTopic from '../components/Page1/ButtonModalTopic';
import ButtonModalUpdate from '../components/Page1/ButtonModalUpdate';

import HeadGroup from '../components/Another/HeadGroup';
import GroupHeader from '../components/Page1/GroupHeader';

import GroupLatestPost from '../components/Page1/GroupLatestPost';
import GroupSubForum from '../components/Page1/GroupSubForum';

export default function Home({ colorlist, tagthread, category, subforum, latest}) {

  const breadcrumb = [{label:'Trang chủ', link: "/"}];
  const router = useRouter();

  const {conFirmFun, setDisplayLoginModel}  = useContext(LayoutContext);
  const {darkMode ,userData} = useContext(MainContext)

  const [displayModel, setDisplayModel] = useState(false);
  const [typeModal, setTypeModal] = useState(0);

  const [tempID, setTempID] = useState(0);

  
  const labelState1 = [{label: 'Nhập tên Nhóm'}, {label: 'Giới thiệu', tag: 'textarea'}];
  const initialState1 = {
    subforum: "",
    intro: "",
  };


  let category_ = category;
  if(category_.find(o => o.key === 0)) category_.shift();
  const [formSelection, setFormSelection] = useState(category_);
  const [itemSelection, setItemSelection] = useState({key: formSelection[0]?.key});
  const [formState1, setFormState1] = useState(initialState1);

  const convertListSubForum = (category) => {
    let newlist = [];
    category.forEach((el, index) => {
      var listx = [];
      if(subforum[0])
      subforum[0].forEach((element) => {
        if(el.key === element.Category_ID ){
          listx.push(element);
        }
      });
      el.obj = listx;
      newlist.push(el);
    })
    if(subforum[1])
    if(subforum[1].length > 0){
      newlist.unshift({ key: 0, name: "Pin", obj: subforum[1]});
    }
    return newlist;
  }

  const [listSubForum, setListSubForum] = useState(convertListSubForum(category));
  

  useEffect(() => {
    setListSubForum(convertListSubForum(category));
  }, [subforum])


  const setAddSubForum = () => {
    if(userData.logged){
      addSubForum(conFirmFun, formState1.subforum, itemSelection.key,formState1.intro, (success, result) => {
        if(success){
          setFormState1({...formState1, subforum: "", intro: ""})
          Router.push('/forums/'+result.data[0].ID)
        }
      })
    }else{
      setDisplayLoginModel(true);
    }
  }

  const setUpdateSubForum = () => {
    modernizeSubForum(conFirmFun, formState1.subforum, formState1.intro ,tempID, (success) => {
      if(success){
        setListSubForum(prevState => {
          const newState = prevState.map((group, i) => {    
              const newState_ = group.obj.map((element, i) => {   
                  if (element.ID === tempID) {
                    element.title = formState1.subforum;
                    element.introduce = formState1.intro;
                  }
                  return element;
              })
              return {...group, obj: newState_};
            })
          return newState;
        });
        setFormState1({...formState1, subforum: "", intro: ""})
      }
    })
  }

  const setDeleteSubForum = () =>{
    removeSubForum(conFirmFun ,tempID, (success) => {
      if(success){
        setFormState1({...formState1, subforum: "", intro: ""})
        router.replace(router.asPath);
      }
    })
  }

  const saveSubForumBtn = (ID_SubForum,issaved) => {
    if(userData.id != "_" && userData.id)
    saveSubForum({
      member_id: userData.id,
      subforum_id: ID_SubForum,
      is_save: issaved
    },(code, result) => {
      if(code == 1){
        router.replace(router.asPath);
      }else{
        alert('Đã xảy ra lỗi hệ thống!!');
      }
    })
    else setDisplayLoginModel(true);
  }

  useEffect(() => {
    if(!displayModel){
      setFormState1({...formState1, subforum: "", intro: ""})
    }
  }, [displayModel]);
  
  return (
    <>
    
      <Meta title={"AniVnThread"}>
        <meta name="description" content={"AniVnThread, trang web giải trí, cộng đồng truyện tranh, tin tức manga và anime, nơi mà cộng đồng các thành viên đã đăng ký có thể gửi lên nhiều loại nội dung"}/>

        <meta property="og:title" content={"Vn Thread"}/>
        <meta property="og:image" content="https://img.vnthread.fun/images/next/logoAniThread.png"/>
        <meta property="og:description" content={"AniVnThread, trang web giải trí, cộng đồng truyện tranh, tin tức manga và anime, nơi mà cộng đồng các thành viên đã đăng ký có thể gửi lên nhiều loại nội dung"}/>
      </Meta>

      <Breadcrumb 
          datas={breadcrumb} 
          darkMode={darkMode}/>

      <HeadGroup 
          link={false} 
          button={'Tạo nhóm'} 
          darkMode={darkMode} 
          setDisplayModal={setDisplayModel} 
          setTypeModal={setTypeModal}/>


      { userData.admin ? 
      <GroupHeader 
          tagthread={tagthread} 
          setDisplayModal={setDisplayModel}  
          displayModel={displayModel}
          setTypeModal={setTypeModal}  
          typeModal={typeModal}
          colorlist={colorlist}
          /> 
      : "" }

      <GroupLatestPost  darkMode={darkMode}  data={latest} />

      
      <GroupSubForum 
          data={listSubForum}
          saveSubForumBtn={saveSubForumBtn} 
          darkMode={darkMode} 
          userData={userData} 
          setDisplayModal={setDisplayModel} 
          setTypeModal={setTypeModal}  
          setFormState={setFormState1} 
          setItemSelection={setItemSelection} 
          setTempID={setTempID}/>

      {typeModal==1 ? 
          <Modal 
              displayModel={displayModel} 
              setDisplayModel={setDisplayModel} 
              title={'Thêm nhóm'} 
              displayfooter={true}
              body={
                  <CreateModalForm 
                        formState={formState1} 
                        labelState={labelState1} 
                        setFormState={setFormState1} 
                        formSelection={formSelection} 
                        setItemSelection={setItemSelection} 
                        itemSelection={itemSelection}
                  />} 
              footer={
                  <ButtonModalTopic 
                    addBtn={setAddSubForum}
                  />}
          /> 
      : ""}

      {typeModal==4 ? 
            <Modal 
                displayModel={displayModel} 
                setDisplayModel={setDisplayModel} 
                title={'Cập nhật nhóm'} 
                displayfooter={true}
                body={
                  <CreateModalForm 
                        formState={formState1}
                        labelState={labelState1} 
                        setFormState={setFormState1} 
                        formSelection={formSelection} 
                        setItemSelection={setItemSelection} 
                        itemSelection={itemSelection}/>}
              
              footer={
                  <ButtonModalUpdate 
                    updateBtn={setUpdateSubForum}
                    deleteBtn={setDeleteSubForum}
                />}
      /> : ""}
      
      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>
    </>
  )
}




export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

  let accessToken = cookies.access_token;
  if(!accessToken) accessToken = context.res.getHeaders().access_token;

  let colorlist = [{key: 0}];
  let tagthread = [{key: 0}];

  if(cookies.refresh_token){
    colorlist = await loadColorList();
    tagthread = await loadTagThread();
  }

  const category = await loadCategory();
  const latest = await loadLatestThread();
  const subforum = await loadTopSubForum(accessToken);

  return { 
    props: 
    { 
      colorlist, tagthread, category, subforum, latest, dark_mode
    },
  }
}