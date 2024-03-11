import React, {  useContext, useState } from "react";
import { addTagThread } from '../../callapi/tagthread';
import { addTopic } from '../../callapi/topic';
import Modal from "../Another/Modal";
import ButtonModalTopic from "./ButtonModalTopic";
import CreateModalForm from "../Another/CreateModalForm";
import { LayoutContext } from "../_layout";
import { addManga } from "../../callapi/manga";

const GroupHeader = ({setDisplayModal, displayModel, setTypeModal, typeModal , tagthread, colorlist}) => {

  const { conFirmFun } = useContext(LayoutContext)

  const [listTag, setListTag] = useState(tagthread);

  const labelState = [{label: 'Nhập tên Topic'}];
  const initialState = {
    topic: "",
  };

  const labelState2 = [{label: 'Nhập tên Tag'}];
  const initialState2 = {
    tagthread: "",
  };

  const labelState5 = [{label: 'Nhập tên Manga'}, {label: 'URL ảnh'},  {label: 'Giới thiệu', tag: 'textarea'}, {label: 'Tác giả'}];
  const initialState5 = {
    name: "",
    url: "",
    intro: "",
    author: "",
  };


  const [formSelection1, setFormSelection1] = useState(colorlist);
  const [itemSelection1, setItemSelection1] = useState({key: formSelection1[0].key});


  const [formState, setFormState] = useState(initialState);
  const [formState2, setFormState2] = useState(initialState2);
  const [formState5, setFormState5] = useState(initialState5);


  const setAddTopicBtn = () =>{
    addTopic(conFirmFun, formState.topic, (success) => {
      if(success){
        setFormState({...formState, topic: ""})
      }
    })
  }

  const setAddTagThread = () =>{
    addTagThread(conFirmFun, formState2.tagthread, itemSelection1.key, (success) => {
      if(success){
        setFormState2({...formState2, tagthread: ""})
      }
    })
  }

  const setAddManga = () =>{
    addManga(conFirmFun, formState5.name, formState5.intro, formState5.url, formState5.author, (success) => {
      if(success){
        setFormState5({...formState5, name: "", intro: "", url: "", author: ""})
      }
    })
  }

  return (
    <>
    <div class="tag-hub">

        <div class="button-tag-hub">
            <span onClick={() => {setDisplayModal(true) ; setTypeModal(0)}}><i class="fa-solid fa-pen-to-square"></i>  Thêm Topic</span>
            <span onClick={() => {setDisplayModal(true) ; setTypeModal(2)}}><i class="fa-solid fa-pen-to-square"></i>  Thêm Tag</span>
            <span onClick={() => {setDisplayModal(true) ; setTypeModal(5)}}><i class="fa-solid fa-pen-to-square"></i>  Thêm Manga</span>
        </div>

        <div class="tag-tab">
        {listTag.map((item) =>
            <span key={item.ID} style={{backgroundColor: "#"+item.code}}>
              {item.title} 
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">    
                  <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z">
                  </path>
              </svg>
            </span>
        )}
        </div>
    </div>


      {typeModal==0 ? 
          <Modal 
              displayModel={displayModel} 
              setDisplayModel={setDisplayModal} 
              title={'Thêm chủ đề'} 
              displayfooter={true}
              body={
                <CreateModalForm 
                  formState={formState} 
                  labelState={labelState}
                  setFormState={setFormState} 
                  formSelection={[]} 
                  setItemSelection={{}}
                />} 
              footer={
                <ButtonModalTopic 
                  addBtn={setAddTopicBtn}
              />}
          /> 
      : ""}

      {typeModal==2 ? 
          <Modal 
                displayModel={displayModel} 
                setDisplayModel={setDisplayModal} 
                title={'Thêm thẻ'} 
                displayfooter={true}
                body={
                    <CreateModalForm 
                        formState={formState2} 
                        labelState={labelState2} 
                        setFormState={setFormState2} 
                        formSelection={formSelection1} 
                        setItemSelection={setItemSelection1} 
                        itemSelection={itemSelection1}
                />} 
                footer={
                    <ButtonModalTopic 
                        addBtn={setAddTagThread}
                    />}/> 
        : ""}

        {typeModal==5 ? 
          <Modal 
            displayModel={displayModel} 
            setDisplayModel={setDisplayModal} 
            title={'Thêm manga'} 
            displayfooter={true}
            body={
              <CreateModalForm 
                formState={formState5} 
                labelState={labelState5}
                setFormState={setFormState5} 
                formSelection={[]} 
                setItemSelection={{}}
              />} 
            footer={
              <ButtonModalTopic 
                addBtn={setAddManga}
            />}
          /> 
        : ""}

    </>
  )
}

export default GroupHeader

