import React, { useContext } from 'react'
import { MainContext } from '../_main'
import SheetHead from './SheetHead'
import SheetRelyBody from './SheetRelyBody'

const SheetRely = ({addPostBtn}) => {

  const { userData } = useContext(MainContext);


  return (
    <div class="sheet-item">
      
      <SheetHead item={{
                avatar: userData.avatar,
                name: userData.name,
                user_name: userData.user_name
              }}/>
      <SheetRelyBody addPostBtn={addPostBtn}/>

    </div>
  )
}

export default SheetRely
