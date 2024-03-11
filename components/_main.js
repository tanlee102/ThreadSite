import React ,{ useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { loadCountNotification } from '../data/axios_fetch'

import {env_Image} from '/env';

export const MainContext = React.createContext();

import useStateRef from 'react-usestateref';
import { env_variable } from '../env';
import { removeUserCookie } from '../helper/removeUserCookie';

const Main = ({children, darkMode, setDarkMode}) => {

    const router = useRouter();

    const [countNot, setCountNot] = useState(0);

    const [typeKit, setTypeKit] = useState(false);

    const [logged, setLogged] = useState(false);
    const [userData, setUserData] = useState({
        id: "_",
        avatar: "_", 
        name: "_",
        email: "_",
        user_name: "_",
        logged: false,
    });

    const [replydata, setReplydata] = useState({
        display: false,
        id_user: 0,
        ten_user: "-",
        id_post: 0,
    }); 
    
    useEffect(() => {
        setReplydata({
            display: false,
            id_user: 0,
            ten_user: "-",
            id_post: 0,
        })
    }, [router.asPath])


    useEffect(() => {   
        if(Cookies.get('refresh_token', { domain: env_variable.HOST_COOKIE_NAME }) && Cookies.get('user_package', { domain: env_variable.HOST_COOKIE_NAME })){
            let user_package = JSON.parse(Cookies.get('user_package', { domain: env_variable.HOST_COOKIE_NAME }))
            setUserData({
                avatar: env_Image(user_package.avatar),
                id: user_package.id,
                name: user_package.name,
                email: user_package.email,
                user_name: user_package.user_name,
                logged: true,
                admin: user_package.role
            })
            setLogged(true);
        }else{
            removeUserCookie();
        }
    },[]);


    useEffect(() => {
        if(String(router.asPath).includes('account/5')){
            setCountNot(0);
        }else{
            if(logged === true){
                loadCountNotification({
                    member_id: userData.id,
                }, (code, result) => {
                    if(code == 1){
                        setCountNot(result.data[0].amount);
                    }else{
                        alert(result)
                    }
                });
            }
        }
        if(!String(router.asPath).includes('/search?')){
            document.getElementById('search-bar').value = '';
        }
    }, [router.asPath]);


    const [dataNoKit, setDataNokit, getDataNokit] = useStateRef([
        {text: " ", isBold: false, key: 1},
    ]);


  return (
    <>
        <MainContext.Provider value={{dataNoKit, setDataNokit, getDataNokit, darkMode, setDarkMode, userData, setUserData, logged, countNot, replydata, setReplydata, typeKit, setTypeKit}} >
            {children}
        </MainContext.Provider>
    </>
  )
}

export default Main
