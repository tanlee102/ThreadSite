export const env_variable = {
    
    URL_HOST: 'http://localhost:1000', //SET DOMAIN FOR API

    HOST_COOKIE_NAME: 'localhost',
    
    OLD_HOST_IMAGE: "localhost:4000", 
    URL_OLD_HOST_IMAGE: 'http://localhost:4000/', //SET URL IMAGE AFTER UPLOAD

    HOST_IMAGE: 'localhost:4000',
    URL_HOST_IMAGE: 'http://localhost:4000/', //UPLOAD IMAGE

    RANGESUBFORUM: 12,
    RANGETHREAD: 20,
    RANGEPOST: 10,
    RANGEMSGS: 10,
    RANGEMEMBER: 10,
    RANGEPOSTLINE: 10,
    RANGENOTIFICATION: 10,

    MAX_SUBFORUM_NAME_LENGTH: 130,
    MAX_SUBFORUM_INTRODUCE_LENGTH: 1000,
    MAX_POST_TITLE_LENGTH: 450,
    MAX_POST_LENGTH: 5000,
    MAX_DEFAULT_USER_LENGTH: 350,
    MAX_NAME_USER_LENGTH: 23,
    MAX_NAME_MEMBER_LENGTH: 55,
    MAX_DEFAULT_SEARCH_LENGTH: 90,


    MINUTE_ACCESS_TOKEN: 5,
    NAME_UNTOKEN: 'nah'

};

export const env_Image = (url) => {
    // url = String(url).replace(env_variable.OLD_HOST_IMAGE, env_variable.HOST_IMAGE).replace('http:', 'https:');
    return url;
}

export const env_confirm_log = {

    SUBFORUM: {
        add: "Thêm nhóm",
        delete: "Xóa nhóm",
        update: "Cập nhật nhóm",

        ask_add: "Bạn có muốn thêm nhóm?",
        ask_update: "Bạn có muốn sửa nhóm?",
        ask_delete: "Bạn có muốn xóa nhóm?",

        suc_add: "Thêm nhóm thành công!",
        suc_update: "Cập nhật nhóm thành công!",
        suc_delete: "Xóa nhóm thành công!",
    },

    TOPIC: {
        add: "Thêm chủ đề",
        ask_add: "Bạn có muốn thêm chủ đề?",
        suc_add: "Thêm chủ đề thành công!",
    },

    TAG: {
        add: "Thêm thẻ",
        ask_add: "Bạn có muốn thêm thẻ?",
        suc_add: "Thêm thẻ thành công!",
    },

    LOGOUT: {
        log: "Đăng xuất",
        ask: "Bạn có muốn đăng xuất?",
        ask_another: "Bạn có muốn đăng xuất khỏi thiết bị này?",
        suc: "Đăng xuất thành công!",
    },

    UPDATEACCOUNT: {
        log: "Cập nhật",
        ask: "Bạn có muốn cập nhật tài khoản?",
        suc: "Cập nhật tài khoản thành công!",
    },

    ERRLOG: {
        system: "Đã xảy ra lỗi hệ thống!",
    }
}