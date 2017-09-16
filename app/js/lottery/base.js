
import $ from 'jquery';
class Base{
    initPlayList(){
        this.play_list.set('r2',{
            bonus:6,
            tip:'从01～11中任选2个或多个号码，所选号码与开奖任意两个号码相同，即中奖<em class="red">6</em>元',
            name:'任二'
        })
        .set('r3',{
            bonus:19,
            tip:'从01～11中任选3个或多个号码，所选号码与开奖任意三个号码相同，即中奖<em class="red">19</em>元',
            name:'任三'
        })
        .set('r4',{
            bonus:78,
            tip:'从01～11中任选4个或多个号码，所选号码与开奖任意四个号码相同，即中奖<em class="red">78</em>元',
            name:'任四'
        })
        .set('r5',{
            bonus:540,
            tip:'从01～11中任选5个或多个号码，所选号码与开奖任意五个号码相同，即中奖<em class="red">540</em>元',
            name:'任五'
        })
        .set('r6',{
            bonus:90,
            tip:'从01～11中任选6个或多个号码，所选号码与开奖任意5个号码相同，即中奖<em class="red">90</em>元',
            name:'任六'
        })
        .set('r7',{
            bonus:26,
            tip:'从01～11中任选7个或多个号码，所选号码与开奖任意五个号码相同，即中奖<em class="red">26</em>元',
            name:'任七'
        })
        .set('r8',{
            bonus:9,
            tip:'从01～11中任选8个或多个号码，所选号码与开奖任意五个号码相同，即中奖<em class="red">9</em>元',
            name:'任八'
        });
    }

    initNumber(){
        for(let i=1;i<12;i++){
            this.initNumber.add((i+'').padStart(2,'0'));
        }
    }

    setOmit(omit){
        let self=this;
        self.omit.clear();
        for(let [key,value] of omit.entries()){
            self.omit.set(key,value);
        }
        $(self.omit_el).each((key,value)=>{
            $(item).text(self.omit.get(key));
        });
    }

    setOpenCode(code){
        let self=this;
        self.open_code.clear();
        for(let value of code.values()){
            self.open_code.add(value);
        }
        self.updateOpenCode&&self.updateOpenCode.bind(self,code);
    }

    toggleCodeActive(e){
        let self=this;
        let $cur=$(e.target);   //bu shi currentTarget;
        $cur.toggleClass('btn-boll-active');
        self.getCount();
    }


    changePlayNav(e){
        let self=this;
        let $cur=$(e.target);
        $cur.addClass('active').siblings().removeClass('active');
        $('#zx_sm span').html(self.play_list.get(self.cur_play).tips);
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        self.getCount();
    }

    assistHandle(e){
        e.preventDefault();
        let $cur=$(e.target);
        let self=this;
        let index=$cur.index();
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        if(index===0){
            $('.boll-list .btn-boll').addClass('btn-boll-active');
        }else if(index===1){
            $('.boll-list .btn-boll').each((a,b)=>{
                if(b.textContent>5){     //ying shi zhuan huan 
                    $(b).addClass('btn-boll-active');
                }
            });
        }else if(index===2){
            $('.boll-list .btn-boll').each((a,b)=>{
                if(b.textContent<6){
                    $(b).addClass('btn-boll-active');
                }
            });
        }else if(index===3){
            $('.boll-list .btn-boll').each((a,b)=>{
                if(b.textContent%2===1){
                    $(b).addClass('btn-boll-active');
                }
            })
        }else if(index===4){
            $('.boll-list .btn-boll').each((a,b)=>{
                if(b.textContent%2===0){
                    $(b).addClass('btn-boll-active');
                }
            })
        }
        
        self.getCount();
    }


    getName(){
        return this.name;
    }


    addCode(){
        let self=this;
        let $active=$('.boll-list .btn-boll-active').text().match(/\d{2}/g);
        let active=$active?$active.lenght:0;
        let count=self.computeCount(active,self.cur_play);
        if(count){
            self.addCodeItem($active.join(' '),self.cur_play,self.play_list.get(self.cur_play).name,count);
        }
    }

    



    



    

    
}


export default Base
