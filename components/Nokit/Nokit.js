import React, { useEffect, useState } from 'react'
import NokitBox from './NokitBox';
import { Autolinker } from '../../helper/autoLinker';

const Nokit = ({data, setData, onlyImage = false}) => {

    const [key, setkey] = useState(1);

    const [displayBox, setDisplayBox] = useState(false);
    const [titleBox, setTitleBox] = useState({title:"Thêm ảnh", placeholder:"Nhập URL", func: () => {}});
    const [formSelection, setFormSelection] = useState([{key: 1, name: 'Hình ảnh'}, {key: 2, name: 'Video'}]);

    const [afRemove, setAfRemove] = useState(-1);

    const onPaste = (e) => {
        e.preventDefault();
        var text = (e.originalEvent || e).clipboardData.getData('text/plain');
        document.execCommand("insertText", false, text);
    };
    
    const setElementBreak = (element) => {
        if( data.length > 0 && !data[data.length - 1].break) setData([...data, ...[{break: true , key: key+1}, element]])
        else setData([...data, ...[element]])
    }

    const appendImage = () => {
        setDisplayBox(true);
        setTitleBox({title:"Thêm ảnh", placeholder:"Nhập URL", isChose: true, func: (chose) => {

            if(chose == 1){
                setElementBreak({img:document.getElementById('text-nokit-dialog').value.toString(), key: key+2})
                setkey(key+2);
                document.getElementById('text-nokit-dialog').value = "";
                setDisplayBox(false);
            }else{
                setElementBreak({video:document.getElementById('text-nokit-dialog').value.toString(), key: key+2})
                setkey(key+2);
                document.getElementById('text-nokit-dialog').value = "";
                setDisplayBox(false);
            }

        }})
    }

    const appendEmbed = () => {
        setDisplayBox(true);
        setTitleBox({title:"Embed", placeholder:"Nhập đoạn mã",func: () => {
            setElementBreak({embed:document.getElementById('text-nokit-dialog').value.toString(), key: key+2})
            setkey(key+2);
            document.getElementById('text-nokit-dialog').value = "";
            setDisplayBox(false);

            if(window.twttr){
                const twttr = window.twttr
                twttr.widgets.load();
            }
        }});
    }

    const appendText = () => {
        setElementBreak({text: " ", key: key+2})
        setkey(key+2)
    }

    const appendBreak = () => {
        if( data.length > 0 && !data[data.length - 1].break) setData([...data, {break: true, key: key+1}]);
        setkey(key+1)
    }





    const afterRemove = () => {
        setData(data.filter((item, index ) => {
            if(index == afRemove && item.break){
                return false;
            }else return true;
        }));
        setAfRemove(-1);
    };
    
    useEffect(() => {
        if(afRemove !== -1)  afterRemove();
    }, [afRemove])

    const removeItem = (key_) => {
        setData(data.filter((item, index) => {if(Number(item.key) == Number(key_)){ setAfRemove(index - 1) ; return false} else return true;}));        
    }


    const removeListItem = (key_) => {
        setData(data.filter(item => !key_.includes(item.key)));
    }


    const updateBold = (key_, isbold) => {
        setData(prevState => {
          const newState = prevState.map((obj, i) => {
            if (obj.key === key_) {
              return {...obj, isBold: !isbold};
            }
            return obj;
          });
          return newState;
        });
    };

    const updateCenter = (key_, iscenter) => {
        setData(prevState => {
          const newState = prevState.map((obj, i) => {
            if (obj.key === key_) {
              return {...obj, isCenter: !iscenter};
            }
            return obj;
          });
          return newState;
        });
    };

    const updateLink = (event,key_) => {
        setData(prevState => {
            const newState = prevState.map((obj, i) => {
              if (obj.key === key_) {
                  if(String(event.target.innerHTML).length > 0)
                      return {...obj, text: Autolinker(event.target.innerHTML)};
                  else return obj;
              }
              return obj;
            });
            return newState;
        })
    };



  return (
    <>
    <div className='fr-notkit'>

        {data.map((ite, index) => (  

            <div key={ite.key} >

                    {ite.text ? 
                        <div className='fr-text-notkit'>
                            <div onBlur={(event) => updateLink(event,ite.key)} className='text-notkit' style={{fontWeight: ite.isBold ? "bold" : "normal", textAlign: ite.isCenter ? "center" : "left"}} contentEditable="true" onPaste={(e) => onPaste(e)} dangerouslySetInnerHTML={{__html: String(String(ite.text).replace(/\s/g, "")).length>0 ?  ite.text : ""}}  ></div>
                            <svg onMouseDown={(event) => {event.preventDefault(); event.stopPropagation(); removeItem(ite.key);}} viewBox="0 0 47.095 47.095"><path stroke='1' d="M45.363,36.234l-13.158-13.16l12.21-12.21c2.31-2.307,2.31-6.049,0-8.358c-2.308-2.308-6.05-2.307-8.356,0l-12.212,12.21  L11.038,1.906c-2.309-2.308-6.051-2.308-8.358,0c-2.307,2.309-2.307,6.049,0,8.358l12.81,12.81L1.732,36.831   c-2.309,2.31-2.309,6.05,0,8.359c2.308,2.307,6.049,2.307,8.356,0l13.759-13.758l13.16,13.16c2.308,2.308,6.049,2.308,8.356,0  C47.673,42.282,47.672,38.54,45.363,36.234z"/></svg>
                            <svg onClick={() => updateBold(ite.key, ite.isBold)} viewBox="-0.5 -0.5 9.3 9.3" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg"> <path d="M0 0v1c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1v1h5.5c1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.44-2.25.27-.34.44-.78.44-1.25 0-1.1-.89-2-2-2h-5zm3 1h1c.55 0 1 .45 1 1s-.45 1-1 1h-1v-2zm0 3h1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-1.5v-3z"></path></svg>
                            <svg onClick={() => updateCenter(ite.key, ite.isCenter)}  viewBox="4.5 5 15 15"><path d="M9 13H15V17H9V13Z" fill-opacity="0.9" /><path d="M6 7H18V11H6V7Z" /></svg>
                        </div>

                    : ""}


                    {ite.img ? 
                        <div className='fr-image-notkit'>
                            <span onClick={() => removeItem(ite.key)}>
                                <svg viewBox="0 0 47.095 47.095"><path stroke='1' d="M45.363,36.234l-13.158-13.16l12.21-12.21c2.31-2.307,2.31-6.049,0-8.358c-2.308-2.308-6.05-2.307-8.356,0l-12.212,12.21 L11.038,1.906c-2.309-2.308-6.051-2.308-8.358,0c-2.307,2.309-2.307,6.049,0,8.358l12.81,12.81L1.732,36.831  c-2.309,2.31-2.309,6.05,0,8.359c2.308,2.307,6.049,2.307,8.356,0l13.759-13.758l13.16,13.16c2.308,2.308,6.049,2.308,8.356,0  C47.673,42.282,47.672,38.54,45.363,36.234z"/></svg>
                            </span>
                            <img src={ite.img}   
                                    onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    removeListItem([ite.key, ite.key-1]);
                                    alert('Erorr Load Image!!');
                                }}/>
                        </div>
                    : ""}

                    {ite.video ? 
                        <div className='fr-image-notkit'>
                            <span onClick={() => removeItem(ite.key)}>
                                <svg viewBox="0 0 47.095 47.095"><path stroke='1' d="M45.363,36.234l-13.158-13.16l12.21-12.21c2.31-2.307,2.31-6.049,0-8.358c-2.308-2.308-6.05-2.307-8.356,0l-12.212,12.21 L11.038,1.906c-2.309-2.308-6.051-2.308-8.358,0c-2.307,2.309-2.307,6.049,0,8.358l12.81,12.81L1.732,36.831  c-2.309,2.31-2.309,6.05,0,8.359c2.308,2.307,6.049,2.307,8.356,0l13.759-13.758l13.16,13.16c2.308,2.308,6.049,2.308,8.356,0  C47.673,42.282,47.672,38.54,45.363,36.234z"/></svg>
                            </span>
                            
                            <div class="nokit-video">
                                <video controls>
                                    <source src={ite.video} type="video/mp4"/>
                                    Your browser does not support HTML video.
                                </video>
                            </div>

                        </div>
                    : ""}

                    {ite.break ? 
                        <div className='fr-break-notkit'>
                            <span onClick={() => removeItem(ite.key)}>
                                <svg viewBox="0 0 47.095 47.095">
                                    <path stroke='1' d="M45.363,36.234l-13.158-13.16l12.21-12.21c2.31-2.307,2.31-6.049,0-8.358c-2.308-2.308-6.05-2.307-8.356,0l-12.212,12.21
                                        L11.038,1.906c-2.309-2.308-6.051-2.308-8.358,0c-2.307,2.309-2.307,6.049,0,8.358l12.81,12.81L1.732,36.831
                                        c-2.309,2.31-2.309,6.05,0,8.359c2.308,2.307,6.049,2.307,8.356,0l13.759-13.758l13.16,13.16c2.308,2.308,6.049,2.308,8.356,0
                                        C47.673,42.282,47.672,38.54,45.363,36.234z"/>
                                </svg>
                            </span>
                        </div>
                    : ""}

                    {ite.embed ? 
                        <div className='fr-embed-notkit'>
                            <div>
                                <span onClick={() => removeItem(ite.key)}>
                                    <svg viewBox="0 0 47.095 47.095">
                                        <path stroke='1' d="M45.363,36.234l-13.158-13.16l12.21-12.21c2.31-2.307,2.31-6.049,0-8.358c-2.308-2.308-6.05-2.307-8.356,0l-12.212,12.21
                                            L11.038,1.906c-2.309-2.308-6.051-2.308-8.358,0c-2.307,2.309-2.307,6.049,0,8.358l12.81,12.81L1.732,36.831
                                            c-2.309,2.31-2.309,6.05,0,8.359c2.308,2.307,6.049,2.307,8.356,0l13.759-13.758l13.16,13.16c2.308,2.308,6.049,2.308,8.356,0
                                            C47.673,42.282,47.672,38.54,45.363,36.234z"/>
                                    </svg>
                                </span>
                                <div dangerouslySetInnerHTML={{ __html: ite.embed }}>
                                </div>
                            </div>
                        </div>
                    : ""} 
            
            </div>

         ))
        }


        <div className='fr-action-notkit'>

            <span onClick={() => appendBreak()}>
                    <svg viewBox="-1 -1 26 26" >
                        <path d="M2.5 12C2.5 11.5858 2.83579 11.25 3.25 11.25H4.75C5.16421 11.25 5.5 11.5858 5.5 12C5.5 12.4142 5.16421 12.75 4.75 12.75H3.25C2.83579 12.75 2.5 12.4142 2.5 12Z" />
                        <path d="M6.5 12C6.5 11.5858 6.83579 11.25 7.25 11.25H8.75C9.16421 11.25 9.5 11.5858 9.5 12C9.5 12.4142 9.16421 12.75 8.75 12.75H7.25C6.83579 12.75 6.5 12.4142 6.5 12Z" />
                        <path d="M10.5 12C10.5 11.5858 10.8358 11.25 11.25 11.25H12.75C13.1642 11.25 13.5 11.5858 13.5 12C13.5 12.4142 13.1642 12.75 12.75 12.75H11.25C10.8358 12.75 10.5 12.4142 10.5 12Z" />
                        <path d="M14.5 12C14.5 11.5858 14.8358 11.25 15.25 11.25H16.75C17.1642 11.25 17.5 11.5858 17.5 12C17.5 12.4142 17.1642 12.75 16.75 12.75H15.25C14.8358 12.75 14.5 12.4142 14.5 12Z"/>
                        <path d="M18.5 12C18.5 11.5858 18.8358 11.25 19.25 11.25H20.75C21.1642 11.25 21.5 11.5858 21.5 12C21.5 12.4142 21.1642 12.75 20.75 12.75H19.25C18.8358 12.75 18.5 12.4142 18.5 12Z" />
                        <path d="M5 2C4.44772 2 4 2.44772 4 3V7C4 8.104 4.896 9 6 9H18C19.104 9 20 8.104 20 7V3C20 2.44772 19.5523 2 19 2H5Z"/>
                        <path d="M19 22C19.5523 22 20 21.5523 20 21V17C20 15.896 19.104 15 18 15L6 15C4.896 15 4 15.896 4 17L4 21C4 21.5523 4.44772 22 5 22L19 22Z" />
                    </svg>
            </span>

            <span onClick={() => {appendImage()}}>
                <svg viewBox="-32 -32 524 524" >
                    <path d="M427.137,0H32.865C14.743,0,0,14.743,0,32.865v408.543c0,10.253,8.341,18.594,18.594,18.594h408.543
                            c18.122,0,32.865-14.743,32.865-32.865V32.865C460.002,14.743,445.259,0,427.137,0z M139.001,56.001c39.149,0,71,31.851,71,71
                            s-31.851,71-71,71c-39.149,0-71-31.851-71-71C68.001,87.852,99.852,56.001,139.001,56.001z M405.24,393.215
                            c-2.634,4.801-7.675,7.786-13.151,7.786H67.913c-5.477,0-10.518-2.984-13.151-7.786c-2.634-4.802-2.442-10.657,0.501-15.275
                            l77.092-120.984c2.754-4.322,7.524-6.939,12.65-6.939s9.896,2.617,12.65,6.939l37.029,58.111l72.346-113.536
                            c2.754-4.323,7.524-6.939,12.65-6.939c5.125,0,9.896,2.617,12.65,6.939L404.739,377.94
                            C407.682,382.559,407.874,388.414,405.24,393.215z"/>
                </svg>
            </span>
            
            {onlyImage ? "" : <>
            <span onClick={() => {appendEmbed()}}>
                <svg viewBox="0 -64 640 640">
                    <path d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"/>
                </svg>
            </span>

            <span onClick={() => appendText()}>
                <svg viewBox="0 0 537.947 537.947">
                <path d="M268.974,0C120.411,0,0,120.411,0,268.974c0,148.563,120.411,268.973,268.974,268.973s268.973-120.334,268.973-268.973
                    C537.947,120.334,417.537,0,268.974,0z M394.51,286.033c0,11.857-9.715,21.496-21.496,21.496h-64.566v64.566
                    c0,11.857-9.715,21.496-21.496,21.496h-35.878c-11.857,0-21.497-9.715-21.497-21.496v-64.566h-64.566
                    c-11.857,0-21.497-9.715-21.497-21.496v-35.878c0-11.857,9.715-21.497,21.497-21.497h64.566v-64.566
                    c0-11.857,9.715-21.496,21.497-21.496h35.878c11.857,0,21.496,9.715,21.496,21.496v64.566h64.566
                    c11.857,0,21.496,9.716,21.496,21.497V286.033z"/>
                </svg>
            </span>
            </>
            }

        </div>


    </div>
        <NokitBox  formSelection={formSelection} setDisplayBox={setDisplayBox} displayBox={displayBox} titleBox={titleBox}></NokitBox>
    </>
  )
}

export default Nokit
