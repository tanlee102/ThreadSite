import React, {useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import Nakit from '../../components/Nakit'
import Nokit from '../Nokit/Nokit'
import { nokitConvert } from '../Nokit/nokitConvert'

import { LayoutContext } from '../_layout'
import { MainContext } from '../_main'

import useCheckLoadKit from '../../helper/useCheckLoadKit'


const SheetRelyBody = ({addPostBtn}) => {

  const router = useRouter();

  const { previewFunc }  = useContext(LayoutContext); 
  const { replydata, setReplydata, setTypeKit, typeKit } = useContext(MainContext);
 
  const resetReplyBtn = () => {
    setReplydata({
      display: false,
      id_user: 0,
      ten_user: "-",
      id_post: 0,
    })
  }


  const { dataNoKit, setDataNokit, getDataNokit } = useContext(MainContext);


  useCheckLoadKit(getDataNokit);

  useEffect(() => {
    setDataNokit([
      {text: " ", isBold: false, key: 1},
    ]);
    document.getElementsByClassName('fr-text').item(0).innerHTML = '';
  }, [router.asPath]);


  return (
        <div class="sheet-item-body reply-sheet-item-body">

        <div style={{display: replydata.display ? "flex" : "none"}} class="reply-sheet-item-tag"> 
          <span>Trả lời: {replydata.ten_user} </span> 
          <svg onClick={() => resetReplyBtn()} xmlns="http://www.w3.org/2000/svg" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"></path>
          </svg>
        </div>


        <div style={{display: typeKit ? 'block' : 'none'}}><Nakit saveCacheNakit={""}></Nakit> </div>
        <div style={{display: !typeKit ? 'block' : 'none'}}><Nokit data={dataNoKit} setData={setDataNokit}></Nokit></div>


      <div class="submit-reply-sheet-item">

            <span onClick={() => {addPostBtn()}}>
                  <svg x="0px" y="0px" viewBox="0 0 512 512" >
                      <path d="M505.265,162.41L347.727,24.564c-5.809-5.081-14.06-6.282-21.091-3.111c-7.05,3.19-11.559,10.201-11.559,17.92v19.692 H19.692C8.802,59.065,0,67.887,0,78.757v393.846c0,10.89,8.802,19.692,19.692,19.692h393.846c10.89,0,19.692-8.802,19.692-19.692 V255.082l72.034-63.035c4.293-3.742,6.735-9.137,6.735-14.828C512,171.548,509.558,166.152,505.265,162.41z M393.846,452.911	H39.385V98.45h275.692v4.825c-44.741,14.159-171.697,66.895-177.211,211.042c-0.394,9.689,6.361,18.215,15.892,20.086	c1.26,0.256,2.54,0.354,3.801,0.354c8.133,0,15.616-5.061,18.471-12.958c19.909-54.725,101.77-64.177,139.047-65.634v58.9	c0,7.739,4.51,14.75,11.559,17.94c2.304,1.063,4.766,1.457,7.227,1.556c0.315,0.02,0.591,0.197,0.906,0.197	c0.394,0,0.768-0.177,1.142-0.197c1.477-0.099,2.875-0.374,4.293-0.768c0.67-0.197,1.339-0.335,1.969-0.591	c1.989-0.807,3.899-1.851,5.553-3.308l46.119-40.35V452.911z"/>
                  </svg>
                    <p>Trả lời</p>
            </span>

            <span onClick={() => setTypeKit(!typeKit)}>
                <svg viewBox="16 16 68 68"><path d="M77.4,78.1H40.5c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h36.9  c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6C79.8,77,78.8,78.1,77.4,78.1C77.5,78.1,77.5,78.1,77.4,78.1z"/>
                <path d="M26.6,78.1H22c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h4.6
                  c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6C29,77,28,78,26.8,78.1C26.7,78.1,26.7,78.1,26.6,78.1z"/>
                <path d="M53.8,57.6c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h23.6
                  c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6c0,1.2-1,2.3-2.2,2.3c0,0-0.1,0-0.1,0H53.8z"/>
                <path d="M62.6,37.1c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h14.8
                  c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6c0,1.2-1,2.3-2.2,2.3c0,0-0.1,0-0.1,0H62.6z"/>
                <path d="M20.8,58.2C19.6,47.5,28,36.4,38,34.5l2.7-0.6c0.5-0.1,0.9-0.6,0.8-1.2c0-0.3-0.2-0.5-0.4-0.6l-6.7-4.5
                  c-0.7-0.5-0.8-1.4-0.3-2c0,0,0,0,0-0.1l1.7-2.5c0.4-0.7,1.4-0.9,2-0.4c0,0,0,0,0.1,0L54,33.5c0.7,0.4,0.9,1.4,0.4,2c0,0,0,0,0,0.1
                  l-11,16.2c-0.4,0.7-1.4,0.9-2,0.4c0,0,0,0-0.1,0l-2.5-1.7c-0.7-0.4-0.9-1.4-0.4-2c0,0,0,0,0-0.1l4.4-6.7c0.3-0.4,0.3-1.1-0.2-1.4
                  c-0.2-0.2-0.5-0.3-0.8-0.2l-1.6,0.3c-7.8,1.5-14.4,10.3-13.7,17.9c0,0.7-1.1,1.7-1.9,1.9h-1.9C21.8,60.3,20.8,59.1,20.8,58.2z"/>
                </svg>
                <p>TYping</p>
          </span>

          <span onClick={() => {previewFunc(typeKit ?  String(document.getElementById('editable').innerHTML) :  nokitConvert(dataNoKit, true), addPostBtn)}}>
              <svg viewBox="0 0 512 512" >
                    <path d="m251.6,185.7c-36.9,0-67,31.5-67,70.3 0,38.7 30,70.3 67,70.3 36.9,0 67-31.5 67-70.3 0-38.7-30.1-70.3-67-70.3z"/>
                    <path d="m251.6,367.1c-59.4,0-107.8-49.8-107.8-111.1 0-61.3 48.4-111.1 107.8-111.1s107.8,49.8 107.8,111.1c0,61.3-48.4,111.1-107.8,111.1zm246.3-121.9c-63.8-102.4-149.8-158.8-241.9-158.8-92.1,0-178.1,56.4-241.9,158.8-4.1,6.6-4.1,15 0,21.6 63.8,102.4 149.8,158.8 241.9,158.8 92.1,0 178-56.4 241.9-158.8 4.1-6.6 4.1-15 0-21.6z"/>
              </svg>
              <p>Xem trước</p>
          </span>

      </div>

    </div>
  )
}

export default SheetRelyBody
