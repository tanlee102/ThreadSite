import Link from 'next/link'
import React, { useState } from 'react'
import { createLinkLoadPip } from '../../data/axios_fetch';


const ListImages = ({datas}) => {

  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")

  const [urlPip, setUrlPip] = useState(null)

  const getButPip = () => {
    createLinkLoadPip({
      client_id: input1,
      client_secret: input2,
    } ,(code, result) => {
      if(code == 1){
        setUrlPip(result.data)
      }else{
        alert('Có lỗi khi load link!!');
      }
    })
  }

  return (
    <div>

      <div className='co-get-but-pip'>
      <span className='input-percent-pip-image'><input value={input1} onChange={(e) => setInput1(e.target.value)} placeholder='CLIENT_ID'  type='text'/></span>
      <span className='input-percent-pip-image'><input value={input2} onChange={(e) => setInput2(e.target.value)} placeholder='CLIENT_SECRET'  type='text'/></span>
      <button onClick={() => {getButPip()}}>GET BUT PIP</button>
      </div>

      {urlPip ? <a href={urlPip} target="_blank" rel="noreferrer"> <div className='btn-add-pip'>Thêm PIP</div></a> : "" }
     
      <div className='contain-list-pip'>

      {datas.map((ite, index) => (
          <Link key={index} href={'/images/main/list?pip_id='+ite.ID+'&email='+ite.email+'&type='+ite.type} ><div style={{color: ite.type ? 'coral' : 'cornflowerblue'}} key={index}>{ite.email} | {ite.type}</div></Link>
      ))}
      
      </div>
    </div>
  )
}

export default ListImages
