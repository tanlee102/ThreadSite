import React, { useContext, useEffect } from 'react'
import Nokit from '../../../components/Nokit/Nokit'
import { MainContext } from '../../../components/_main';
import { LayoutContext } from '../../../components/_layout';
import Breadcrumb from '../../../components/Another/Breadcrumb';
import { addChapter } from '../../../callapi/chapter';
import { useRouter } from 'next/router';

const AddChapterPage = () => {

    const {dataNoKit, setDataNokit, darkMode}  = useContext(MainContext); 
    const {conFirmFun}  = useContext(LayoutContext); 

    const router = useRouter();
    var id = router.query.id;
    var title = router.query.title;
    
    useEffect(() => {
        setDataNokit([])
    }, []);


    const addChapteBtn = () => { 
        addChapter(conFirmFun, String(document.getElementById('title-add-chapter').value), dataNoKit, String(document.getElementById('number-add-chapter').value), id, (success, result) => {
          if(success){
              setDataNokit([]);
            //   setTimeout(() => {
            //     Router.push('/threads/'+Number(result.data.thread_id)+'/go?post_id='+Number(result.data.post_id))       
            //   }, 0);
          }
        });
      }

  return (
    <div className='contain-manga'>

        <div className='contain-add-chapter'>
            
            <Breadcrumb
                datas={[{label:'Thêm chương', link: "/"}]} 
                darkMode={darkMode}/>

            <div className='add-chapter'>
                <div className='label-add-chapter'>{title}</div>
                <div><input id='title-add-chapter' type='text' placeholder='Nhập tiêu đề'/></div>
                <div><input id='number-add-chapter' type='number' placeholder='Nhập số chương'/></div>
                <div><Nokit data={dataNoKit} setData={setDataNokit} onlyImage={true}></Nokit></div>

                <div id='btn-add-chapter' onClick={() => addChapteBtn()}>Đăng chương</div>

            </div>

        </div>


    </div>
  )
}

export default AddChapterPage
