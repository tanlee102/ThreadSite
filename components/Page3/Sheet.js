import React, {useState, useEffect , useRef, useLayoutEffect } from 'react'
import Article from './Article'
import SheetBody from './SheetBody'
import SheetHead from './SheetHead'

const Sheet = ({data, tagID, removePostBtn, likePostBtn, movePostBtn}) => {

  useEffect(() => {
    if(window.twttr){
      const twttr = window.twttr
      twttr.widgets.load();
    }
  }, [])
  
  return (
    data.map((item, index) => {

      return item.ID === item.RePost_ID && Number(tagID) == 1  ?

        <Article 
          data={item}   

          removePostBtn={removePostBtn} 
          likePostBtn={likePostBtn} 
          movePostBtn={movePostBtn} >
        </Article> 
        :
        <div key={index} class="sheet-item" >
          <SheetHead item={item} />
          <SheetBody item={item} 
              removePostBtn={removePostBtn} 
              likePostBtn={likePostBtn} 
              movePostBtn={movePostBtn}/>
        </div>

    }
  )
  )
}

export default Sheet
