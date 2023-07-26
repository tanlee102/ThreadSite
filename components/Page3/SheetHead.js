import Link from 'next/link'
import React from 'react'
import {env_Image} from '/env'

const SheetHead = ({item}) => {

  
  return (
        <div class="sheet-item-head">

            <div class="sheet-item-user">

              <Link href={"/u/"+item.user_name+"/"}>
                <a>
                <img src={env_Image(item.medium ?  item.medium  : item.avatar )} alt=""/>
                </a>
              </Link>

              <div>
                {/* {item ? item.role ? <div class="role-user-sheet">{item.role}</div> : "" : ""} */}
                <div class="name-user-sheet">{item ? item.name : ""}</div>
                {item ? item.quote ? <div class="quote-user-sheet">{item.quote}</div> : "" : ""}
              </div>
              
            </div>

              <span class="sheet-item-mark"></span>
        </div>
  )
}

export default SheetHead
