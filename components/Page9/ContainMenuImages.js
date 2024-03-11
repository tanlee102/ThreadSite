import React, { useContext } from 'react'
import MenuAccount from '../Page4/MenuAccount'
import { LayoutContext } from '../_layout';
import { useRouter } from 'next/router';

const ContainMenuImages = ({deviceType}) => {

    const router = useRouter();
    var id = String(router.query.id);

    const { conFirmFun } = useContext(LayoutContext);

    const listMenuAccount = [
        {label:'Tất cả', url: '/images/main'},
        {label:'Đăng ảnh', url: '/images/upload'},
        {label:'Lưu trữ', url: '/images/storage'},
      ]

  return (

    <MenuAccount conFirmFun={conFirmFun} listMenuAccount={listMenuAccount} idItem={id} deviceType={deviceType}/>

  )
}

export default ContainMenuImages
