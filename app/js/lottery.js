import 'babel-polyfill';
import Base from './lottery/base.js';
import Timer from './lottery/timer.js';
import Caculator from'./lottery/caculator.js';
import Interface from'./lottery/interface.js';
import $ from 'jquery';

const copyInDeep=function(target,source){
    for(let key of Reflect.ownKeys(source)){
        if(key!=='constructor'&&key!=='prototype'&&key!=='name'){
            let desc=Object.getOwnPropertyDescriptor(source,key);
            Object.defineProperty(target,key,desc);
        }
    }
}

// name length  数据项的Writable属性为false，所以，即使操作了value，也不会改变。

const mix=function(...mixins){
    class Mix{}
    for(let mixin of mixins){
        copyInDeep(Mix,mixin);
        copyInDeep(Mix.prototype,mixin.prototype);
    }
    return Mix;
}

class Lottery extends mix(Base,Caculator,Timer,Interface){
    constructor(name='syy',cName="11选5",issure="*",state="**"){
        super();
        this.name=name;
        this.cName=cName;
        this.issure=issure;
        this.state=state;
        this.el='';
        this.omit=new Map();
        this.open_code=new Set();
        this.open_code_list=new Set();
        this.play_list=new Map();
        this.number=new Set();
        this.issure_el="#cur_issure";
        this.countdown_el="#countdown";
        this.state_el="state_el";
        this.cart_el=".codelist";
        this.omit_el='';
        this.cur_play='r5';
        this.initPlayList();
        this.initNumber();
        this.updateState();
        this.initEvent();
    }
    updateState(){
        let self=this;
        this.getState().then((rec)=>{
            self.issure=rec.issure;
            self.end_time=rec.end_time;
            self.state=rec.state;
            $(self.issure_el).text(rec.issure);
            self.countdown(res.end_time,time=>{
                $(self.countdown_el).html(time);
            },()=>{
                setTimeout(()=>{
                    self.updateState();
                    self.getOmit(self.issure).then((rec)=>{   
                    });
                self.getOpenCode(self.issure).then((rec)=>{

                });    
                },500)
            })
        })
    }

    initEvent(){
        let self=this;
        $('#plays').on('click','li',self.changePlayNav.bind(self));
        $('.boll-list').on('click','.btn-boll',self.toggleCodeActive.bind(self));
        $('#confirm_sel_code').on('click',self.addCode.bind(self));
        $('.dxjo').on('click','li',self.assistHandle.bind(self));
        $('.qkmethod').on('click','.btn-middle',self.getRandomCode.bind(self));
    }
}


export default Lottery