import React, {useState, useEffect , useRef, useLayoutEffect, useContext } from 'react'
import Link from 'next/link';
import PopOutMemberPanel from '../Another/PopOutMemberPanel';

import {useOutsideClick} from '../../helper/useOutsideClick'
import { MainContext } from '../_main';
import { LayoutContext } from '../_layout';

const SheetTitle = ({item}) => {

    const { userData } = useContext(MainContext)
    const { conFirmFun } = useContext(LayoutContext)

    const handleClickOutside = () => {
      try {
        targetRefExp.current.style.display = 'none';  
      } catch (error) {
        
      }
    };
    const targetRefExp = useOutsideClick(handleClickOutside);
    const handleClick = () => {
        targetRefExp.current.style.display = 'flex';
    };  


  return (
    <div className='sheet-item-title'>
        
    <Link href={"/threads/"+item.Thread_ID+"/go?post_id="+item.ID}>
      <span>
        <p className='set-one-line-overflow'> {item.ThreadName} <i class="fa-solid fa-angle-right"></i></p>
      </span>
    </Link>

    {userData.admin ? 
    <>
    <span class="btn-icon-member-tab btn-member-tab un-btn-member-tab" onClick={() => handleClick()}>
        <svg version="1.1"  x="0px" y="0px" viewBox="0 0 472.576 472.576">
            <circle cx="65.142" cy="236.288" r="65.142"/>
            <circle cx="236.308" cy="236.288" r="65.142"/>
            <circle cx="407.434" cy="236.288" r="65.142"/>
        </svg>
    </span>


      <div class="pop-out-member-panel pop-out-member-panel-right pop-out-member-panel-admin" ref={targetRefExp} style={{display: "none"}}>
          <PopOutMemberPanel isAdmin={true} isBan={item.isBan} isBlock={-1} conFirmFun={conFirmFun} idMember={item.Member_ID}/>
      </div>
    </>: ""
    }
    
    </div>
  )
}

export default SheetTitle
