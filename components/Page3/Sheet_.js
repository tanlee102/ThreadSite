import React, {useState, useEffect , useRef, useLayoutEffect } from 'react'
import SheetBody from './SheetBody'
import SheetHead from './SheetHead'
import SheetTitle from './SheetTitle'

const Sheet_ = ({data, removePostBtn, likePostBtn, movePostBtn, conFirmFun}) => {
  
  useEffect(() => {
    if(window.twttr){
      const twttr = window.twttr
      twttr.widgets.load();
    }
  }, [])

  return (
    data.map( (item, index) =>
    <div key={index} class="sheet-item">
        <SheetTitle item={item}/>
        
        <SheetHead item={item} /> 
        <SheetBody item={item} 
              removePostBtn={removePostBtn} 
              likePostBtn={likePostBtn} 
              movePostBtn={movePostBtn} /> 
    </div>
    )
  )
}

export default Sheet_
