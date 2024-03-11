import React, {useState, useEffect , useRef, useLayoutEffect } from 'react'
import Link from 'next/link';
import PopOutMemberPanel from '../Another/PopOutMemberPanel';

import {useOutsideClick} from '../../helper/useOutsideClick'


const OptionPanelSection = ({conFirmFun,isBan, isBlock,idMember}) => {

    const handleClickOutside = () => {
        targetRefExp.current.style.display = 'none';
    };
    const targetRefExp = useOutsideClick(handleClickOutside);
    const handleClick = () => {
        targetRefExp.current.style.display = 'flex';
    };
    const handleHeaderClick = (event) => {
      event.stopPropagation();
    };
  

  return (
    <span class="btn-icon-member-tab btn-member-tab un-btn-member-tab" onClick={() => handleClick()}>
    
      <svg version="1.1"  x="0px" y="0px" viewBox="0 0 472.576 472.576">
        <circle cx="65.142" cy="236.288" r="65.142"/>
        <circle cx="236.308" cy="236.288" r="65.142"/>
        <circle cx="407.434" cy="236.288" r="65.142"/>
      </svg>

    <div class="pop-out-member-panel pop-out-member-panel-right pop-out-member-panel-admin" ref={targetRefExp} style={{display: "none"}}>
        <PopOutMemberPanel conFirmFun={conFirmFun} isAdmin={true} isBan={isBan} isBlock={isBlock} idMember={idMember}/>
    </div>

</span>
  )
}

export default OptionPanelSection
