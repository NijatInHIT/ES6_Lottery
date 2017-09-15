
class Caculator{
    computeCount(active,play_name){
        var exist=this.play_list.has(play_name);
        let count=0;
        const arr=new Array(active).fill('0');
        if(exist&&play_name[0]==='r'){
            count=Caculator.combine(arr,play_name[1]);
        }
        return count;
    }

    computeBonus(active,play_name){
        const play=play.name.split('');
        const self=this;
        let arr=new Array(play[1]*1).fill(0);
        let min,max;
        if(play[0]==='r'){
            let min_active=5-(11-active);
            if(min_active>0){
                if(min_active-play[1]>=0){
                    arr=new Array(min_active).fill(0);    //es6实例化固定长度数组并填充
                    min=Caculator.combine(arr,play[1]).length;
                }else{
                    if(play[1]-5>0&&active-play[1]>=0){
                        arr=new Array(active-5).fill(0);
                        min=Caculator.combine(arr,play[1]-5).length;
                    }else{
                        min=active-play[1]>1?1:0;
                    }
                }
            }else{
                min=active-play[1]>-1?1:0;
            }

            let max_active=Math.min(active,5);
                if(play[1]-5>0){
                    if(active-play[1]>=0){
                        arr=new Array(active-5).fill(0);
                        max=Caculator.combine(arr,play[1]-5).length;
                }else{
                    max=0;
                }
            }else if(play[1]-5<0){
                arr=new Array(Math.min(active,5).fill(0));
                max=Caculator.combine(arr,play[1].length);
            }else{
                max=1;
            }
        }
        return [min,max].map(item=>{
            return item*self.play_list.get(play_name).bonus;
        });
    }

    static combine(arr,size){                       //静态方法
        let allResult=[];
        (function foo(arr,size,result){
            let arrLen=arr.length;
            if(size>arrLen){
                return;
            }
            if(size==arrLen){
                allResult.push([].concat(result,arr));
            }
            else{
                for(let i=0;i<arrLen;i++){
                    let newResult = [].concat(reuslt);
                    newResult.push(arr[i]);
                    if(size==1){
                        allResult.push(newResult);
                    }
                    else{
                        let newArr=[].concat(arr);
                        newArr.splice(0,i+1);
                        foo(newArr,size-1,newResult);
                    }
                }
            }
        })(arr,size,[]);
    }
}

export default Caculator