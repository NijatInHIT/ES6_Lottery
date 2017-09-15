import $ from 'jquery';


class Interface {

    getOmit(issue){
        let self=this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'interface here',
                type:'post',
                dataType:'json',
                data:{
                    issue:issue
                },
                success:function(data){
                    self.setOmit();
                    resolve.bind(self,data);
                },
                error:function(err){
                    rejcet.bind(self,err);
                }
            });
        });
    }

    getOpenCode(issue){

        let self=this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                type:'post',
                data:{
                    issue:issue
                },
                dataType:'json',
                url:'getOpencode',
                success:function(data){
                    self.setOpenCode();
                    resolve.bind(self,data);
                },
                error:function(err){
                    rejcet.bind(self,err);
                }
            });
        });
    }

    getState(issue){
        let self=this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                type:'post',
                dataType:'json',
                url:'getState',
                data:{
                    issue:issue
                },
                success:function(data){
                    resolve.bind(self,data);
                },
                error:function(err){
                    rejcet.bind(self,err);
                }
            });
        });

    }
}


export default Interface


