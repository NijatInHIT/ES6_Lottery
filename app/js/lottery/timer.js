

class Timer{
    countdown(end,update,handle){
        const now = new Date().getTime();
        const self=this;
        if(now >end){
            handle.call(self);
        }
        else{
            let last_time=end-now;
            const px_d=1000*60*60*24;
            const px_h=1000*60*60;
            const px_m=1000*60;
            const px_s=1000;
            let d = Math.floor(last_time/px_d);
            let h = Math.floor(last_time/px_h-d*24);
            let m = Math.floor((last_time-px_d*d-px_h*h)/px_m);
            let m = Math.floor((last_time-px_d*d-px_h*h-px_m*m)/px_s);
            let r=[];
            if(d>0){
                r.push(`<em>---${d}---</em> day`);
            }
            if(r.length||h>0){
                r.push(`<em>${h}</em> hour`)
            }
            if(r.length||m>0){
                r.push(`<em>${m}</em> min`)
            }
            if(r.length||s>0){
                r.push(`<em>${s}</em> sec`)
            }

            self.last_time=r.join('');
            update.call(self,r.join(''));
            setTimeout(()=>{
                self.countdown(end,update,handle)
            },1000);
        }
    }
}

export default Timer