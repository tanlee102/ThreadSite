import React, { useContext, useEffect } from 'react'
import CreateLoginModal from '../components/Another/CreateLoginModal'
import { MainContext } from '../components/_main';
import { useRouter } from 'next/router';

const Login = () => {

  const {logged} = useContext(MainContext);
  const router = useRouter();

  useEffect(() => {
    if(logged) router.push("/");
  },[logged])

  return (
    <div className='contain-login-layout'>
      <CreateLoginModal></CreateLoginModal>
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

export default Login

