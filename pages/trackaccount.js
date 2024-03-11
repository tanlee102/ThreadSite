import React from 'react'
import Meta from '../components/Meta'
import Cookies from 'js-cookie'

import { loadTrackUser } from '../data/fetch'

const Trackaccount = ({datas}) => {

  console.log(datas)

    const loginBtn = () => {

        var result = datas.find(obj => { return obj.Member_ID == document.getElementById('list-track-account').value })


        result.role = result.MemberRole_ID;
        result.id = result.ID;

        console.log(result)

        Cookies.set('user_package', JSON.stringify(result), { expires: 30});
        // Cookies.set('name', result.name, { expires: 30});
        // Cookies.set('user_name', result.user_name, { expires: 30});
        // Cookies.set('user_avatar', result.avatar, { expires: 30});
        // if(result.MemberRole_ID == 1)  Cookies.set( 'grand_admin' , true, { expires: 30});
        Cookies.set('refresh_token', result.refresh_token, { expires: 30 });
        alert("login success!!");
    }

    const removeBtn = () => {
        Cookies.remove('user_package');
        Cookies.remove('refresh_token');
        Cookies.remove('access_token');
    }

  return (
    <div>
      <Meta title={"Track Account"}></Meta>

      <div>

        <select id="list-track-account">

        {
            datas.map((element) =>
            <option key={element.Member_ID} value={element.Member_ID}>
              {element.name}
            </option>
            )
        }

        </select>

        <br></br>

        <button className='btn-track-account' onClick={() => loginBtn()}>Login</button>
        <button className='btn-track-account' onClick={() => removeBtn()}>Logout</button>

      </div>
      
    </div>
  )
}

export async function getServerSideProps(context) {
    const datas = await loadTrackUser();
    return {
      props: {
        datas,
       }
    }
  }

export default Trackaccount
