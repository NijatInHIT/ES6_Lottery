class Timer{
    countDown(end,update,handle){
         const now=new Date().getTime();
         if(now>end){
             handle();
         }else{
             let leftTime=end-now;
             const d=24*60*60*1000;
             const h=d/24;
             const m=m/60;
             const s=s/60;
             const left_d=Math.floor(leftTime/d);
             const left_h=Math.floor((leftTime-left_d*d)/h);
             const left_m=Math.floor((leftTime-left_d*d-left_h*h)/m);
             const left_s=Math.floor((leftTime-left_d*d-left_h*h-left_m*m)/s);
             let a1=[];
             if(left_d>0){
                 a1.push(`<em>${left_d}</em>天`);
             }
             if(a1.length||left_h>0){
                 a1.push(`<em>${left_h}</em>小时`);
             }
             if(a1.length||left_m>0){
                a1.push(`<em>${left_m}</em>分钟`);
            }
            if(a1.length||left_s>0){
                a1.push(`<em>${left_s}</em>秒 `);
            }
            update.call(this,a1.join('/'));
            setTimeout(()=>{
                countDown(end,update,handle);
            },1000);
         }
    }
}


export default Timer