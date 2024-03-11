import axios from 'axios';
import {env_variable} from '/env';
import Cookies from 'js-cookie';

function axiosPost(next, para, url){
    axios.post(url, para)
    .then(function (response) {
        next(1, response);
    })
    .catch(function (error) {
        next(0, error);
    });
}

function axiosGet(next, para, url){
    axios.get(url, para)
    .then(function (response) {
        next(1, response);
    })
    .catch(function (error) {
        next(0, error);
    });
}

function axiosPostAuth(next, para, url, token){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bor ' + token
    }
    axios.post(url, para, {headers: headers})
    .then(function (response) {
        next(1, response);
    })
    .catch(function (error) {
        next(0, error);
    });
}


export function checkToken(next){
    if(Cookies.get('refresh_token')){

    let accessToken = Cookies.get('access_token');
    if(!accessToken) 
    axiosPostAuth((code, result) => {
        if(code == 1){
            accessToken = result.data.accessToken;
            let date = new Date();
            date.setTime(date.getTime() + (60 * 1000 * Number(env_variable.MINUTE_ACCESS_TOKEN)));
            Cookies.set('access_token', accessToken, { expires: date, domain: env_variable.HOST_COOKIE_NAME, path: '/'});
            next(accessToken);
        }else{
            alert('Thất bại trong việc lấy Token!!!');
        }
    }, {refresh_token: Cookies.get('refresh_token')}, env_variable.URL_HOST+'/user/token', env_variable.NAME_UNTOKEN);
    else{
        next(accessToken);
    }

    }else{
        next('nah');
    }
}






export function insertTopic(para, next) {
    axiosPost(next, para, env_variable.URL_HOST+'/category/insert')
}

export function insertTagThread(para, next) {
    axiosPost(next, para, env_variable.URL_HOST+'/tagthread/insert')
}






export function insertSubForum(para ,next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/subforum/insert', accessToken)
    }); 
}

export function updateSubForum(para ,next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/subforum/update', accessToken)
    }); 
}

export function deleteSubForum(para ,next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/subforum/delete', accessToken)
    }); 
}

export function saveSubForum(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/subforum/save', accessToken)
    });
}







// export function loadThreadOthers(para, next) {
//     axiosGet(next, {params: para}, env_variable.URL_HOST+'/thread/others/')
// }

export function createThread(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/thread/create', accessToken)
    }); 
}

export function updatePinThread(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/thread/pin', accessToken)
    }); 
}

export function deleteThread(para ,next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/thread/delete', accessToken);
    });
}










export function createPost(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/post/create', accessToken);
    });
}

export function deletePost(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/post/delete', accessToken);
    });
}

export function likePost(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/post/like', accessToken)
    });
}










export function updateDetailUser(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/user/detail/update', accessToken);
    });
}

export function deleteLogged(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/user/delete/logged', accessToken)
    });
}

export function checkUserName(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/user/username/check', accessToken);
    });
}

export function updateUserName(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/user/username/update', accessToken);
    });
}







export function followMember(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/member/follow', accessToken)
    });
}

export function addBanMember(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/member/manage/ban/add', accessToken)
    });
}

export function removeBanMember(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/member/manage/ban/remove', accessToken)
    });
}

export function addBlockMember(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/member/block/add', accessToken)
    });
}

export function removeBlockMember(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/member/block/remove', accessToken)
    });
}

export function deleteActivity(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/member/activity/delete', accessToken)
    });
}

export function updatePrivacy(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/member/privacy/update', accessToken);
    });
}





export function createMsg(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/msg/create/', accessToken);
    });
}

export function createReMsg(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/msg/re/create/', accessToken);
    });
}

export function loadMsg(para, next) {
        axiosGet(next, {params: para}, env_variable.URL_HOST+'/msg/get/')
}

export function loadReMsg(para, next) {
    axiosGet(next, {params: para}, env_variable.URL_HOST+'/msg/re/get/')
}

export function deleteReMsg(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/msg/re/delete/', accessToken);
    });
}

export function deleteMsg(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/msg/delete/', accessToken);
    });
}





export function loadCountNotification(para, next) {
    axiosGet(next, {params: para}, env_variable.URL_HOST+'/notification/count')
}





//word
export function updateWordsByBlock(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/word/block/update', accessToken)
    });
}



//poll
export function insertPoll(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/poll/add', accessToken);
    });
}
export function deletePoll(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/poll/delete', accessToken);
    });
}
export function upVote(para, next) {
    axiosPost(next, para, env_variable.URL_HOST+'/poll/upvote')
}




//account
export function createAccount(para, next) {
    axiosPost(next, para, env_variable.URL_HOST+'/user/create/account')
}
export function sendVerifyMail(para, next) {
    axiosPost(next, para, env_variable.URL_HOST+'/user/mail/verify')
}
export function sendForgotMail(para, next) {
    axiosPost(next, para, env_variable.URL_HOST+'/user/mail/forgot')
}

export function loginAccount(para, next) {
    axiosPost(next, para, env_variable.URL_HOST+'/user/login/')
}
export function updateEmailAccount(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/user/change/email', accessToken);
    });
}
export function updatePasswordAccount(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/user/change/password', accessToken);
    });
}

export function createPasswordAccount(para, next) {
    axiosPost(next, para, env_variable.URL_HOST+'/user/create/password')
}



//manga
export function insertManga(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/manga/insert', accessToken);
    });
}


//chapter
export function insertChapter(para, next) {
    checkToken((accessToken) => {
        axiosPostAuth(next, para, env_variable.URL_HOST+'/chapter/update', accessToken);
    });
}


//images
export function createLinkLoadPip(para, next) {
    axiosPost(next, para, env_variable.URL_CLOUD+'/api/linkurlpip')
}