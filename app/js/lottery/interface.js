
import $ from 'jQuery';



class Interface{
    
    getOmit(issure){
        let self=this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'/get/omit',
                data:{
                    issure:issure
                },
                dataType:'json',
                success:function(rec){
                    console.log('http success');
                    self.setOmit(rec.data);
                    resolve.call(self,rec);
                },
                error:function(rec){
                    console.log('http fail',rec);
                    rejcet.call(self,err);
                }
            });
        });
    }

    getOpenCode(issure){
        let self=this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'ddd',
                data:{
                    issure:issure 
                },
                dataType:'json',
                success:function(rec){
                    console.log('openCode Http Success');
                    self.setOpenCode(rec.data);
                    resolve.call(self,rec);
                },
                error:function(rec){
                    console.log('openCode Http Error');
                    reject.call(self,rec);
                }
            });
        });
    }

    getState(issure){
        let self=this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'ddd',
                data:{
                    issure:issure 
                },
                dataType:'json',
                success:function(rec){
                    console.log('openCode Http Success');
                    self.setOpenCode(rec.data);
                    resolve.call(self,rec);
                },
                error:function(rec){
                    console.log('openCode Http Error');
                    reject.call(self,rec);
                }
            });
        });
    }
}

export default Interface