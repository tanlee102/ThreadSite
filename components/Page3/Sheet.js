import React, { useEffect } from 'react'
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
    <>
    {data?.length > 0 ?
        data.map((item, index) => {
          return item.ID === item.RePost_ID && (Number(tagID) == 1 || Number(tagID) == 2)  ?
            <Article 
              data={item}   
    
              removePostBtn={removePostBtn} 
              likePostBtn={likePostBtn} 
              movePostBtn={movePostBtn} >
            </Article> 
            :
            <div key={index} class="sheet-item" >
              <SheetHead item={item} />
              <SheetBody index_={index} item={item} 
                  removePostBtn={removePostBtn} 
                  likePostBtn={likePostBtn} 
                  movePostBtn={movePostBtn}/>
            </div>
        }
      )
    : ""
    }
    </>

  )
}

export default Sheet
