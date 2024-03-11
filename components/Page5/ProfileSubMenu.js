import React from 'react'
import { useState } from "react";
import Router from 'next/router'

const ProfileSubMenu = ({listMenu, urlMenu, choseMenu, setChoseMenu}) => {

    const [displayBar, setDisplayBar] = useState(false);

  return (
  <div onClick={() => setDisplayBar(!displayBar)} class="dropdown-menu">

    <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9703 3.3437C13.0166 2.88543 10.9834 2.88543 9.02975 3.3437C6.20842 4.00549 4.0055 6.20841 3.3437 9.02975C2.88543 10.9834 2.88543 13.0166 3.3437 14.9703C4.0055 17.7916 6.20842 19.9945 9.02975 20.6563C10.9834 21.1146 13.0166 21.1146 14.9703 20.6563C17.7916 19.9945 19.9945 17.7916 20.6563 14.9703C21.1146 13.0166 21.1146 10.9834 20.6563 9.02975C19.9945 6.20842 17.7916 4.00549 14.9703 3.3437ZM8.55377 9.12812C8.55377 8.8109 8.81093 8.55374 9.12815 8.55374H12.9573C13.2745 8.55374 13.5317 8.8109 13.5317 9.12812C13.5317 9.44533 13.2745 9.70249 12.9573 9.70249H9.12815C8.81093 9.70249 8.55377 9.44533 8.55377 9.12812ZM8.55377 12C8.55377 11.6828 8.81093 11.4256 9.12815 11.4256H14.8719C15.1891 11.4256 15.4462 11.6828 15.4462 12C15.4462 12.3172 15.1891 12.5743 14.8719 12.5743H9.12815C8.81093 12.5743 8.55377 12.3172 8.55377 12ZM8.55377 14.8718C8.55377 14.5546 8.81093 14.2975 9.12815 14.2975H12C12.3172 14.2975 12.5744 14.5546 12.5744 14.8718C12.5744 15.189 12.3172 15.4462 12 15.4462H9.12815C8.81093 15.4462 8.55377 15.189 8.55377 14.8718Z"/>
    </svg>

    <span>{listMenu[choseMenu] ? listMenu[choseMenu].label : "" }</span>

    <div class="dropdown-menu-item" style={{display: displayBar ? "block" : "none"}}>
        <ul>
        {listMenu.map((item) => (
          <li key={item.param} onClick={() => { Router.push(urlMenu + item.param) }}>{item.label}<i className={listMenu.indexOf(item) == choseMenu ? "fa-solid fa-check" : ""}></i></li>
        ))}
        </ul>
    </div>

</div>
  )
}

export default ProfileSubMenu
