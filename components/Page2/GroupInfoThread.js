import React from 'react'

const GroupInfoThread = ({content}) => {
  return (
    <div className='info-thread'>
        <p>{content.introduce}</p>
        <p>Tạo bởi: <span>{content.name}</span></p>
    </div>
  )
}

export default GroupInfoThread
