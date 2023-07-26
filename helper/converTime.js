import moment from 'moment';

export const converTime = (time) =>{

    if(time){
    let fromNow = moment(time).fromNow();
    if(fromNow.includes('months') || fromNow.includes('month') || fromNow.includes('years') || fromNow.includes('year')){
      return String(moment(time).calendar());
    }else{
      return fromNow.replace('days', 'ngày')
                    .replace('a day', '1 ngày')
                    .replace('in ', 'trong ')
                    .replace('hours', 'giờ')
                    .replace('an hour', '1 giờ')
                    .replace('minutes', 'phút')
                    .replace('a minute', '1 phút')
                    .replace('a few seconds', 'vài giây')
                    .replace('ago', 'trước')
    }
    }else return ""
    
  }