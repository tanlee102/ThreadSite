import React from 'react'

const LoadMore = ({loadState, setLoadState, btnAct, isborder}) => {
  return (
    <div class={isborder ?  "load-more" : "load-more clear-border"}>
        { (loadState || loadState == -1)?  "" : <div class="button-load-more"><span onClick={() => {setLoadState(true); btnAct()}}>Xem thêm</span></div> }
        { (loadState && loadState !== -1)? <div class="loader-circle"><div></div></div> : ""}
    </div>
  )
}

export default LoadMore