import React, { useEffect } from 'react'
import { hideMainScrollBar } from '../../helper/hideMainScrollBar';

const ManageWord = ({displayBox, setDisplayBox, setListWord, listWord, updateWords}) => {

    useEffect(() => {
        hideMainScrollBar(displayBox);
    }, [displayBox]);
    
    const addWord = () => {
        if(String(document.getElementById('value-input-dialog-form').value).length > 0){
            setListWord([...listWord, String(document.getElementById('value-input-dialog-form').value)])
            document.getElementById('value-input-dialog-form').value = '';
        }
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            addWord();
        }
    }

  return (
    <div  class={displayBox ? "dialog-confirm dialog-form active-confirm" : "dialog-confirm dialog-form"}>
        <div>
        <div>
            <header> 
              <h3>Từ khóa bị chặn</h3> 
              <i class="fa fa-close" aria-hidden="true" onClick={() => setDisplayBox(false)}></i>
            </header>

            <div class="dialog-msg"> 
                <div className='input-dialog-form'>
                    <input id='value-input-dialog-form' onKeyDown={(e) => _handleKeyDown(e)} /><span  onClick={() => addWord()}>Thêm</span>
                </div>
                <div className='pool-of-words tag-tab'>
                    {listWord.map((item, index) => 
                        <span key={index}>{item}<svg onClick={() => {setListWord(listWord.filter(o => o !== item))}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path></svg></span>
                    )}
                </div>
            </div>
            
            
            <footer>
                <div class="controls"> 
                    <button class="button button-danger doAction" onClick={() => updateWords()}>Cập nhật</button>  
                    <button class="button button-default cancelAction" onClick={() => setDisplayBox(false)}>Hủy</button>
                </div>
            </footer>
        </div>
        </div>
    </div>
  )
}

export default ManageWord
