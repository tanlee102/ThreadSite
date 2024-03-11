import React, { useState, useEffect } from 'react'
import { addBanMember, removeBanMember, addBlockMember, removeBlockMember, deleteActivity } from '../../data/axios_fetch';


export default class {
    
    constructor(isblock, isban,conFirmFun,idMember) {
      this.Block = isblock;
      this.Ban = isban;
      this.conFirmFun = conFirmFun;
      this.idMember = idMember;
    }

    removeActivity = (time) => {
        this.conFirmFun("Quản lý", "Bạn có muốn xóa hoạt động?",() => {
            this.conFirmFun("Quản lý");
            setTimeout(() => {
                deleteActivity({
                    member_id: this.idMember,
                    time: time
                },(code, result) => {
                    if(code == 1){
                        this.conFirmFun("Quản lý", 'Đã xóa hoạt động thành công!!');
                    }else{
                        this.conFirmFun("Quản lý", 'Đã xảy ra lỗi hệ thống!!');
                    }
                });
            },500);
        });
    }


    addBan = () => {
        this.conFirmFun("Quản lý", "Bạn có muốn chặn thành viên này?",() =>{
            this.conFirmFun("Quản lý");
            setTimeout(() => {
                addBanMember({
                    member_id: this.idMember,
                },(code, result) => {
                    if(code == 1){
                        this.conFirmFun();
                        this.Ban = true;
                    }else{
                        this.conFirmFun("Quản lý", 'Đã xảy ra lỗi hệ thống!!');
                    }
                });
            },400);
        });
    }

    removeBan = () => {
        this.conFirmFun("Quản lý", "Bạn có muốn bỏ chặn thành viên này?", () => {
            this.conFirmFun("Quản lý");
            setTimeout(() => {
                removeBanMember({
                    member_id: this.idMember,
                },(code, result) => {
                    if(code == 1){
                        this.Ban = false;
                        this.conFirmFun();
                    }else{
                        this.conFirmFun("Quản lý", 'Đã xảy ra lỗi hệ thống!!');
                    }
                });
            },400)
        })
    }


    addBlock = () => {
        if(this.Block == -1){
            this.conFirmFun("Thành viên", 'Not Work!!');
        }else{
            this.conFirmFun("Thành viên", "Bạn có muốn chặn thành viên này? Nếu bị chặn họ sẽ: </br> - Không được đăng bài trong các nhóm của bạn. </br> - Không được trả lời và thích các bài viết trong tương lai của bạn.",() => {
                this.conFirmFun("Thành viên");
                setTimeout(() => {
                    addBlockMember({
                        member_id: this.idMember,
                    },(code, result) => {
                        if(code == 1){
                            this.conFirmFun();
                            this.Block = true;
                        }else{
                            this.conFirmFun("Thành viên", 'Đã xảy ra lỗi hệ thống!!');
                        }
                    });
                },500);
            });
        }
    }


    removeBlock = () => {
        this.conFirmFun("Thành viên", "Bạn có muốn bỏ chặn thành viên này?", () => {
            this.conFirmFun("Thành viên");
            setTimeout(() => {
                removeBlockMember({
                    member_id: this.idMember,
                },(code, result) => {
                    if(code == 1){
                        this.Block = false;
                        this.conFirmFun();
                    }else{
                        this.conFirmFun("Thành viên", 'Đã xảy ra lỗi hệ thống!!');
                    }
                });
            },500);
        });
    }

};