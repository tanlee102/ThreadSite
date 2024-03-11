import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router'

import { env_confirm_log } from '../../env'
import { removeUserCookie } from '../../helper/removeUserCookie';
import { MainContext } from '../_main';

const MenuAccount = ({conFirmFun, listMenuAccount, idItem, deviceType}) => {


    const [label, setLabel] = useState("");

    const {userData} = useContext(MainContext)
    const [showItemMenuAccount, setShowItemMenuAccount] = useState(!deviceType);
    
    const pickMenu = (url) => {
        if(String(url).includes(idItem)){  
            return {
                backgroundColor: "rgb(70, 70, 158)",
                color: "white"
            }
        }
    }


    const [window_, setWindow_] = useState(0);
    const { width } = useWindowDimensions();

    useEffect(() => {
        setLabel(String((listMenuAccount.find(e => String(e.url).includes(idItem)))?.label));
        
        if (typeof window !== "undefined") {
            setWindow_(window);
        }
        setTimeout(() => {
            if (typeof window !== "undefined" && window_ == 0) {
                setWindow_(window);
            }
        }, 1300);
        
        if (window.innerWidth <=  800){
            if(showItemMenuAccount == true) setShowItemMenuAccount(false);
        }else{
            if(showItemMenuAccount == false) setShowItemMenuAccount(true);
        }
    }, []);

    function useWindowDimensions() {
        const [width, setWidth] = React.useState(window_.innerWidth);
      
        const updateWidthAndHeight = () => {
          setWidth(window_.innerWidth);
        };

        useEffect(() => {
          window.addEventListener("resize", updateWidthAndHeight);
          return () => window.removeEventListener("resize", updateWidthAndHeight);
        });
      
        return {
          width,
        }
    }

    useEffect(() => {
        if(width > 800){
            if(showItemMenuAccount !== true)
            setShowItemMenuAccount(true); 
        }
    }, [width]);


    const logoutBtn = () => {
        conFirmFun(env_confirm_log.LOGOUT.log,env_confirm_log.LOGOUT.ask,() => {
            removeUserCookie();
            Router.reload('/');
        })
    }


  return (
    <div class="vertical-menu" onResize={() => {onResizex()}}>

    <button id="expand-vertical-menu" onClick={() => {setShowItemMenuAccount(!showItemMenuAccount)}}>

      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="black" class="bi bi-list" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
      </svg>
    </button>

    <p>{label}</p>

    <div class="item-vertical-menu" style={{display: showItemMenuAccount ? "block" : "none"}}>

        <ul>
            {listMenuAccount.map((item, index) => 
                <Link key={index} href={item.url}><li style={pickMenu(item.url)}>{item.label}</li></Link>
            )}
            {userData.logged ? <li onClick={() => logoutBtn()} >Đăng xuất</li> : ""}
        </ul>

    </div>

  </div>
  )
}

export default MenuAccount
