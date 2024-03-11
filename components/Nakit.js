import React from 'react'

const Nakit = ({saveCacheNakit}) => {

  return (
    <div className="contain">

        <div className="fr-toolbar">

            <button id="btn-bold-align">
                <svg viewBox="-0.5 -0.5 9.3 9.3" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg"> <path d="M0 0v1c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1v1h5.5c1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.44-2.25.27-.34.44-.78.44-1.25 0-1.1-.89-2-2-2h-5zm3 1h1c.55 0 1 .45 1 1s-.45 1-1 1h-1v-2zm0 3h1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-1.5v-3z" /></svg>
            </button>

            <button id="btn-italic-align">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="7 6 41 41"  ><path d="M38,12.3V11c0-1.1-0.9-2-2-2H22c-1.1,0-2,0.9-2,2v2c0,1.1,0.9,2,2,2h0c1.7,0,3,1.6,2.6,3.2L21,35.8 c-0.3,1.3-1.4,2.2-2.6,2.2H16c-1.1,0-2,0.9-2,2v2c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-2c0-1.1-0.9-2-2-2h0c-1.7,0-3-1.6-2.6-3.2 L31,17.2c0.3-1.3,1.4-2.2,2.6-2.2h1.7C36.8,15,38,13.8,38,12.3z"/></svg>
            </button>

            <button id="btn-underline-align">
                <svg viewBox="-45 -20 552 552" xmlns="http://www.w3.org/2000/svg"><path d="M32 64h32v160c0 88.22 71.78 160 160 160s160-71.78 160-160V64h32a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H272a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h32v160a80 80 0 0 1-160 0V64h32a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H32a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm400 384H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/></svg>
            </button>

            <button id="btn-text-height-nakit">
                <svg viewBox="0 -32 574 574" xmlns="http://www.w3.org/2000/svg"><path d="M304 32H16A16 16 0 0 0 0 48v96a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-32h56v304H80a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-40V112h56v32a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zm256 336h-48V144h48c14.31 0 21.33-17.31 11.31-27.31l-80-80a16 16 0 0 0-22.62 0l-80 80C379.36 126 384.36 144 400 144h48v224h-48c-14.31 0-21.32 17.31-11.31 27.31l80 80a16 16 0 0 0 22.62 0l80-80C580.64 386 575.64 368 560 368z"/></svg>
                <span id="text-height-label-nakit"></span>
                <div className="text-height-dropdown-nakit">
                    <div>
                        <ul>
                            <li title="2">small</li>
                            <li title="3" id="chose-text-height-nakit">normal</li>
                            <li title="4">large1</li>
                            <li title="5">large2</li>
                            <li title="-1">unknown</li>
                        </ul>
                    </div>
                </div>
            </button>


            <button id="btn-make-link-nakit" >
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M5.17163025,6.5858 C5.56216,6.97632 5.56215,7.60948 5.17163025,8.00001 L3.75742,9.41422 C2.97637,10.1953 2.97637,11.4616 3.75742,12.2426 C4.53847,13.0237 5.8048,13.0237 6.58584,12.2426 L8.00006,10.8284 C8.39058,10.4379 9.02375,10.4379 9.41427,10.8284 C9.8048,11.219 9.8048,11.8521 9.41427,12.2426 L8.00006,13.6569 C6.43796,15.219 3.9053,15.219 2.3432,13.6569 C0.781107,12.0948 0.781107,9.56211 2.3432,8.00001 L3.75742,6.5858 C4.14794,6.19527 4.78111,6.19527 5.17163025,6.5858 Z M10.5355,5.4645 C10.926,5.85502 10.926,6.48819 10.5355,6.87871 L6.87863,10.5356 C6.4881,10.9261 5.85494,10.9261 5.46441,10.5356 C5.07389,10.145 5.07389,9.51188 5.46441,9.12135 L9.12127,5.4645 C9.51179,5.07397 10.145,5.07397 10.5355,5.4645 Z M13.6568,2.34314 C15.2189,3.90524 15.2189,6.4379 13.6568,8 L12.2426,9.41421 C11.8521,9.80473 11.2189,9.80473 10.8284,9.41421 C10.4379,9.02369 10.4379,8.39052 10.8284,8 L12.2426,6.58578 C13.0236,5.80473 13.0236,4.5384 12.2426,3.75736 C11.4615,2.97631 10.1952,2.97631 9.41416,3.75736 L7.99995,5.1715695 C7.60942,5.56209 6.97626,5.56209 6.58573,5.1715695 C6.19521,4.78105 6.19521,4.14788 6.58573,3.75736 L7.99995,2.34314 C9.56205,0.781046 12.0947,0.781046 13.6568,2.34314 Z"/></svg>
                <span className="mark-head-sheet-nakit"></span>
            </button>


            <button id="btn-make-image-nakit">
                <svg  viewBox="0 -0.1 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>
                <span className="mark-head-sheet-nakit"></span>
            </button>


            <button id="btn-make-quote-nakit">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.691 6.292C5.094 4.771 7.217 4 10 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0 0 6.925 10H10a1 1 0 0 1 1 1v7c0 1.103-.897 2-2 2H3a1 1 0 0 1-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789zM20 20h-6a1 1 0 0 1-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789C16.094 4.771 18.217 4 21 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0 0 17.925 10H21a1 1 0 0 1 1 1v7c0 1.103-.897 2-2 2z"/></svg>
            </button>


            {/* <div className="straight-line-nakit">
                <button id="btn-make-indent-nakit">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M5 2a1 1 0 000 2h9a1 1 0 100-2H5zM8 7a1 1 0 000 2h6a1 1 0 100-2H8zM4 13a1 1 0 011-1h9a1 1 0 110 2H5a1 1 0 01-1-1zM2.707 5.293a1 1 0 00-1.414 1.414L2.586 8 1.293 9.293a1 1 0 001.414 1.414l2-2a1 1 0 000-1.414l-2-2z" /></svg>
                </button> */}
                <button id="btn-make-outdent-nakit">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M5 2a1 1 0 000 2h9a1 1 0 100-2H5zM8 7a1 1 0 000 2h6a1 1 0 100-2H8zM4 13a1 1 0 011-1h9a1 1 0 110 2H5a1 1 0 01-1-1zM3.293 5.293a1 1 0 011.414 1.414L3.414 8l1.293 1.293a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414l2-2z" /></svg>
                </button>
            {/* </div> */}

            <button id="btn-make-sticker-nakit">
                <svg viewBox="-8 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm194.8 170.2C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-13.6-16.3 11-36.7 24.6-20.5 22.4 26.9 55.2 42.2 90.2 42.2s67.8-15.4 90.2-42.2c13.4-16.2 38.1 4.2 24.6 20.5z"/></svg>
            </button>

            <div className="straight-line-nakit">
                <button id="btn-make-numberlist-nakit">
                    <svg  viewBox="20 17 216 216" xmlns="http://www.w3.org/2000/svg"><path d="M227.999,128a12.00028,12.00028,0,0,1-12,12H108a12,12,0,0,1,0-24H215.999A12.00028,12.00028,0,0,1,227.999,128ZM108,76H215.999a12,12,0,0,0,0-24H108a12,12,0,0,0,0,24ZM215.999,180h-108a12,12,0,1,0,0,24h108a12,12,0,0,0,0-24ZM44,71.31543v36.67871a12,12,0,1,0,24,0V52A12,12,0,0,0,50.63379,41.2666l-16,8A12.00091,12.00091,0,0,0,44,71.31543ZM75.55273,172.54492A26.00233,26.00233,0,1,0,30.04785,147.876a12.00025,12.00025,0,0,0,22.10449,9.34961A2.00221,2.00221,0,0,1,56,158a1.958,1.958,0,0,1-.249.97168l-25.35352,33.832A11.99976,11.99976,0,0,0,40,212H68a12,12,0,0,0,0-24H63.98828l11.22363-14.97656C75.3291,172.86719,75.44287,172.707,75.55273,172.54492Z"/></svg>
                </button>
                <button id="btn-make-dotlist-nakit">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2.5,4.5 C3.32843,4.5 4,3.82843 4,3 C4,2.17157 3.32843,1.5 2.5,1.5 C1.67157,1.5 1,2.17157 1,3 C1,3.82843 1.67157,4.5 2.5,4.5 Z M7,2 C6.44772,2 6,2.44772 6,3 C6,3.55228 6.44772,4 7,4 L14,4 C14.5523,4 15,3.55228 15,3 C15,2.44772 14.5523,2 14,2 L7,2 Z M6,8 C6,7.44772 6.44772,7 7,7 L14,7 C14.5523,7 15,7.44772 15,8 C15,8.55229 14.5523,9 14,9 L7,9 C6.44772,9 6,8.55229 6,8 Z M2.5,9.5 C3.32843,9.5 4,8.82843 4,8 C4,7.17157 3.32843,6.5 2.5,6.5 C1.67157,6.5 1,7.17157 1,8 C1,8.82843 1.67157,9.5 2.5,9.5 Z M6,13 C6,12.4477 6.44772,12 7,12 L14,12 C14.5523,12 15,12.4477 15,13 C15,13.5523 14.5523,14 14,14 L7,14 C6.44772,14 6,13.5523 6,13 Z M2.5,14.5 C3.32843,14.5 4,13.8284 4,13 C4,12.1716 3.32843,11.5 2.5,11.5 C1.67157,11.5 1,12.1716 1,13 C1,13.8284 1.67157,14.5 2.5,14.5 Z"/></svg>
                </button>
            </div>


            <div className="straight-line-nakit">
                <button id="btn-left-align-nakit">
                    <svg viewBox="15 18 228 228"  xmlns="http://www.w3.org/2000/svg"><path d="M47.99414,39.99512v176a8,8,0,0,1-16,0v-176a8,8,0,0,1,16,0ZM80,120h96a16.01833,16.01833,0,0,0,16-16V64a16.01833,16.01833,0,0,0-16-16H80A16.01833,16.01833,0,0,0,64,64v40A16.01833,16.01833,0,0,0,80,120Zm136,16H80a16.01833,16.01833,0,0,0-16,16v40a16.01833,16.01833,0,0,0,16,16H216a16.01833,16.01833,0,0,0,16-16V152A16.01833,16.01833,0,0,0,216,136Z"/></svg>
                </button>
                <button id="btn-center-align-nakit">
                    <svg viewBox="15 18 228 228" xmlns="http://www.w3.org/2000/svg"><path d="M224,152v40a16.01833,16.01833,0,0,1-16,16H136v15.99512a8,8,0,0,1-16,0V208H48a16.01833,16.01833,0,0,1-16-16V152a16.01833,16.01833,0,0,1,16-16h72V120H72a16.01833,16.01833,0,0,1-16-16V64A16.01833,16.01833,0,0,1,72,48h48V31.99512a8,8,0,1,1,16,0V48h48a16.01833,16.01833,0,0,1,16,16v40a16.01833,16.01833,0,0,1-16,16H136v16h72A16.01833,16.01833,0,0,1,224,152Z"/></svg>
                </button>
                <button id="btn-right-align-nakit">
                    <svg viewBox="15 18 228 228" xmlns="http://www.w3.org/2000/svg"><path d="M224.00586,39.99512v176a8,8,0,0,1-16,0v-176a8,8,0,0,1,16,0ZM176,48H80A16.01833,16.01833,0,0,0,64,64v40a16.01833,16.01833,0,0,0,16,16h96a16.01833,16.01833,0,0,0,16-16V64A16.01833,16.01833,0,0,0,176,48Zm0,88H40a16.01833,16.01833,0,0,0-16,16v40a16.01833,16.01833,0,0,0,16,16H176a16.01833,16.01833,0,0,0,16-16V152A16.01833,16.01833,0,0,0,176,136Z"/></svg>
                </button>
            </div>


            <div className="pop-nakit">
                <div id="make-image-dropdown-nakit">
                    <div>
                        <input className="make-image-input-nakit"  placeholder="input url" type="text"/>
                        <span id="btn-exe-make-image-nakit" className="btn-dropdown-nakit">insert</span>
                        <span id="btn-exe-cancel-image-nakit"  className="btn-dropdown-nakit">cancel</span>
                    </div>
                </div>

                <div id="make-link-dropdown-nakit">
                    <div>
                        <input className="make-link-input-nakit" placeholder="input label" type="text"/>
                        <input className="make-link-input-nakit"  placeholder="input url" type="text"/>
                        <span  id="btn-exe-make-link-nakit"  className="btn-dropdown-nakit">insert</span>
                        <span  id="btn-exe-cancel-link-nakit"  className="btn-dropdown-nakit">cancel</span>
                    </div>
                </div>
            </div>

        </div>



        <div className="fr-sticker">

            <div className="hz-bar-contain">
                <div className="hz-bar">
                    <div className="hz-bar-zs">
                        <span className="select-item-hz-bar">Minimoji</span>
                        <span>Uncategorized smilies</span>
                        <span>Sub-emotes</span>
                        <span>Extra-emotes</span>
                        <span>Christmas-emotes</span>
                        <span>Risita-moji</span>
                        <span>Onepiecemoji</span>
                        <span>Onepiece nextmoji</span>
                        <span>Pepe smilies</span>
                        <span>Celebrity emotes</span>
                        <span>Memes</span>
                    </div>
                </div>
                <div className="btn-move-hz-bar-left btn-move-hz-bar">
                    <svg version="1.1"  xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 1792 1792"  >
                        <path d="M477.5,996c-55.2-55.2-55.2-139.5,0-194.8c2.8-2.4,2.8-2.4,2.8-2.4l641.6-644.4c55.2-52.4,139.2-52.4,194.4,0 c52.8,55.2,52.8,139.5,0,194.4L764.2,898.4l546.9,547.2c52.4,52.4,52.4,139.5,0,192c-52.8,52.4-139.5,52.4-192,0L477.5,996z"/></svg>
                </div>
                <div className="btn-move-hz-bar-right btn-move-hz-bar">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 1792 1792"  ><path d="M1314.5,796c55.2,55.2,55.2,139.5,0,194.8c-2.8,2.4-2.8,2.4-2.8,2.4l-641.6,644.4c-55.2,52.4-139.2,52.4-194.4,0 c-52.8-55.2-52.8-139.5,0-194.4l552.1-549.7L480.9,346.3c-52.4-52.4-52.4-139.5,0-192c52.8-52.4,139.5-52.4,192,0L1314.5,796z"/></svg>
                </div>
            </div>

            <div id="btn-insert-sticker-nakit">
                <img  src="https://media.discordapp.net/attachments/600935278063910923/615146142556225536/image0.png" className="smilie" alt=":cheers:" title="Cheers    :cheers:"/>
            </div>
                 
        </div>


        {saveCacheNakit ? 
        <div className="fr-text"  id="editable" spellCheck="false" contentEditable="true" onInput={() => saveCacheNakit()}>
            
        </div>

        : 
        
        <div className="fr-text"  id="editable" spellCheck="false" contentEditable="true">

        </div>
        
        }

    </div>
  )
}

export default Nakit
