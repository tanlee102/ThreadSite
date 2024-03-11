import React, { useEffect, useState }  from 'react'
import { hideMainScrollBar } from '../../helper/hideMainScrollBar';

const NokitBox = ({displayBox, setDisplayBox, titleBox, formSelection}) => {


  useEffect(() => {
    hideMainScrollBar(displayBox);
  }, [displayBox]);

  const [chose, setChose] = useState(1);
  const handleChange = (event) => {
    setChose(Number(event.target.value));
  }

  return (
    <div  class={displayBox ? "dialog-confirm dialog-form active-confirm" : "dialog-confirm dialog-form"}>
      <div>
        <div>
            <header> 
              <h3>{titleBox.title}</h3> 
              <i class="fa fa-close" aria-hidden="true" onClick={() => setDisplayBox(false)}></i>
            </header>

            <div class="dialog-msg dialog-nokit"> 

              {titleBox.isChose ? 
                  <select onChange={(e) => {handleChange(e)}} >
                  {formSelection.map((item, index) => (
                      <option key={index} value={item.key}>{item.name}</option>
                  ))}
                  </select> : ""
              }
              <input id='text-nokit-dialog' contentEditable="true" placeholder={titleBox.placeholder}/>
            
            </div>

            <footer>
                <div class="controls"> 
                    <button class="button button-danger doAction button-action-box-nokit" onClick={() => titleBox.func(chose)}>Thêm</button>  
                    <button class="button button-default cancelAction" onClick={() => setDisplayBox(false)}>Hủy</button>
                </div>
            </footer>

        </div>
      </div>
    </div>
  )
}

export default NokitBox
