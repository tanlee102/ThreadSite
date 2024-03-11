import React from 'react'
import Link from 'next/link'
import {converTime} from '../../helper/converTime'
import {env_Image} from '/env'

const GroupThread = ({data, userData, updatePinBtn, deleteThreadBtn, is_owner=false}) => {
  return (

    <>

    {data?.length == 0 ? 
        <div className='empty-panel'>
            <div>
                <svg
                    viewBox="0 0 457.245 457.245">
                    <path d="M454.654,133.6l-88.463-76.605c-2.415-2.092-5.892-2.423-8.66-0.825l-18.36,10.6l-7.095-4.095l10.862-6.271
                        c2.542-1.468,3.995-4.284,3.716-7.207c-0.279-2.923-2.237-5.414-5.011-6.375L231.069,4.512c-2.201-0.763-4.553-0.443-6.425,0.726
                        c0,0-221.388,127.83-221.62,128.003c-0.985,0.732-1.802,1.714-2.344,2.901c-0.492,1.077-0.708,2.214-0.676,3.329l0.021,178.427
                        c0,2.678,1.429,5.153,3.748,6.493l221.094,127.75c1.161,0.671,2.457,1.006,3.752,1.006c1.294,0,2.59-0.335,3.75-1.005
                        l221.126-127.653c2.321-1.34,3.75-3.816,3.75-6.495V139.359C457.271,137.163,456.331,135.052,454.654,133.6z M324.17,75.43
                        L136.421,183.827c-2.101,1.213-3.486,3.368-3.716,5.783c-0.23,2.415,0.722,4.793,2.557,6.381l28.993,25.107l-84.872-49l36.24,12.555
                        c2.056,0.713,4.32,0.496,6.205-0.592L317.075,71.336L324.17,75.43z M229.404,19.81l91.818,31.811L117.295,169.358l-91.827-31.813
                        L229.404,19.81z M221.115,432.649L15.024,313.568l-0.02-161.317l206.128,119.008L221.115,432.649z M229.507,257.764l-76.462-66.214
                        L360.408,71.829l76.462,66.213L229.507,257.764z M442.244,313.663L236.115,432.659l0.018-161.4L442.244,152.26V313.663z"/>
                </svg>
                <span>Không có bài viết</span>
            </div>
        </div>
    : ""}

    {data?.map((item, index) => (

    <div key={item.ID} class="cluster-tab">
    <Link href={"/u/"+item.user_name+"/"}>
    <span class="ava-cluster-tab">
        <img src={env_Image(item.thumbnail)} alt=""/>
    </span>
    </Link>

    <div class="info-cluster-tab">

    <Link href={"/threads/"+item.Thread_ID+"/1"}>
    <div class="co-title-cluster-tab">
        <div class="title-cluster-tab">
            <span style={{backgroundColor: "#"+item.code  }}>
                {item.TagName}
            </span>
            <span>
               {item.title}
            </span>
        </div>



        <div class="list-in-line list-in-line-cluster-tab">
            <ul>
                <li> {item.name} </li>
                <li> { converTime(item.time)}</li>
                {item.SubForumName ? <li className='set-one-line-overflow'> {item.SubForumName} </li> : "" }
            </ul>
        </div>

        <div class="list-in-line set-anchor-gray-color list-in-line-cluster-tab hide-list-in-line-cluster-tab">
          <ul>
              <li>Bình luận: {item.total_post}</li>
              <li>{ converTime(item.latest_time_post) }</li>
          </ul>
        </div>

    </div>
    </Link>

    <div class="pin-button-cluster-tab">
    
        {(item.priority > 0 || ((userData.admin || is_owner) && !item.SubForumName))  ?  
            <svg onClick={() => {updatePinBtn ? updatePinBtn(item.priority, item.Thread_ID, index) : ""}}  className={item.priority ? "set-red-svg-color" : "set-anchor-gray-slight-color"}  viewBox="0 0 16 16">
                <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354z"></path>
            </svg>
        : "" }

        {(userData.id == item.Member_ID || userData.admin || is_owner) ? 
            <svg onClick={() => {deleteThreadBtn ? deleteThreadBtn(item.Thread_ID) : ""}}  x="0px" y="0px" viewBox="0 0 354.319 354.319" className='set-anchor-gray-slight-color'>
                <path id="XMLID_2_" d="M293.765,125.461l-41.574-17.221l17.221-41.574c3.17-7.654-0.464-16.428-8.118-19.599L150.428,1.146 C142.775-2.024,134,1.61,130.83,9.264l-17.221,41.574L72.035,33.617c-7.654-3.17-16.428,0.464-19.599,8.118 c-3.17,7.654,0.464,16.428,8.118,19.599l55.433,22.961l96.628,40.024H87.16c-8.284,0-15,6.716-15,15v200c0,8.284,6.716,15,15,15h180 c8.284,0,15-6.716,15-15V153.126l0.125,0.052c1.877,0.777,3.821,1.146,5.734,1.146c5.886,0,11.472-3.487,13.864-9.264 C305.053,137.406,301.419,128.631,293.765,125.461z M141.326,62.318l11.48-27.716l83.148,34.441l-11.48,27.716L182.9,79.539 L141.326,62.318z"></path>
            </svg>  
        : ""}

    </div>

    
    </div>

    <div class="info-view-cluster-tab">
        <div>
            <span>Bình luận</span>
            <span>{item.total_post}</span>
        </div>

        <div>
            <span>Lượt xem</span>
            <span>{item.total_view}</span>
        </div>
    </div>

</div>

  ))}

  </>
  )
}

export default GroupThread
