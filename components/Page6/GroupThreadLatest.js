import React from 'react'
import Link from 'next/link'
import {converTime} from '../../helper/converTime'

const GroupThreadLatest = ({data, userId, updatePinBtn,deleteThreadBtn}) => {
  return (
    <>
    <div key="1" class="cluster-tab">
        <span class="ava-cluster-tab">
            <img src="https://znews-photo.zingcdn.me/w660/Uploaded/piqbzcvo/2022_09_20/one_piece_luffy_co_mot_nhan_cach_khac_khi_su_dung_gear_5_102317.jpeg" alt=""/>
        </span>

        <div class="info-cluster-tab">

            <div class="co-title-cluster-tab">
                <Link href={"/threads/1/1"}>
                <div class="title-cluster-tab">
                    <span >
                        Hahah
                    </span>
                    <span>
                    Hahah
                    </span>
                </div>
                </Link>


                <div class="list-in-line list-in-line-cluster-tab">
                    <ul>
                        <li> Hahah </li>
                        <li> 3 ngay truoc</li>
                    </ul>
                </div>

                <div class="list-in-line set-anchor-gray-color list-in-line-cluster-tab">
                <ul>
                    <li>Bình luận: Hahah</li>
                    <li>3 ngay truoc</li>
                </ul>
                </div>

            </div>


            <div class="pin-button-cluster-tab">

                <svg version="1.1" id="Layer_1" onClick={() => {deleteThreadBtn(1)}}  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 354.319 354.319">
                    <path id="XMLID_2_" d="M293.765,125.461l-41.574-17.221l17.221-41.574c3.17-7.654-0.464-16.428-8.118-19.599L150.428,1.146 C142.775-2.024,134,1.61,130.83,9.264l-17.221,41.574L72.035,33.617c-7.654-3.17-16.428,0.464-19.599,8.118 c-3.17,7.654,0.464,16.428,8.118,19.599l55.433,22.961l96.628,40.024H87.16c-8.284,0-15,6.716-15,15v200c0,8.284,6.716,15,15,15h180 c8.284,0,15-6.716,15-15V153.126l0.125,0.052c1.877,0.777,3.821,1.146,5.734,1.146c5.886,0,11.472-3.487,13.864-9.264 C305.053,137.406,301.419,128.631,293.765,125.461z M141.326,62.318l11.48-27.716l83.148,34.441l-11.48,27.716L182.9,79.539 L141.326,62.318z"></path>
                </svg>
            </div>

        
        </div>

        <div class="info-view-cluster-tab">
            <div>
                <span>Bình luận</span>
                <span>123</span>
            </div>

            <div>
                <span>Lượt xem</span>
                <span>342</span>
            </div>
        </div>

    </div>
    
    </>
  )
}

export default GroupThreadLatest
