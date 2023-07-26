import React, { useEffect } from 'react'
import { hideMainScrollBar } from '../../helper/hideMainScrollBar';

const PreviewBox = ({setDisplayBox, displayBox , data}) => {

  useEffect(() => {
    hideMainScrollBar(displayBox);
  }, [displayBox]);

  return (
    <div  class={displayBox ? "dialog-confirm dialog-preview dialog-form active-confirm" : "dialog-confirm dialog-form"}>
      <div>
        <div>

            <header> 
              <h3>Xem trước</h3> 
              <i class="fa fa-close" aria-hidden="true" onClick={() => setDisplayBox(false)}></i>
            </header>

            <div class="dialog-msg"> 
                {data.type ? 
                  <div class="root-content-article" dangerouslySetInnerHTML={{ __html: data.data }}>

                  </div>
                  : 
                  <div class="root-content-sheet" dangerouslySetInnerHTML={{ __html: data.data }}>

                  </div>
                }
            </div>

            <footer>
                <div class="controls"> 
                    <button class="button button-danger doAction" onClick={() => {data.addPostBtn()}}>Đăng</button>  
                    <button class="button button-default cancelAction" onClick={() => setDisplayBox(false)}>Hủy</button>
                </div>
            </footer>
            
        </div>
      </div>  
    </div>
  )
}

export default PreviewBox
