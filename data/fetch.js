import {  setCookie} from 'cookies-next';
import { env_variable } from '/env'

async function createLoad(url){
    const res = await fetch(url);
    try {
        const data = await res.json();
        return data;
    } catch (err) {
        return []
    }
}

async function createLoadAuth(url, token){
    const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'MyBro ' + token,
        }
      })

    try {
        const data = await res.json();
        return data;
    } catch (err) {
        return []
    }
}

async function createLoadToken(url, body){
    const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

    try {
        const data = await res.json();
        return data;
    } catch (err) {
        return {accessToken: 'unauthorized'}
    }
}





export async function loadColorList() {
    return await createLoad(env_variable.URL_HOST+'/colorlist');
}
export async function loadTagThread() {
    return await createLoad(env_variable.URL_HOST+'/tagthread');
}
export async function loadCategory() {
    return await createLoad(env_variable.URL_HOST+'/category');
}






export async function loadTopSubForum(token) {
    return await createLoadAuth(env_variable.URL_HOST+'/subforum/top',token);
}
export async function loadListSubForum(sorting_setting, category_id, subforum_id, page, token) {
    return await createLoadAuth(env_variable.URL_HOST+'/subforum/get?category_id='+category_id+'&sorting_setting='+sorting_setting+'&page='+page+'&subforum_id='+subforum_id, token);
}
export async function loadMemberSubForum(member_id, subforum_id, token) {
    return await createLoadAuth(env_variable.URL_HOST+'/subforum/member/get?member_id='+member_id+'&subforum_id='+subforum_id, token);
}
export async function loadListSearchSubForum(search, page,token) { //search
    return await createLoadAuth(env_variable.URL_HOST+'/subforum/list/search?page='+page+'&search='+search, token);
}
export async function loadInfoAddPost(subforum_id ,token) { //search
    return await createLoadAuth(env_variable.URL_HOST+'/subforum/info/addpost?subforum_id='+subforum_id, token);
}


//thread//////////////
export async function loadLatestThread() { //home
    return await createLoad(env_variable.URL_HOST+'/thread/latest/');
}

export async function loadThreadHead(subforum_id, token) { //home
    return await createLoadAuth(env_variable.URL_HOST+'/thread/head/?subforum_id='+subforum_id, token);
}

export async function loadThreadOther(sorting_setting, subforum_id, thread_id, page, token) { //forums
    return await createLoadAuth(env_variable.URL_HOST+'/thread/others/?subforum_id='+subforum_id+'&sorting_setting='+sorting_setting+'&page='+page+'&thread_id='+thread_id, token);
}

export async function loadListLatestThread(cur_thread_id,token) { //news
    return await createLoadAuth(env_variable.URL_HOST+'/thread/list/latest?cur_thread_id='+cur_thread_id, token);
}

export async function loadListTopThread(page,token) { //news
    return await createLoadAuth(env_variable.URL_HOST+'/thread/list/top?page='+page, token);
}

export async function loadListSearchThread(search, page,token) { //search
    return await createLoadAuth(env_variable.URL_HOST+'/thread/list/search?page='+page+'&search='+search, token);
}






///post///////////////
export async function loadPosts(thread_id, page, token) { //threads
    return await createLoadAuth(env_variable.URL_HOST+'/post?thread_id='+thread_id+'&page='+page, token);
}

export async function loadLike(thread_id, page, token) { //threads
    return await createLoadAuth(env_variable.URL_HOST+'/post/get/like?thread_id='+thread_id+'&page='+page, token);
}

export async function loadIndexPost(post_id) { //threads
    return await createLoad(env_variable.URL_HOST+'/post/index?post_id='+post_id);
}

export async function loadNewPost(cur_post_id, token) { //manage
    return await createLoadAuth(env_variable.URL_HOST+'/post/manage/list?cur_post_id='+cur_post_id, token);
}

export async function loadNewFeed(token) { //news
    return await createLoadAuth(env_variable.URL_HOST+'/post/newfeed', token);
}





////member
export async function loadHeadInfo(user_name, token) { //member
    return await createLoadAuth(env_variable.URL_HOST+'/member/headinfo?user_name='+user_name, token);
}

export async function loadListMember(sorting_setting, user_id) { //members
    return await createLoad(env_variable.URL_HOST+'/member/list?sorting_setting='+sorting_setting+'&user_id='+user_id);
}

export async function loadFollower(member_id,page,token) { //member
    return await createLoadAuth(env_variable.URL_HOST+'/member/follower/?member_id='+member_id+'&page='+page, token);
}
export async function loadFollowed(member_id,page,token) { // member / account
    return await createLoadAuth(env_variable.URL_HOST+'/member/followed/?member_id='+member_id+'&page='+page, token);
}

export async function loadPostTimeline(member_id,page) {  //member
    return await createLoad(env_variable.URL_HOST+'/member/posts/timeline?member_id='+member_id+'&page='+page);
}
export async function loadPostLiked(member_id,page,token) { //member
    return await createLoadAuth(env_variable.URL_HOST+'/member/posts/liked?member_id='+member_id+'&page='+page, token);
}

export async function loadNewMember(sorting_setting, search, page, token) { //manage
    return await createLoadAuth(env_variable.URL_HOST+'/member/manage/list/?sorting_setting='+sorting_setting+'&page='+page+'&search='+search, token);
}

export async function loadListSearchMember(search, page,token) { //search
    return await createLoadAuth(env_variable.URL_HOST+'/member/list/search?page='+page+'&search='+search, token);
}

export async function loadBlocked(page, token) { // member / account
    return await createLoadAuth(env_variable.URL_HOST+'/member/block/list?page='+page, token);
}






///user
export async function loadDetailUser(token) {
    return await createLoadAuth(env_variable.URL_HOST+'/user/detail', token);
}
export async function loadAllLogged(refresh_token,token) {
    return await createLoadAuth(env_variable.URL_HOST+'/user/list/logged?refresh_token='+refresh_token, token);
}
export async function loadNotification(page, token) {
    return await createLoadAuth(env_variable.URL_HOST+'/notification?page='+page, token);
}
export async function loadPrivacy(token) {
    return await createLoadAuth(env_variable.URL_HOST+'/user/privacy/get', token);
}
export async function loadTrackUser() {
    return await createLoad(env_variable.URL_HOST+'/user/trackuser/');
}






///message
export async function loadFirstMsgs(member_id,curLoadID) {
    return await createLoad(env_variable.URL_HOST+'/msg/get?member_id='+member_id+'&curLoadID='+curLoadID);
}




//word
export async function loadWordsByBlock(token) {
    return await createLoadAuth(env_variable.URL_HOST+'/word/block/get', token);
}



export async function loadToken(refresh_token) {
    if(refresh_token) {
        let tokens = await createLoadToken(env_variable.URL_HOST+'/user/token' , {refresh_token: refresh_token});
        return tokens.accessToken;
    }else{
        return env_variable.NAME_UNTOKEN;
    }
}