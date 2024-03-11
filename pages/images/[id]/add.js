import React, { useContext, useState, useRef } from 'react'
import { env_variable } from '../../../env'
import Meta from '../../../components/Meta'
import Breadcrumb from '../../../components/Another/Breadcrumb'
import { MainContext } from '../../../components/_main'
import ContainMenuImages from '../../../components/Page9/ContainMenuImages'
import LoadMore from '../../../components/Another/LoadMore'
import axios from 'axios';
import { useRouter } from 'next/router'
import { LayoutContext } from '../../../components/_layout'
import Link from 'next/link'
import GroupImages from '../../../components/Page9/GroupImages'


const AddImages = () => {

  const breadcrumb = [{label: 'PIP', link: "/images/main"}];

  const { darkMode, userData }  = useContext(MainContext);
  const {conFirmFun}  = useContext(LayoutContext);

  const router = useRouter();
  var email = String(router.query.email);
  var pip_id = String(router.query.pip_id);
  var type = String(router.query.type);

  const [loadState, setLoadState] = useState(-1);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadStack, setUploadStack] = useState([]);
  const [imageStack, setImageStack] = useState([]);
  const fileInputRef = useRef(null);

  const [perCent, setPercent] = useState(100);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);

    const previewImagesArr = [...previewImages];
    files.forEach((file) => {
      previewImagesArr.push(URL.createObjectURL(file));
    });
    setPreviewImages(previewImagesArr);
  };

  const handleUpload = async () => {
    if(loadState != true){
      const uploadSequence = [...selectedFiles];
      uploadImages(uploadSequence);
    }else{
      alert('onupload')
    }
  };

  const handleDelete = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    const updatedImages = [...previewImages];
    updatedImages.splice(index, 1);
    setPreviewImages(updatedImages);
  };

  const uploadImages = (uploadSequence) => {
    if (uploadSequence.length > 0) {
      setLoadState(true);
      const file = uploadSequence[0];
      const formData = new FormData();
      formData.append('image_path', file);
      axios
        .post(env_variable.URL_IMAGE_CLOUD+'/img/v1/upload?pip_id='+pip_id+'&percent='+String(perCent), formData)
        .then((response) => {
          console.log(response.data);
          setImageStack((prevList) => [response.data, ...prevList]);
          const remainingFiles = uploadSequence.slice(1);
          uploadImages(remainingFiles); // Recursive call to upload the next image
        })
        .catch((error) => {
          setLoadState(-1);
          console.error(error);
          alert(error);
        });
    }else{
      setLoadState(-1);
      conFirmFun("Đăng ảnh", "Thành công!!")
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };




  return (
    <div>
      <Meta title={"Tài khoản | " + env_variable.LABEL_TAB_BAR}></Meta>
      <Breadcrumb datas={breadcrumb} darkMode={darkMode}/>

      <div class="fr-account" dark-mode={darkMode ? "true" : "false"}>
             
        <ContainMenuImages />

        <div class="setting-account">

          <Link href={'/images/main/list?pip_id='+pip_id+'&type='+type+'&email='+email} ><div className='pip-label'>PIP: {email}</div></Link>

          <div className='contain-pip-add-image'>
              <span onClick={handleClick} className='btn-pip-add-image pip-label'>Chọn ảnh</span>
              <span className='input-percent-pip-image'><input value={perCent} onChange={(e) => setPercent(Number(e.target.value))} placeholder='Phần trăm'  type='number'/></span>
              <span className='btn-pip-add-image pip-label' onClick={handleUpload}>Đăng ảnh</span>

              <div>
 
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />

                <div className="preview">
                  {previewImages.map((image, index) => (
                    <div key={image}>
                      <img src={image} alt="Preview" />
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                  ))}
                </div>

              </div>

          </div>


          <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={() => {}}/>





        <br/>



          <GroupImages data={imageStack} type={type}/>

        </div>    

      </div>
    </div>
  )
}

export default AddImages

