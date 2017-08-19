
class Caculator{
    computeCount(active,play_name){
        let count =0;
        const exist=this.play_list.has(play_name);   //map
        const arr=new Array(active).fill('0');       // array
        if(exist&& play_name[0]==='r'){
            count=Caculator.combine(arr,play_name.split('')[1]);
        }
        return count;
    }

    computeBonus(active,play_name){
        const play=play.name.split('');
        const self=this;
        let arr=new Array(play[1]*1).fill(0);
        let min,max;
        if(play[0]==='r'){
            
        }
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