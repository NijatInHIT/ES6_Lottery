

//lesson3  reg


// {
//     let myReg=new RegExp('[0-9]{2,}','y');    //粘连模式
//     let myReg2=new RegExp(/([0-9]{2,})/g);
    
//     console.log(myReg.exec('11_11__11_11'));
//     console.log(myReg.exec('11_11__11_11'));
//     console.log(myReg2.exec('11_11__11_11'));
//     console.log(myReg2.exec('11_11__11_11'));
//     console.log(myReg.sticky);
// }

{
    console.log('a','\u{20bb7}','a'.charCodeAt(0));
    console.log(String.fromCharCode(98),'wo shi {name}');

    let str='big sky';                  // 常用字符串方法
    console.log(str.includes(''));
    console.log(str.startsWith('b'));
    console.log(str.repeat(12,''))

    let name='nijat';                   //模板字符串
    console.log(`hello-----${name}`);

    console.log('111111'.padEnd(10,'x'));

    let user={
        name:'nijat',
        info:'a good man'
    };

    console.log(`im ${user.name},im a ${user.info}`);
    
    let myName=Symbol('Nijat');
    let x1=Symbol('Nijat');
    console.log(myName===x1);
    console.log(myName);
    console.log(x1);
    
    let list1 =new Set([1,2,1,1,2]);
    console.log(list1);

}


