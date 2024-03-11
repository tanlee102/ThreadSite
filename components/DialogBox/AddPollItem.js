import Cookies from 'js-cookie';
import React from 'react'
import { useState, useEffect } from 'react';
import { env_variable } from '../../env';
import { hideMainScrollBar } from '../../helper/hideMainScrollBar';

const AddPollItemBox = ({isDisplay,setIsDisplay, isUpdating, data, setData, keyx, inputUrl, setInputUrl, inputLabel, setInputLabel}) => {

    const handleChangeUrl = event => {
        setInputUrl(event.target.value);
    };

    const handleChangeLabel = event => {
        setInputLabel(event.target.value);
    };

    const handleItems = () => {
        if(inputLabel.length > 0){
            if(isUpdating){
                setData(prevState => {
                    const newState = prevState.map((obj, i) => {
                      if (obj.key === keyx) {
                          return {...obj, url: inputUrl, label: inputLabel};
                      }
                      return obj;
                    });
                    return newState;
                })
            }else{
                setData([...data, {key: Number(keyx)+1, url: inputUrl, label: inputLabel}]);
            }
        }
        setIsDisplay(false)
    };

  useEffect(() => {
    hideMainScrollBar(isDisplay);
  }, [isDisplay]);

  return (
    <div class={isDisplay ? "dialog-confirm active-confirm" : "dialog-confirm"}>
  
        <div>
            <div>

                <header> 
                    <h3> Tạo mục bình chọn </h3> 
                    <i class="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
                </header>

                <div class="dialog-msg dialog-user-name dialog-polling-input"> 
                    <input className='set-placeholder-color' onChange={handleChangeUrl} value={inputUrl} placeholder='URL ảnh (tùy chọn)' type="text" />
                    <input className='set-placeholder-color' onChange={handleChangeLabel} value={inputLabel} placeholder='Nội dung' type="text" />
                </div>
                
                <footer>
                    <div class="controls"> 
                        <button class="button button-danger doAction" onClick={() => {handleItems()}}>Vâng</button>  
                        <button class="button button-default cancelAction" onClick={() => {setIsDisplay(false)}}>Hủy</button> 
                    </div>
                </footer>

            </div>
        </div>

    </div>
  )
}

export default AddPollItemBox
