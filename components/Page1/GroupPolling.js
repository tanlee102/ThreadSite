import React from 'react'
import PollItems from '../Poll/PollItems'
import Link from 'next/link'

const GroupPolling = ({data,darkMode}) => {
  return (
    <div className='block-hub'  dark-mode={String(darkMode)}>
      <div className='block-group remove-third-poll-item'>
          <Link href={'/polls'}>
          <span class="title-block-group">
              <div>
                  <label>Bình chọn</label>
                      <svg viewBox="0 0 240.823 240.823">
                          <path id="Chevron_Right_1_" d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
                              l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
                              C187.881,124.315,187.881,116.495,183.189,111.816z"/>
                  </svg>
              </div>
          </span>
          </Link>
          <PollItems darkMode={darkMode} data={data}></PollItems>
      </div>
    </div>
  )
}

export default GroupPolling
