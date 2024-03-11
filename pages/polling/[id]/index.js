import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { converTime } from '../../../helper/converTime';
import Router, { useRouter } from 'next/router';
import { loadPolling } from '../../../data/fetch';
import { deletePoll, upVote } from '../../../data/axios_fetch';
import { env_variable } from '../../../env';

import { LayoutContext } from '../../../components/_layout';
import { MainContext } from '../../../components/_main';

import Meta from '../../../components/Meta';
import Breadcrumb from '../../../components/Another/Breadcrumb'
import PollItems from '../../../components/Poll/PollItems';


const Polling = ({datas}) => {

    const router = useRouter();
    var poll_id = String(router.query.id);

    const breadcrumb = [{label: "Bình chọn", link: "/polls"}];

    const {conFirmFun, setDisplayLoginModel}  = useContext(LayoutContext);
    const {darkMode, userData}  = useContext(MainContext);

    const [choseKey, setChoseKey] = useState(-1);
    const [typeSort, setTypeSort] = useState(false);

    const total_votes = () => {
        let temp_count = 0;
        if(datas.items)
            datas.items.forEach(function(item){
                temp_count = temp_count + Number(item.votes);
            });
        return temp_count;
    }

    const [totalVotes, setTotalVotes] = useState(total_votes())
    const [items, setItems] = useState(datas.items);


    useEffect(() => {
        if(Cookies.get('polling', { domain: env_variable.HOST_COOKIE_NAME })){
            let pre_polling = {}
            pre_polling = JSON.parse(Cookies.get('polling', { domain: env_variable.HOST_COOKIE_NAME }));
            if(pre_polling[poll_id]) setChoseKey(Number(pre_polling[poll_id]));
        }

        if(Cookies.get('low_list', { domain: env_variable.HOST_COOKIE_NAME })){
            let poll_id_list = JSON.parse(Cookies.get('low_list', { domain: env_variable.HOST_COOKIE_NAME }));
            if (!poll_id_list.includes(poll_id)) {
                if(poll_id_list.length > Number(env_variable.MAX_LOW_LIST_LENGTH)) poll_id_list.shift();
                poll_id_list.push(poll_id)
                Cookies.set('low_list', JSON.stringify(poll_id_list), { expires: Number(env_variable.DAY_LOW_LIST_LENGTH), domain: env_variable.HOST_COOKIE_NAME, path: '/' })
            }
        }else{
            Cookies.set('low_list', JSON.stringify([poll_id]), { expires: Number(env_variable.DAY_LOW_LIST_LENGTH), domain: env_variable.HOST_COOKIE_NAME, path: '/' })
        }
        if(items?.length > 7){
            setTimeout(() => {
                sortByVote();
            },100);
        }
    }, []);


    const setUpVote = (id, de_id) => {
        upVote({
            poll_id: poll_id,
            id: id,
            de_id: de_id
          },(code, result) => {
            if(code == 1){
                let polling = {}
                if(Cookies.get('polling', { domain: env_variable.HOST_COOKIE_NAME })){
       
                    polling = JSON.parse(Cookies.get('polling', { domain: env_variable.HOST_COOKIE_NAME }));
                }
                polling[String(poll_id)] = id;

                Cookies.set('polling', JSON.stringify(polling), { expires: Number(env_variable.DAY_POLLING_LIST_LENGTH), domain: env_variable.HOST_COOKIE_NAME, path: '/' })
            }
        })
    }


    const changeChose = (id) => {
        if(choseKey == -1) setTotalVotes(totalVotes + 1);
        setItems(prevState => {
            const newState = prevState.map((obj, i) => {
              if (obj.id === choseKey) {
                  return {...obj, votes: obj.votes - 1};
              }
              if (obj.id === id) {
                return {...obj, votes: obj.votes + 1};
              }
              return obj;
            });
            return newState;
        })
        setUpVote(id, choseKey);
        setChoseKey(id);
    }


    const sortByVote = () => {
        if(typeSort == false){
            const sorted = [...items].sort((a, b) => {
                return b.votes - a.votes;
              });
              setItems(sorted);      
              setTypeSort(true)
        }else{
            const sorted = [...items].sort((a, b) => {
                return a.id - b.id;
              });
              setItems(sorted);      
              setTypeSort(false)
        }
      };


      const deletePollBtn = () => {
        conFirmFun("Bình chọn", "Bạn có muốn xóa bình chọn?", () => {
          conFirmFun("Bình chọn");
          setTimeout(() => {
            deletePoll({
              poll_id: poll_id,
            } ,(code, result) => {
                if(code == 1){
                    Router.push("/polls/");
                  }else{
                    alert(result);
                  }
              conFirmFun();
              
            });
          }, 400);
        });
      }

      const checkMoveAdd = () => {
        if(userData.logged){
            Router.push('/polling/add')
          }else{
            setDisplayLoginModel(true);
          }
      }


     const copyLink = () => {
        conFirmFun('Copy Link');
        navigator.clipboard.writeText(window.location.href);
        setTimeout(() => {
            conFirmFun();
        }, 200);
    }

  return (
    <>
    <Meta title={datas.title + " | " + env_variable.LABEL_TAB_BAR}></Meta>
    <Breadcrumb darkMode={darkMode} datas={breadcrumb} />

    <div>
        <div className='contain-polling-layout'>
            <div onClick={() => {checkMoveAdd()}} className='move-to-page-add-poll-btn' id='move-to-page-add-poll-top-btn'>
                    <div>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4801 4 18.9079 4.21799C19.2842 4.40973 19.5905 4.71547 19.7822 5.0918C20.0002 5.51962 20.0002 6.07967 20.0002 7.19978V16.7998C20.0002 17.9199 20.0002 18.48 19.7822 18.9078C19.5905 19.2841 19.2842 19.5905 18.9079 19.7822C18.4805 20 17.9215 20 16.8036 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Tạo bình chọn</span>
                    </div>
            </div>
            
            <div className='polling-layout' dark-mode={String(darkMode)}>
                <div>     
                    {/* ------------------ */}
                    {datas.member_info ?
                    <div id='contain-title-polling'>
                        <div id='title-polling'>
                            <span>{datas.title}</span>
                            <span className='list-in-line'>
                                <ul>
                                    <Link href={'/u/'+datas.member_info.user_name}>
                                        <li className='cursor-pointer'>{datas.member_info.name}</li>
                                    </Link>
                                    <li class="set-anchor-gray-color">{converTime(datas.time)}</li>
                                </ul>
                            </span>
                        </div>

                        <div className='contain-tag-and-sort' style={{marginTop: datas.tags.length > 0 ? '3px' : '6px'}}>

                            <div id='contain-tag-polling' style={{width: datas.tags.length > 0 ? 'calc(100% - 30px)' : '0.5px'}}>
                                {datas.tags.map((name, index) => 
                                        <span key={index}>{'#'+name}</span>
                                )}
                            </div>
                                            
                            <div onClick={() => sortByVote()} class="sort-polling">
                                <div>
                                {typeSort == true ?
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 7L2 7" stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M8 12H2"  stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M10 17H2" stroke-width="1.5" stroke-linecap="round"/>
                                        <circle cx="17" cy="12" r="5"  stroke-width="1.5"/>
                                        <path d="M17 10V11.8462L18 13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                :
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 8H13"  stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M6 13H13" stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M8 18H13" stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M17 20V4L20 8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                    : ''}
                    {/* ------------------ */}

                    <div>
                        <div className='polling-bars' dark-mode={String(darkMode)}>
                            {items ?
                            items.length < 3 && items[0].url !== '' ?

                            <div className='con-ite-polling'>
                            { items.map((item, index) => (
                                <div key={index} className='it-polling'>
                                    <span onClick={() => {choseKey !== item.id ? changeChose(item.id) : null}} className={choseKey==item.id ? 'ite-polling chosing-ite-polling' : 'ite-polling'}>
                                        <img src={item.url} />
                                        <span style={{height:""+(Number(item.votes)/totalVotes)*100+"%"}} className='veil-ite-polling'></span>
                                        <div className='votes-ite-polling'><p>{item.votes}</p></div>
                                    </span>   
                                    <div className='label-it-polling'>{item.label}</div>
                                </div>
                            ))}
                            </div>

                            :

                            items.map((item, index) => (
                                <div key={index} onClick={() => {choseKey !== item.id ? changeChose(item.id) : null}} className={ choseKey==item.id ? 'chosing-item-polling item-polling' : 'item-polling'}>
                                    
                                    {item.url === '' ? 
                                        <div style={{width:""+(Number(item.votes)/totalVotes)*100+"%"}} className='filled-bar'></div>
                                    :
                                        <div className='containt-fill-bar'>
                                            <div></div>
                                            <div>
                                                <div style={{width:""+(Number(item.votes)/totalVotes)*100+"%"}} className='filled-bar'></div>
                                            </div>
                                        </div>
                                    }
                                    
                                    <div>
                                        {item.url === '' ? 
                                                <span style={{width: '0px', margin: '0px 5px 0 0 '}}></span>
                                                :
                                                <span>
                                                    <img src={item.url}></img>
                                                </span>
                                        }
                                        <span style={{ width: item.url === '' ? 'calc(100% - 50px)' : 'calc(100% - 95px)'}}><p>{item.label}</p></span>
                                        <span>{item.votes}</span>
                                    </div>
                                </div>
                            ))

                            : ''}
                        </div>
                    </div>

                    {/* ------------------ */}

                </div>

                <div class="sheet-item-button polling-item-bottom">
                    <span>Báo cáo</span>
                    <span onClick={() => {copyLink()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-13 -40 240 240"><path d="M179.617,15.453c-0.051-0.05-0.102-0.1-0.154-0.149c-18.689-18.549-48.477-20.463-69.37-4.441 c-2.091,1.599-3.776,3.053-5.302,4.575c-0.044,0.044-0.087,0.088-0.13,0.133L71.224,49.012c-2.929,2.929-2.929,7.678,0.001,10.606 c2.93,2.93,7.679,2.929,10.606-0.001l33.561-33.566c0.035-0.035,0.069-0.07,0.104-0.105c1.023-1.01,2.205-2.02,3.715-3.174 c15.008-11.508,36.411-10.098,49.789,3.281c0.044,0.044,0.089,0.088,0.134,0.131c14.652,14.786,14.611,38.742-0.124,53.483 l-33.559,33.563c-2.929,2.929-2.929,7.678,0.001,10.606c1.465,1.464,3.384,2.196,5.303,2.196c1.919,0,3.839-0.732,5.304-2.197 l33.56-33.563C200.241,69.641,200.241,36.077,179.617,15.453z"></path><path d="M113.23,135.437l-33.541,33.542c-0.066,0.067-0.132,0.136-0.196,0.205c-3.708,3.648-8.059,6.449-12.945,8.333 c-13.995,5.418-29.888,2.07-40.481-8.524c-14.768-14.784-14.768-38.84,0-53.619L59.624,81.83c1.406-1.407,2.197-3.315,2.197-5.305 v-0.013c0-4.143-3.357-7.494-7.5-7.494c-2.135,0-4.062,0.895-5.428,2.328l-33.435,33.422c-20.61,20.628-20.612,54.195-0.002,74.828 c10.095,10.097,23.628,15.479,37.411,15.479c6.414-0.001,12.884-1.167,19.084-3.566c6.922-2.667,13.088-6.67,18.326-11.896 c0.076-0.075,0.15-0.153,0.223-0.232l33.337-33.337c2.929-2.93,2.929-7.678-0.001-10.607 C120.909,132.509,116.16,132.509,113.23,135.437z"></path><path d="M59.15,135.908c1.465,1.465,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196l66.164-66.161 c2.93-2.929,2.93-7.678,0.001-10.606c-2.929-2.93-7.678-2.929-10.606-0.001l-66.164,66.161 C56.221,128.23,56.221,132.979,59.15,135.908z"></path></svg>
                        Link
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 25 25"><path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path></svg>
                    </span>

                    {Number(userData.id) === Number(datas.id_user) || userData.admin ? 
                        <span onClick={() => {deletePollBtn()}}>
                            <svg style={{marginRight: "2px", marginTop: "-1px"}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6.52381C3 6.12932 3.32671 5.80952 3.72973 5.80952H8.51787C8.52437 4.9683 8.61554 3.81504 9.45037 3.01668C10.1074 2.38839 11.0081 2 12 2C12.9919 2 13.8926 2.38839 14.5496 3.01668C15.3844 3.81504 15.4756 4.9683 15.4821 5.80952H20.2703C20.6733 5.80952 21 6.12932 21 6.52381C21 6.9183 20.6733 7.2381 20.2703 7.2381H3.72973C3.32671 7.2381 3 6.9183 3 6.52381Z"/>
                            <path d="M11.6066 22H12.3935C15.101 22 16.4547 22 17.3349 21.1368C18.2151 20.2736 18.3052 18.8576 18.4853 16.0257L18.7448 11.9452C18.8425 10.4086 18.8913 9.64037 18.4498 9.15352C18.0082 8.66667 17.2625 8.66667 15.7712 8.66667H8.22884C6.7375 8.66667 5.99183 8.66667 5.55026 9.15352C5.1087 9.64037 5.15756 10.4086 5.25528 11.9452L5.51479 16.0257C5.69489 18.8576 5.78494 20.2736 6.66513 21.1368C7.54532 22 8.89906 22 11.6066 22Z"/>
                            </svg>
                            Xóa
                        </span>
                        :
                        <span className='erase-but-exist'></span>
                    }
                </div>

            </div>

            <div className='polling-list'>
                <div onClick={() => {checkMoveAdd()}} className='move-to-page-add-poll-btn' id='move-to-page-add-poll-bottom-btn'>
                    <div>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4801 4 18.9079 4.21799C19.2842 4.40973 19.5905 4.71547 19.7822 5.0918C20.0002 5.51962 20.0002 6.07967 20.0002 7.19978V16.7998C20.0002 17.9199 20.0002 18.48 19.7822 18.9078C19.5905 19.2841 19.2842 19.5905 18.9079 19.7822C18.4805 20 17.9215 20 16.8036 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Tạo bình chọn</span>
                    </div>
                </div>
                <PollItems darkMode={darkMode} isShowEmpty={false} data={datas.recommend_list}></PollItems>
            </div>
        
        </div>
    </div>  
    <Breadcrumb darkMode={darkMode} datas={breadcrumb} />  
    </>
  )
}

export async function getServerSideProps(context) {

    const cookies = context.req.cookies;
    let dark_mode = cookies.dark_mode ? cookies.dark_mode : process.env.DEFAULT_DARK_MODE;

    let accessToken = cookies.access_token;
    if(!accessToken) accessToken = context.res.getHeaders().access_token;

    let low_list = cookies.low_list ? cookies.low_list : [];
    if(low_list.length > 0)
        low_list = JSON.parse(low_list).toString();
  
    const datas = await loadPolling(context.params.id, low_list);
  
    return {
      props: {
        datas, dark_mode
       }
    }
}

export default Polling