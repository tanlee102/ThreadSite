import React from 'react'

const HeadGroup = ({title, button, darkMode, setDisplayModal, setTypeModal, link, actButton}) => {

  const TypeDisplay = () =>{
    if(button == 'none'){
      return " "
    }else{
      if(link == true){
        return <span onClick={() => actButton()}><i class="fa-solid fa-pen-to-square"></i>{button}</span>
      }else{
        return <span onClick={() => {setDisplayModal(true) ; setTypeModal(1)}} ><i class="fa-solid fa-pen-to-square"></i>{button}</span>
      }
    }
  }

  return (
    <div class="head-group" dark-mode={darkMode ? "true" : "false"}>
        <p style={{display: title ? "" : "none"}}>{title}</p>

        {TypeDisplay()}

        {/* {button == 'none'? ' ' :  } <Link href={"/forums/"+subforum+"/addpost"}> */}
    </div>
  )
}

export default HeadGroup
