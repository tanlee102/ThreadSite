import { createAccount, createPasswordAccount, loginAccount, sendForgotMail, sendVerifyMail, updateEmailAccount, updatePasswordAccount } from '../data/axios_fetch';

export const addAccount = (conFirmFun, recaptcha, name, email, password, next) => {
    name = String(name.trim());
    if(name.length >= 2 && name.length <= 70){
        if(email.length >= 3 && email.length <= 50){
            if(password.length >= 8 && password.length <= 70){
                if(recaptcha === null || String(recaptcha)?.length < 11){
                    conFirmFun('Tạo tài khoản', 'Vui lòng nhập Captcha!')
                    next(false,{});  
                }else{

                    setTimeout(() => {
                        createAccount({
                        name: name,
                        email: email,
                        password: password,
                        recaptcha: recaptcha
                        } ,(code, result) => {
                        if(code == 1){
                            next(true,result);
                        }else{
                            conFirmFun('Tạo tài khoản', result.response.data.status)
                            next(false,result);
                        }
                        })
                    },500)   

                }
            }else{
                conFirmFun('Tạo tài khoản', 'Mật khẩu phải ít nhất 8 và không vượt quá 70 ký tự!')
                next(false,{});  
            }
        }else{
            conFirmFun('Tạo tài khoản', 'Email phải ít nhất 3 và không vượt quá 50 ký tự!')
            next(false,{});  
        }
    }else{
        conFirmFun('Tạo tài khoản', 'Tên phải ít nhất 2 và không vượt quá 70 ký tự!')
        next(false,{});  
    }

}




export const verifyMail = (conFirmFun, email, next) => {
        if(email.length >= 3 && email.length <= 50){
            setTimeout(() => {
                sendVerifyMail({
                    email: email,
                } ,(code, result) => {
                    if(code == 1){
                        next(true,result);
                    }else{
                        next(false,result);
                        conFirmFun('Xác minh tài khoản', result.response.data.status)
                    }
                })
            },500)   
        }else{
            conFirmFun('Xác minh tài khoản', 'Email phải ít nhất 3 và không vượt quá 50 ký tự!')
            next(false,{});  
        }
}


export const forgotMail = (conFirmFun, email, next) => {
    if(email.length >= 3 && email.length <= 50){
        setTimeout(() => {
            sendForgotMail({
                email: email,
            } ,(code, result) => {
                if(code == 1){
                    next(true,result);
                }else{
                    next(false,result);
                    conFirmFun('Quên mật khẩu', result.response.data.status)
                }
            })
        },500)   
    }else{
        conFirmFun('Quên mật khẩu', 'Email phải ít nhất 3 và không vượt quá 50 ký tự!')
        next(false,{});  
    }
}


export const login = (conFirmFun, email, password, next) => {
    if(email.length >= 3 && email.length <= 50){
        if(password.length >= 1 && password.length <= 70){
                setTimeout(() => {
                    loginAccount({
                        email: email,
                        password: password
                    } ,(code, result) => {
                        if(code == 1){
                            next(true,result);
                        }else{
                            conFirmFun('Đăng nhập', result.response.data.status)
                            next(false,result);
                        }
                    })
                },500)   
            }else{
                conFirmFun('Đăng nhập', 'Mật khẩu phải ít nhất 1 và không vượt quá 70 ký tự!')
                next(false,{});  
            }
    }else{
        conFirmFun('Đăng nhập', 'Email phải ít nhất 3 và không vượt quá 50 ký tự!')
        next(false,{});  
    }
}




export const changeEmailAccount = (conFirmFun, newemail, password, next) => {
    if(newemail.length >= 3 && newemail.length <= 50){
        if(password.length >= 8 && password.length <= 70){

                setTimeout(() => {
                    updateEmailAccount({
                        newemail: newemail,
                        password: password
                    } ,(code, result) => {
                        if(code == 1){
                            next(true,result);
                        }else{
                            conFirmFun('Thay đổi Email', result.response.data.status)
                            next(false,result);
                        }
                    })
                },500)   

            }else{
                conFirmFun('Thay đổi Email', 'Mật khẩu phải ít nhất 8 và không vượt quá 70 ký tự!')
                next(false,{});  
            }
    }else{
        conFirmFun('Thay đổi Email', 'Email phải ít nhất 3 và không vượt quá 50 ký tự!')
        next(false,{});  
    }

}









export const changePasswordAccount = (conFirmFun, newpassword, password, next) => {

    if(newpassword.length >= 8 && newpassword.length <= 70){

        if(password.length >= 8 && password.length <= 70){

                setTimeout(() => {
                    updatePasswordAccount({
                        newpassword: newpassword,
                        password: password
                    } ,(code, result) => {
                        console.log(result);
                        if(code == 1){
                            next(true,result);
                        }else{
                            conFirmFun('Thay đổi mật khẩu', result.response.data.status)
                            next(false,result);
                        }
                    })
                },500)   


            }else{
                conFirmFun('Thay đổi mật khẩu', 'Mật khẩu hiện tại phải ít nhất 8 và không vượt quá 70 ký tự!')
                next(false,{});  
            }

    }else{
        conFirmFun('Thay đổi mật khẩu', 'Mật khẩu mới phải ít nhất 8 và không vượt quá 70 ký tự!')
        next(false,{});  
    }

}



export const createPassword = (conFirmFun, token, password, next) => {
    if(password.length >= 8 && password.length <= 70){
            setTimeout(() => {
                createPasswordAccount({
                    token: token,
                    password: password
                } ,(code, result) => {
                    if(code == 1){
                        next(true,result);
                    }else{
                        conFirmFun('Đổi mật khẩu', result.response.data.status)
                        next(false,result);
                    }
                })
            },500)   
        }else{
            conFirmFun('Đổi mật khẩu', 'Mật khẩu phải ít nhất 8 và không vượt quá 70 ký tự!')
            next(false,{});  
        }
}