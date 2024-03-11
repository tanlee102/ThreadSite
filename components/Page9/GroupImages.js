import React from 'react'
import { env_variable } from '../../env';

const GroupImages = ({data,type}) => {

    const handleCopyClick = async (value) => {
        
        try {
          await navigator.clipboard.writeText(value);
          console.log('Value copied to clipboard:', value);
        } catch (error) {
          console.error('Failed to copy value:', error);
        }
      };

  return (
    <div className='contain-list-image'>
        {data.map((ite, index) => (
            <span key={index} className='item-image'>
              <span>Xóa</span>
              <div>
                <img src={ite.URL}/>
                <span onClick={() => {handleCopyClick(env_variable.URL_IMAGE_CLOUD+'/img/v1/'+ite.useID + String(type==1 ? '.nat' : '.vnt'))}}>
                    <svg viewBox="2 2 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.676 14.248C17.676 15.8651 16.3651 17.176 14.748 17.176H7.428C5.81091 17.176 4.5 15.8651 4.5 14.248V6.928C4.5 5.31091 5.81091 4 7.428 4H14.748C16.3651 4 17.676 5.31091 17.676 6.928V14.248Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.252 20H17.572C19.1891 20 20.5 18.689 20.5 17.072V9.75195" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>{ite.useID}</p>
                </span>
              </div>
            </span>
        ))}
    </div>
  )
}

export default GroupImages
