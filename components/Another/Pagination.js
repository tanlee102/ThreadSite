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
      if(syb === "<") return <Link href={`/threads/${thread_id}/${cur_page-1}`}><span><i class="fa-solid fa-angle-left"></i></span></Link>;
      else if(syb === ">") return <Link href={`/threads/${thread_id}/${cur_page+1}`}><span><i class="fa-solid fa-angle-right"></i></span></Link>;
      else if(syb === "-") return " .. ";
      else return <Link href={`/threads/${thread_id}/${syb}`}><span className={syb==cur_page ? 'chose-btn-pagination' : ''}>{syb}</span></Link>;
  }

  const listItems = listx.map((number) =>
      rtnSysbol(number)
  );





  return (
    <div class="pagination noselect">
          {listItems}
    </div>
  )
}

export default Pagination
