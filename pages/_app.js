import '../styles/globals.css'
import '../styles/custom.css'
import '../styles/Nakit/Nakit.css'
import '../styles/Nakit/NakitRes.css'
import '../styles/Nakit/Nokit.css'
import '../styles/Nakit/NokitRes.css'
import '../styles/Nav/Menu.css'
import '../styles/Nav/MenuRes.css'
import '../styles/Oth/Modal.css'

import '../styles/Pag/in1.css'
import '../styles/Pag/in1Res.css'
import '../styles/Pag/in2.css'
import '../styles/Pag/in2Res.css'

import '../styles/Pag/in4.css'
import '../styles/Pag/in4Res.css'
import '../styles/Pag/in5.css'
import '../styles/Pag/in5Res.css'
import '../styles/Pag/in6.css'
import '../styles/Pag/in6Res.css'
import '../styles/Pag/in7.css'
import '../styles/Pag/in7Res.css'
import '../styles/Pag/in8.css'
import '../styles/Pag/in8Res.css'

import '../styles/Pag/trackaccount.css'


import '../styles/component/ItemTab.css';
import '../styles/component/ItemTab_Res.css';
import '../styles/component/MemberTab.css';
import '../styles/component/Others.css';
import '../styles/component/ManageHub.css';
import '../styles/component/PopOutMemberPanel.css'
import '../styles/component/BlockHub.css'
import '../styles/component/BlockHub_Res.css'
import '../styles/component/ClusterHub.css'
import '../styles/component/ClusterHub_Res.css'
import '../styles/component/DropDownMenu.css'
import '../styles/component/SheetHub.css'
import '../styles/component/SheetHub_Res.css'
import '../styles/component/Pagination.css'
import '../styles/component/HeadGroup.css'
import '../styles/component/CommentHub.css'
import '../styles/component/ProfileHeader.css'
import '../styles/component/ProfileHeader_Res.css'
import '../styles/component/HorizonMenu.css';
import '../styles/component/VerticalMenu.css';
import '../styles/component/FormAccount.css';
import '../styles/component/NotificationHub.css';
import '../styles/component/TagHub.css';
import '../styles/component/LoadMore.css';
import '../styles/component/InfoThread.css';
import '../styles/component/Article.css';
import '../styles/component/Article_Res.css';
import '../styles/Oth/Dialog.css';
import '../styles/Oth/DialogRes.css';

import '../styles/component/Poll.css';
import '../styles/component/Poll_Res.css';

import '../styles/component/PollLayout.css';

import '../styles/component/SuperPost.css';
import '../styles/component/SuperPost_Res.css';

import '../styles/component/Login.css';
import '../styles/component/Login_Res.css';

import '../styles/component/ItemMag.css'
import '../styles/component/ItemMag_Res.css'
import '../styles/component/Manga.css'
import '../styles/component/Manga_Res.css'

import '../styles/component/Images.css'
import '../styles/component/Images_Res.css'


import React from 'react'
import { useState, useEffect, useRef, memo } from 'react';
import { useRouter } from 'next/router'


export const AppContext = React.createContext();

import Layout from '../components/_layout'
import Main from '../components/_main'

import NextNProgress from 'nextjs-progressbar';
import {isMobile} from 'react-device-detect';

import ErrorBoundary from '../components/Errors/ErrorBoundary'



function MyApp({ Component, pageProps }) {

  const [darkMode, setDarkMode] = useState(String(pageProps.dark_mode) === 'true' ? true : false);

  useEffect(() => {
    if(darkMode) document.body.style.background = "black";
    else document.body.style.background = "rgb(241, 241, 241)";
  },[darkMode]);

  const router = useRouter();
  const retainedComponents = useRef({});
  const isRetainableRoute = router.asPath.includes('/forums') || router.asPath.includes('/category') || router.asPath.includes('/u/') || router.asPath.includes('/news');

  // Add Component to retainedComponents if we haven't got it already
  if (isRetainableRoute && !retainedComponents.current[router.asPath]) {
    const MemoComponent = memo(Component);
    retainedComponents.current[router.asPath] = {
      component: <MemoComponent {...pageProps}  key={router.asPath}/>,
      scrollPos: 0
    }
  }

  // Save the scroll position of current page before leaving
  const handleRouteChangeStart = url => {
    if (isRetainableRoute && retainedComponents.current[router.asPath]) {
      retainedComponents.current[router.asPath].scrollPos = window.scrollY
    }
  }

  // Save scroll position - requires an up-to-date router.asPath
  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart)
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [router.asPath])

  // Scroll to the saved position when we load a retained component
  useEffect(() => {
    if (isRetainableRoute && retainedComponents.current[router.asPath]) {
      window.scrollTo(0, retainedComponents.current[router.asPath].scrollPos)
    }
  }, [Component, pageProps])


  
  useEffect(() => {

    if(router.asPath.includes('/forums') && !router.asPath.includes('/addpost')){
        Object.keys(retainedComponents.current).forEach(function(key,index) {
          if(String(key) === String(router.asPath)){
          }else{
            if(key.includes('/forums'))  delete retainedComponents.current[key] ;
          }
      });
    }

    if(router.asPath.includes('/category')){
      Object.keys(retainedComponents.current).forEach(function(key,index) {
        if(String(key) === String(router.asPath)){
        }else{
          if(key.includes('/category'))  delete retainedComponents.current[key] ;
        }
      });
    }


    if(router.asPath.includes('/news')){
      Object.keys(retainedComponents.current).forEach(function(key,index) {
        if(String(key) === String(router.asPath)){
        }else{
          if(key.includes('/news'))  delete retainedComponents.current[key] ;
        }
      });
    }

    if(router.asPath.includes('/u/')){
      
      let listKeys = [];
      Object.keys(retainedComponents.current).forEach(function(key,index) {
        listKeys.push(String(key))
      });

      listKeys.forEach((element,index) => {
        if(String(element) === String(router.asPath) || index == (listKeys.length - 1) || index == (listKeys.length - 2) || index == (listKeys.length - 3) || index == (listKeys.length - 4)  ){
        }else{
          if(element.includes('/u/'))  delete retainedComponents.current[element];
        }        
      });

    }


    if(String(router.asPath.split('?')[0]) === '/') retainedComponents.current = [];
    
  }, [router.asPath])


  const removeRetainComponent = (key) => {
    delete retainedComponents.current[key];
    return true;
  }


  return(
    <>
    <Main darkMode={darkMode} setDarkMode={setDarkMode}>
        <Layout darkMode={darkMode}>
          <AppContext.Provider value={{removeRetainComponent}} >

              <NextNProgress color="cornflowerblue" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />

              <div>
                <ErrorBoundary>
                <div style={{ display: (isRetainableRoute && retainedComponents.current[router.asPath]) ? 'block' : 'none' }}>
                  {retainedComponents.current !== null ? Object.entries(retainedComponents.current).map(([path, c]) => (
                    <div key={path} style={{ display: router.asPath === path ? 'block' : 'none' }}>
                      {c.component}
                    </div>
                  )) : ""}
                </div>
                {!(isRetainableRoute && retainedComponents.current[router.asPath])  && <Component {...pageProps} key={router.asPath} />}
                </ErrorBoundary>
              </div>

          </AppContext.Provider>
        </Layout>
    </Main>
    </>
  )
  
}

export default MyApp
