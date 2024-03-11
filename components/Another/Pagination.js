import React from 'react'
import Link from 'next/link';

const Pagination = ({total_page, cur_page, thread_id}) => {

  cur_page = Number(cur_page);

  let listx = [];

  if(cur_page != 1)  listx.push('<');

  if(total_page >= 7){

      if(cur_page <= 3){
         listx.push(1);
         listx.push(2);
         listx.push(3);
         listx.push(4);

         listx.push('-');
         listx.push(total_page);
      }else if(total_page - cur_page < 3){
         listx.push(1);
         listx.push('-');

         listx.push(total_page-3);
         listx.push(total_page-2);
         listx.push(total_page-1);
         listx.push(total_page);
      }else{
         listx.push(1);
         listx.push('-');

         listx.push(cur_page-1);
         listx.push(cur_page);
         listx.push(cur_page+1);

         listx.push('-');
         listx.push(total_page);
      }
      
  }else{
    if(total_page !== 1){
      for(let i = 1; i <= total_page; i++){
        listx.push(i)
      }
    }
  }

  if(cur_page != total_page)  listx.push('>');


  const rtnSysbol = (syb) =>{
      if(syb === "<") return <Link href={`/threads/${thread_id}/${cur_page-1}`}><span className='icon-lr-pagination'><svg viewBox="6 5 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 8L10 12L14 16"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></Link>;
      else if(syb === ">") return <Link href={`/threads/${thread_id}/${cur_page+1}`}><span className='icon-lr-pagination'><svg viewBox="6 5 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 16L14 12L10 8"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></Link>;
      else if(syb === "-") return " .. ";
      else return <Link href={`/threads/${thread_id}/${syb}`}><span className={syb==cur_page ? 'chose-btn-pagination' : ''}>{syb}</span></Link>;
  }

  const listItems = listx.map((number) =>
      rtnSysbol(number)
  );





  return (
    <div className="pagination noselect">
          {listItems}
    </div>
  )
}

export default Pagination
