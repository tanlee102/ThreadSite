import React, {useState, useEffect , useContext } from 'react'
import {converTime} from '../../helper/converTime'
import { MainContext } from '../_main'
import Link from 'next/link'
import { LayoutContext } from '../_layout'

const Article = ({data, removePostBtn, likePostBtn}) => {

    const { userData } = useContext(MainContext)
    const { conFirmFun }  = useContext(LayoutContext);

    const [isliked, setIsLiked] = useState(data.is_liked);
    const [totalliked, setTotalLiked] = useState(data.total_like);

    useEffect(() => {
      if(window.twttr){
        const twttr = window.twttr
        twttr.widgets.load();
      }
    }, [])

    const copyLink = () => {
      conFirmFun('Copy Link');
      navigator.clipboard.writeText(window.location.href);
      setTimeout(() => {
          conFirmFun();
      }, 200);
    }


  return (
    <div className='article-hub'>

        <div className='head-article'>
            <Link href={'/u/'+data.user_name}>
            <span>{data.name}</span>
            </Link>
            <span> | </span>
            <span>{converTime(data.time)}</span>
        </div>


        <div className='body-article'> 
          <div className='root-content-article'            
            dangerouslySetInnerHTML={{__html: String(data.content)
              .replace(/font-size: medium;/g, "").replace(/font-size:medium/g, "").replace(/font-size: medium/g, "")
              .replace(/font-size: large/g, "font-size: 1.2em; line-height: 1.5em")
              .replace(/font-size: x-large/g, "font-size: 1.4em; line-height: 1.6em")}}>

          </div>
        </div>



        <div class="sheet-item-button bottom-article">
              <span>Báo cáo</span>

              {data.Member_ID === Number(userData.id) ? <span onClick={() => {removePostBtn(data.ID,data.index)}} className='set-float-left'>Xóa</span> : ""}

              <span onClick={() => {copyLink()}}>       
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-13 -40 240 240"><path d="M179.617,15.453c-0.051-0.05-0.102-0.1-0.154-0.149c-18.689-18.549-48.477-20.463-69.37-4.441 c-2.091,1.599-3.776,3.053-5.302,4.575c-0.044,0.044-0.087,0.088-0.13,0.133L71.224,49.012c-2.929,2.929-2.929,7.678,0.001,10.606 c2.93,2.93,7.679,2.929,10.606-0.001l33.561-33.566c0.035-0.035,0.069-0.07,0.104-0.105c1.023-1.01,2.205-2.02,3.715-3.174 c15.008-11.508,36.411-10.098,49.789,3.281c0.044,0.044,0.089,0.088,0.134,0.131c14.652,14.786,14.611,38.742-0.124,53.483 l-33.559,33.563c-2.929,2.929-2.929,7.678,0.001,10.606c1.465,1.464,3.384,2.196,5.303,2.196c1.919,0,3.839-0.732,5.304-2.197 l33.56-33.563C200.241,69.641,200.241,36.077,179.617,15.453z"></path><path d="M113.23,135.437l-33.541,33.542c-0.066,0.067-0.132,0.136-0.196,0.205c-3.708,3.648-8.059,6.449-12.945,8.333 c-13.995,5.418-29.888,2.07-40.481-8.524c-14.768-14.784-14.768-38.84,0-53.619L59.624,81.83c1.406-1.407,2.197-3.315,2.197-5.305 v-0.013c0-4.143-3.357-7.494-7.5-7.494c-2.135,0-4.062,0.895-5.428,2.328l-33.435,33.422c-20.61,20.628-20.612,54.195-0.002,74.828 c10.095,10.097,23.628,15.479,37.411,15.479c6.414-0.001,12.884-1.167,19.084-3.566c6.922-2.667,13.088-6.67,18.326-11.896 c0.076-0.075,0.15-0.153,0.223-0.232l33.337-33.337c2.929-2.93,2.929-7.678-0.001-10.607 C120.909,132.509,116.16,132.509,113.23,135.437z"></path><path d="M59.15,135.908c1.465,1.465,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196l66.164-66.161 c2.93-2.929,2.93-7.678,0.001-10.606c-2.929-2.93-7.678-2.929-10.606-0.001l-66.164,66.161 C56.221,128.23,56.221,132.979,59.15,135.908z"></path></svg>
                Link
              </span>
           
              <span>       
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 25 25">
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
                </svg>
              </span>

              <span onClick={() => {
                  likePostBtn(data.ID, !isliked); 
                  setIsLiked(!isliked); 
                  isliked ? setTotalLiked(totalliked - 1) : setTotalLiked(totalliked + 1)}}>       
            
                  {isliked == 1 ? 
                  <svg version="1.1" viewBox="0 0 51.997 51.997">
                    <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014	C52.216,18.553,51.97,16.611,51.911,16.242z"/>
                  </svg>
                  : 
                  <svg version="1.1" viewBox="0 0 460.958 460.958">
                    <path d="M337.843,23.957c-45.74,0-86.155,25.047-107.364,62.788c-21.209-37.741-61.623-62.788-107.364-62.788 C55.229,23.957,0,79.186,0,147.072c0,54.355,37.736,119.46,112.16,193.506c54.115,53.84,107.363,92.031,109.603,93.631 c2.607,1.861,5.662,2.792,8.716,2.792s6.109-0.93,8.715-2.792c2.241-1.6,55.489-39.791,109.604-93.631 c74.424-74.046,112.16-139.151,112.16-193.506C460.958,79.186,405.729,23.957,337.843,23.957z M327.919,319.032 c-39.843,39.681-80.171,71.279-97.44,84.307c-17.269-13.029-57.597-44.626-97.44-84.307C65.63,251.899,30,192.436,30,147.072 c0-51.344,41.771-93.115,93.115-93.115c47.279,0,87.03,35.369,92.464,82.271c0.876,7.565,7.284,13.273,14.9,13.273 c7.616,0,14.023-5.708,14.9-13.273c5.435-46.902,45.185-82.271,92.464-82.271c51.344,0,93.115,41.771,93.115,93.115 C430.958,192.436,395.328,251.899,327.919,319.032z"/>
                  </svg>
                  }

                  {totalliked ? totalliked : 0}
                </span>

        </div>

    </div>
  )
}

export default Article
