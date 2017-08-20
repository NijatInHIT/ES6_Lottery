
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
        for(var i=1;i<12;i++){
            this.number.add((''+1).padStart(2,'0'));
        }
    }

    setOmit(omit){
        let self=this;
        self.omit.clear();
        for(let [index,item] of omit.entries()){
            self.omit.set(index,item);
        }
        $(self.omit_el).each((index,item)=>{
            $(itm).text(self.omit.get(index));
        });
    }

    setOpenCode(code){                                         //set map  
        let self=this;
        self.open_code.clear();
        for(let item of code.value()){
            self.open_code.add(item);
        }
        self.updateOpenCode&&self.updateOpenCode.call(self,code);
    }

    toggleCodeActive(e){  //           号码选中与取消
        let self =this;
        let $cur=$(e.currentTarget);
        $cur.toggleClass('btn-boll-active');
        self.getCount();
    }

    changePlayNav(e){   //          切换玩法
        let self=this;
        let $cur=$(e.currentTarget);
        $cur.addClass('active').siblings().removeClass('active');   //  很巧妙哦
        self.cur_play=$cur.attr('desc').toLocaleLowerCase();
        $('#zx_sm span').html((self.play_list).get(self.cur_play).tip);
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        self.getCount();
    }

    assistHandle(e){
        e.preventDefault();
        let self=this;
        let $cur=$(e.currentTarget);
        let index =$cur.index();
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        switch (index){
            case 0:{
                $('.boll-list .btn-boll').addClass('btn-boll-active');
                break;
            }
            case 1:{
                $('.boll-list .btn-boll').each((i,t)=>{
                    if(t.textContent-5>0){
                        $(t).addClass('btn-boll-active');
                    }
                });
                break;
            }
            case 2:{
                $('.boll-list .btn-boll').each((i,t)=>{
                    if(t.textContent-6<0){
                        $(t).addClass('btn-boll-active');
                    }
                });
                break;
            }
            case 3:{
                $('.boll-list .btn-boll').each((i,t)=>{
                    if(t.textContent%2==1){
                        $(t).addClass('btn-boll-active');
                    }
                });
                break;
            }
            case 4:{
                $('.boll-list .btn-boll').each((i,t)=>{
                    if(t.textContent%2==0){
                        $(t).addClass('btn-boll-active');
                    }
                });
                break;
            }
        }
        self.getCount();
    }

    getName(){                  //彩票名称
        return this.name;
    }


    addCode(){
        let self =this;
        let $active=$('.boll-list .btn-boll-active').text().match(/\d{2}/g);
        let active=$active?active.length:0;
        let count =self.computeCount(active,self.cur_play);
        if(count){
            self.addCodeItem($active.join(''),self.cur_play,self.play_list.get(self.cur_play).name,count);
        }
    }


    addCodeItem(code,type,typeName,count){
        let self=this;
        const tpl =`
        <li codes="${type}|${code}" bonus="${count*2}" count="${count}">
         <div class="code">
            <b>${typeName}${count>1?'复式':'单式'}</b>
            <b class="em">${code}</b>
            [${count}注,<em class="code-list-money">${count*2}</em>￥]
         </div>
        </li>
        `;
        $(self.cart_el).append(tpl);
        self.getTotal();
    }

    getCount(){
        let self=this;
        let active=$('.boll-list .btn-boll-active').length;
        let count=self.computeCount(active,self.cur_play);
        let range =self.computeBonus(active,self.cur_play);
        let money=count*2;
        let win1=range[0]-money;
        let win2=range[1]-money;
        let tpl;
        let c1=(win1<0&&win2<0)?Math.abs(win1):win1;
        let c2=(win1<0&&win2<0)?Math.abs(win2):win2;
        if(count===0){
            tpl=`您他妈选了 <b class="red">${count}</b> 注，共<b class="red">${count*2}</b>￥`;
        }else if(range[0]==range[1]){
            tpl=`您他妈选了<b>${count}</b> 注,共 <b>${count*2}</b>￥ <em>若中奖，奖金:<strong class="red">${rang[0]}</strong>
            您将${win1>=0?"盈利":"亏损"}
            <strong class=${win1>=0?'red':'green'}>${Math.abs(win1)}</strong>￥</em>`;
        }else{
            tpl=`您他妈选了<b>${count}</b> 注,共 <b>${count*2}</b>￥ <em>若中奖，奖金:<strong class="red">${rang[0]}</strong>至<strong>${rang[1]}</strong> ￥,
            您将${(win1<0&&win2<0)?"盈利":"亏损"}
            <strong class=${win1>=0?'red':'green'}>${c1}</strong>
            至 <strong class=${win2>=0?'red':'green'}>${c1}</strong>
            ￥</em>`;
        }
        $('.self_info').html(tpl);
    }

    getTotal(){
        let count=0;
        $('.codelist li').each((index,item)=>{
            count+=$(item).attr(count)*1;
        })
        $('#count').text(count);
        $('#money').text(count*2);
    }


    getRandom(num){
        let arr=[],index;
        let number=Array.from(this.number);
        while(num--){
            index=Number.parseInt(Math.random()*number.length);
            arr.push(number[index]);
            number.splice(index,1);
        }
        return arr.join(' ');
    }
    getRandomCode(e){
        e.preventDefault();
        let num=e.currentTarget.getAttribute('count');
        let play=this.cur_play.match(/\d+/g)[0];
        let self=this;

        if(num==='0'){
            $(self.cart_el).html('');
        }else{
            for(let i=0;i<num;i++){
                self.addCodeItem(self.getRandom(play),self.cur_play,self.play_list.get(self.cur_play).name(),1);
            }
        }
    }
}


export default Base
