import React, { useContext, useEffect } from 'react'
import CreateRegisterModal from '../components/Another/CreateRegisterModal'
import { useRouter } from 'next/router';
import { MainContext } from '../components/_main';

const Signup = () => {

  const {logged} = useContext(MainContext);
  const router = useRouter();

  useEffect(() => {
    if(logged) router.push("/");
  },[logged])

  return (
    <div className='contain-login-layout'>
      <CreateRegisterModal></CreateRegisterModal>
    </div>
  )
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;  

  return { 
    props: 
    { 
       dark_mode
    },
  }
}

export default Signup
