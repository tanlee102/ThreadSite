import React, { useContext, useState } from 'react'
import { updatePrivacy } from '../../data/axios_fetch';
import { LayoutContext } from '../_layout';

const PrivacyAccount = ({data}) => {

    const { conFirmFun } = useContext(LayoutContext)

    let label = ['Mọi người', 'Nguời bạn theo dõi', 'Không ai']

    const [privacy, setPrivacy] = useState(data);

    let obj = {};

    const updatePrivacyBtn = () => {
        conFirmFun('Riêng tư', 'Bạn có cập nhật riêng tư?', () => {
            conFirmFun('Riêng tư');
            setTimeout(() => {
                updatePrivacy(privacy,(code, result) => {
                  if(code == 1){
                    conFirmFun();
                  }else{
                    alert(result);
                  }
                })
            }, 500)
        })

    }

  return (
    <div class="form-account">
    <dl class="item-select-form-account">
        <dt>Ai có thể nhắn tin trên trang cá nhân:</dt>
        <dd>
            <select onChange={e => {
                    obj = {...privacy};
                    obj['send_message'] = Number(e.target.value);
                    setPrivacy(obj);
                    }}>

                {label.map((item, index) => 
                    <option key={index} value={index} selected={index===data.send_message ? "selected" : "" } >{item}</option>
                )}

            </select>
        </dd>
    </dl>
    <dl class="item-select-form-account">
        <dt>Ai có thể xem danh sách bài viết bạn đã thích:</dt>
        <dd>
            <select onChange={e => {
                    obj = {...privacy};
                    obj['post_liked'] = Number(e.target.value);
                    setPrivacy(obj);
                    }}>
                {label.map((item, index) => 
                    <option key={index} value={index} selected={index===data.post_liked ? "selected" : "" } >{item}</option>
                )}
            </select>
        </dd>
    </dl>
    <dl class="item-select-form-account">
        <dt>Ai có thể xem danh sách người bạn theo dõi:</dt>
        <dd>
            <select onChange={e => {
                    obj = {...privacy};
                    obj['member_following'] = Number(e.target.value);
                    setPrivacy(obj);
                    }}>
                {label.map((item, index) => 
                    <option key={index} value={index} selected={index===data.member_following ? "selected" : "" } >{item}</option>
                )}
            </select>
        </dd>
    </dl>

      <div class="submit-form-account">
        <span onClick={() => updatePrivacyBtn()}><i class="fa-solid fa-floppy-disk"></i> &nbsp;Lưu thay đổi</span>
      </div>
</div>
  )
}

export default PrivacyAccount



    {/* <dl class="item-select-form-account">
        <dt>Start conversations with you:</dt>
        <dd>
            <select>
                <option value="everyone" selected="selected">All visitors</option>
                <option value="members">Members only</option>
                <option value="followed">People you follow</option>
                <option value="none">Nobody</option>
            </select>
        </dd>
    </dl> */}
    {/* <div>
        <span>Hiện tải Diễn đàn chỉ sử dụng phương thức đăng nhập bằng bên thứ 3, nên nếu có vấn đề gì, hãy liên hệ và thông báo với tôi qua key bạn nhập dưới đây:</span>
        <input class="long-text-input-form-account" type="text"/>
      </div> */}