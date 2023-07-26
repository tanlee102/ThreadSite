import { NextResponse } from 'next/server'
import { loadToken } from './data/fetch';
import { env_variable } from './env';

export async function middleware(req) {
    const response = NextResponse.next();

    let refresh_token = req.cookies.get("refresh_token");
    if(refresh_token){
        let accessToken = req.cookies.get("access_token");
        if(!accessToken){
            accessToken = await loadToken(refresh_token);  
            if(!String(accessToken).includes('unauthorized')){
                response.headers.append("access_token", accessToken);
                response.cookies.set('access_token', accessToken, { path: '/', domain: process.env.HOST_COOKIE_NAME, maxAge: 60 * Number(env_variable.MINUTE_ACCESS_TOKEN)});
            }else{
                response.headers.append("access_token", env_variable.NAME_UNTOKEN);
                response.cookies.set('refresh_token', accessToken, { path: '/', domain: process.env.HOST_COOKIE_NAME, maxAge: 0});
                response.cookies.set('access_token', accessToken, { path: '/', domain: process.env.HOST_COOKIE_NAME, maxAge: 0});
                response.cookies.set('user_package', accessToken, { path: '/', domain: process.env.HOST_COOKIE_NAME, maxAge: 0});
            }
        }
    }else{
        response.headers.append("access_token", env_variable.NAME_UNTOKEN);
    }

    return response
}