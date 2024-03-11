import React, {useState, useEffect , useRef} from 'react'
import { useSize } from '../../helper/useSize';

const SheetContent = ({content, is_zoom=false, index_}) => {

    const targetRefHeight = useRef();
    const targetRefExp = useRef();
    const [exped, setExped] = useState(false);

    const changeExp = () => {
      targetRefHeight.current.style.maxHeight = '9100px';
      targetRefExp.current.style.display = 'none';
      setExped(true);
    }
  
    const target = useRef(null);
    const size = useSize(target);

    useEffect(() => {
      if(!exped) loadFunction(size);
    }, [size])

    useEffect(() => {
      if(Number(index_) == 0){
        setTimeout(() => {
          changeExp();
        }, 400);
        setTimeout(() => {
          changeExp();
        }, 2000);
        setTimeout(() => {
          changeExp();
        }, 5000);
        setTimeout(() => {
          changeExp();
        }, 8000);
      }
    }, [])

    const loadFunction = (size) => {
      if (target.current) {
        if (size?.height >= (is_zoom ? 201 : 951)) {
          targetRefExp.current.style.display = 'flex';
        }else{
          targetRefExp.current.style.display = 'none';
        }
      }
    }

  return (
    <div className='sheet-content'>
        <div class={is_zoom ? "body-sheet-content body-sheet-content-reply" : "body-sheet-content"} ref={targetRefHeight} >
            <div class={is_zoom ? "zoom-sheet-content-reply root-content-sheet" : "root-content-sheet" }  ref={target} dangerouslySetInnerHTML={{__html: content}}></div>  
        </div>
        <div class={is_zoom ? "expand-sheet-item-reply expand-sheet-item" :  "expand-sheet-item"} ref={targetRefExp} onClick={() => {changeExp()}} > 
            <svg viewBox="0 0 24 24" >
                <path d="M22.987 10.25l-9 7.99c-.57.51-1.28.76-1.99.76s-1.42-.25-1.98-.74c0-.01-.01-.01-.01-.01l-.02-.02-8.98-7.98c-1.24-1.1-1.35-3.002-.25-4.242 1.1-1.24 3-1.35 4.23-.25l7.01 6.23 7.01-6.23c1.24-1.1 3.13-.99 4.24.25 1.1 1.24.98 3.13-.26 4.24z"/>
            </svg>
        </div>
    </div>
  )
  
}

export default SheetContent