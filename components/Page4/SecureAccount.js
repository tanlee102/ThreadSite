import React from 'react'
import {converTime} from '../../helper/converTime'

const SecureAccount = ({darkMode,data, deleteLoggedBtn}) => {

    let url_apple = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Apple-logo.png/240px-Apple-logo.png";
    let url_android = "https://cdn.fansshare.com/photo/android/android-logo-android-955268216.jpg";
    let url_another = "https://img.favpng.com/20/10/15/device-icon-monitor-icon-smartphone-icon-png-favpng-EZT2hpE90ZGaFADdAKSQHbhNu.jpg"

    function checkDevice(name){
        if(name.includes("Apple") || name.includes("Mac"))
        return url_apple
        else if(name.includes("Android"))
        return url_android
        else return url_another
    }


  return (
    <div  class="member-hub member-hub" dark-mode={darkMode ? "true" : "false"}>
      
      {data.map((ite, index) => (

        <div key={index} class="item-tab member-tab set-border-box-1 set-margin-top-1px">

            <div class="content-member-tab">
                <div class="ava-item-tab">
                    <img src={checkDevice(ite.device)}  alt=""/>
                </div>
                <div class="content-item-tab">
                    <div class="title-item-tab set-bold set-black-white"> {ite.device}</div>

                    <div class="extra-item-tab set-black-white">
                        {converTime(ite.time)}
                    </div>
                </div>

                
            </div>

            { index != 0 ?
            <span  onClick={() => {deleteLoggedBtn(ite.time, ite.device, index)}}  class="btn-member-tab un-btn-member-tab">
                <p>Đăng xuất</p>
            </span> : ""
            }

        </div>


    //   <div class="item-notification item-secure">
    //     <div class="fr-ava-it-not">
    //         <span style={{backgroundColor: "black", borderRadius: "4px"}}>
    //             <img src={checkDevice(ite.device)}  alt=""/>
    //         </span>
    //     </div>

    //     <div class="fr-content-it-sec">
    //         <div class="fr-txt-it-not">
    //             {ite.device}
    //         </div>
    //         <div class="fr-time-it-not">
    //             {converTime(ite.time)}
    //         </div>
    //     </div>
    //     { index != 0 ? 
    //     <span class="btn-user-following-account btn-user-unfollow-account">
    //         <p onClick={() => {deleteLoggedBtn(ite.time, ite.device, index)}}>Đăng xuất</p>
    //     </span>
    //     : ""
    //     }
    // </div>
    ))}

    </div>
  )
}

export default SecureAccount
