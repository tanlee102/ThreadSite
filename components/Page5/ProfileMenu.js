import React from 'react'

import { useRouter } from 'next/router';
import Link from 'next/link';

const ProfileMenu = ({type}) => {

    const router = useRouter();

  return (
    <ul class="horizon-menu">
    
        <Link href={`/u/${router.query.user}/`}>
        <div  className={type == 1 ? "chosen-item-horizon-menu" : "hide"} ><li id="btn-menu-mem-comment">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9703 3.3437C13.0166 2.88543 10.9834 2.88543 9.02975 3.3437C6.20842 4.00549 4.0055 6.20841 3.3437 9.02975C2.88543 10.9834 2.88543 13.0166 3.3437 14.9703C4.0055 17.7916 6.20842 19.9945 9.02975 20.6563C10.9834 21.1146 13.0166 21.1146 14.9703 20.6563C17.7916 19.9945 19.9945 17.7916 20.6563 14.9703C21.1146 13.0166 21.1146 10.9834 20.6563 9.02975C19.9945 6.20842 17.7916 4.00549 14.9703 3.3437ZM12.6219 8.24531C13.0373 7.82988 13.6008 7.59649 14.1883 7.59649C15.4117 7.59649 16.4035 8.58828 16.4035 9.81171C16.4035 10.3992 16.1701 10.9627 15.7547 11.3781L13.255 13.8778C12.0947 15.0381 10.6408 15.8613 9.04889 16.2593L8.56575 16.38C7.99455 16.5228 7.47716 16.0055 7.61996 15.4343L7.74074 14.9511C8.13873 13.3592 8.96189 11.9053 10.1222 10.745L12.6219 8.24531ZM14.1883 8.74523C13.9054 8.74523 13.6342 8.85759 13.4342 9.0576L13.0717 9.42012C13.0359 9.70519 13.1783 10.1031 13.5376 10.4624C13.8969 10.8217 14.2948 10.9641 14.5799 10.9284L14.9424 10.5658C15.1424 10.3658 15.2548 10.0946 15.2548 9.81171C15.2548 9.22271 14.7773 8.74523 14.1883 8.74523ZM13.6171 11.8911C13.2757 11.7409 12.9685 11.5179 12.7253 11.2747C12.4821 11.0315 12.2591 10.7244 12.1089 10.3829L10.9345 11.5573C9.94927 12.5425 9.24245 13.7701 8.88471 15.1153C10.2299 14.7576 11.4575 14.0507 12.4427 13.0655L13.6171 11.8911Z" />
            </svg>
            <span>Nhắn tin</span>
            </li>
        </div>
        </Link>

        <Link href={`/u/${router.query.user}/posts`}>
    <div  className={type == 2 ? "chosen-item-horizon-menu" : "hide"} ><li id="btn-menu-mem-posts">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9703 3.3437C13.0166 2.88543 10.9834 2.88543 9.02975 3.3437C6.20842 4.00549 4.0055 6.20841 3.3437 9.02975C2.88543 10.9834 2.88543 13.0166 3.3437 14.9703C4.0055 17.7916 6.20842 19.9945 9.02975 20.6563C10.9834 21.1146 13.0166 21.1146 14.9703 20.6563C17.7916 19.9945 19.9945 17.7916 20.6563 14.9703C21.1146 13.0166 21.1146 10.9834 20.6563 9.02975C19.9945 6.20842 17.7916 4.00549 14.9703 3.3437ZM8.55377 9.12812C8.55377 8.8109 8.81093 8.55374 9.12815 8.55374H12.9573C13.2745 8.55374 13.5317 8.8109 13.5317 9.12812C13.5317 9.44533 13.2745 9.70249 12.9573 9.70249H9.12815C8.81093 9.70249 8.55377 9.44533 8.55377 9.12812ZM8.55377 12C8.55377 11.6828 8.81093 11.4256 9.12815 11.4256H14.8719C15.1891 11.4256 15.4462 11.6828 15.4462 12C15.4462 12.3172 15.1891 12.5743 14.8719 12.5743H9.12815C8.81093 12.5743 8.55377 12.3172 8.55377 12ZM8.55377 14.8718C8.55377 14.5546 8.81093 14.2975 9.12815 14.2975H12C12.3172 14.2975 12.5744 14.5546 12.5744 14.8718C12.5744 15.189 12.3172 15.4462 12 15.4462H9.12815C8.81093 15.4462 8.55377 15.189 8.55377 14.8718Z"/>
        </svg>
        <span>Bài viết</span>
    </li></div>
    </Link>
    
    <Link href={`/u/${router.query.user}/forums`}>
    <div  className={type == 3 ? "chosen-item-horizon-menu" : "hide"} ><li id="btn-menu-mem-recent"><svg  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path  d="M9.36434 4.76444C10.2311 4.56112 11.1156 4.45946 12 4.45946C12.403 4.45946 12.7297 4.13275 12.7297 3.72973C12.7297 3.32671 12.403 3 12 3C11.0037 3 10.0074 3.11452 9.03105 3.34355C6.209 4.00551 4.00551 6.20899 3.34355 9.03104C2.88548 10.9838 2.88548 13.0162 3.34355 14.969C4.00551 17.791 6.209 19.9945 9.03105 20.6565C10.9838 21.1145 13.0162 21.1145 14.969 20.6565C17.791 19.9945 19.9945 17.791 20.6565 14.969C20.8855 13.9925 21 12.9963 21 12C21 11.597 20.6733 11.2702 20.2703 11.2702C19.8673 11.2702 19.5405 11.597 19.5405 12C19.5405 12.8844 19.4389 13.7689 19.2356 14.6357C18.7002 16.9181 16.9181 18.7002 14.6357 19.2356C12.9021 19.6422 11.0979 19.6422 9.36434 19.2356C7.08194 18.7002 5.29982 16.9181 4.76444 14.6357C4.3578 12.9021 4.3578 11.0979 4.76444 9.36434C5.29982 7.08194 7.08194 5.29982 9.36434 4.76444Z" />
            <path  d="M17.8378 3.48649C16.0914 3.48649 14.6757 4.90223 14.6757 6.64865C14.6757 8.39506 16.0914 9.81081 17.8378 9.81081C19.5843 9.81081 21 8.39506 21 6.64865C21 4.90223 19.5843 3.48649 17.8378 3.48649Z"/>
            </svg><span >Nhóm</span>
            </li>
    </div>
    </Link>

    <Link href={`/u/${router.query.user}/polls`}>
    <div  className={type == 5 ? "chosen-item-horizon-menu" : "hide"} ><li id="btn-menu-mem-recent"><svg viewBox="-1 -1 28 28" >
            <path d="M11.7518706,1.99956021 C13.2716867,1.99956021 14.5037411,3.23161462 14.5037411,4.75143076 L14.5037411,19.2499651 C14.5037411,20.7697812 13.2716867,22.0018356 11.7518706,22.0018356 C10.2320544,22.0018356 9,20.7697812 9,19.2499651 L9,4.75143076 C9,3.23161462 10.2320544,1.99956021 11.7518706,1.99956021 Z M18.7518706,6.99956021 C20.2716867,6.99956021 21.5037411,8.23161462 21.5037411,9.75143076 L21.5037411,19.2499651 C21.5037411,20.7697812 20.2716867,22.0018356 18.7518706,22.0018356 C17.2320544,22.0018356 16,20.7697812 16,19.2499651 L16,9.75143076 C16,8.23161462 17.2320544,6.99956021 18.7518706,6.99956021 Z M4.75187055,11.9995602 C6.27168669,11.9995602 7.5037411,13.2316146 7.5037411,14.7514308 L7.5037411,19.2499651 C7.5037411,20.7697812 6.27168669,22.0018356 4.75187055,22.0018356 C3.23205441,22.0018356 2,20.7697812 2,19.2499651 L2,14.7514308 C2,13.2316146 3.23205441,11.9995602 4.75187055,11.9995602 Z" ></path>
            </svg><span >Thăm dò</span>
            </li>
    </div>
    </Link>

    <Link href={`/u/${router.query.user}/follow`}> 
    <div className={type == 4 ? "chosen-item-horizon-menu" : "hide"} ><li id="btn-menu-mem-info">
        <svg width="24px" height="24px" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
            <path d="M5.30769 7.88571C5.30769 5.73969 7.06411 4 9.23077 4C11.3974 4 13.1538 5.73969 13.1538 7.88571C13.1538 10.0317 11.3974 11.7714 9.23077 11.7714C7.06411 11.7714 5.30769 10.0317 5.30769 7.88571Z" />
            <path d="M6.75123 13.5261L6.91563 13.5001C8.44935 13.2577 10.0122 13.2577 11.5459 13.5001L11.7103 13.5261C13.8714 13.8677 15.4615 15.714 15.4615 17.8816C15.4615 19.0516 14.504 20 13.3228 20H5.13874C3.95755 20 3 19.0516 3 17.8816C3 15.714 4.59016 13.8677 6.75123 13.5261Z" />
            <path d="M14.7692 4C14.3869 4 14.0769 4.307 14.0769 4.68571C14.0769 5.06442 14.3869 5.37143 14.7692 5.37143C16.1712 5.37143 17.3077 6.49711 17.3077 7.88571C17.3077 9.27432 16.1712 10.4 14.7692 10.4C14.3869 10.4 14.0769 10.707 14.0769 11.0857C14.0769 11.4644 14.3869 11.7714 14.7692 11.7714C16.9359 11.7714 18.6923 10.0317 18.6923 7.88571C18.6923 5.73969 16.9359 4 14.7692 4Z" />
            <path d="M15.9149 13.4916C15.5326 13.4916 15.2226 13.7986 15.2226 14.1773C15.2226 14.556 15.5326 14.863 15.9149 14.863H16.8086C16.8829 14.863 16.9573 14.8688 17.0306 14.8804C18.5197 15.1158 19.6154 16.388 19.6154 17.8816C19.6154 18.2942 19.2778 18.6286 18.8613 18.6286H16.9753C16.5929 18.6286 16.283 18.9356 16.283 19.3143C16.283 19.693 16.5929 20 16.9753 20H18.8613C20.0425 20 21 19.0516 21 17.8816C21 15.714 19.4098 13.8677 17.2488 13.5261C17.1032 13.5031 16.9559 13.4916 16.8086 13.4916H15.9149Z"/>
        </svg>
        <span>Theo dõi</span>
    </li></div>
    </Link>
</ul>
  )
}

export default ProfileMenu