let a = {name:{sex: '11'}};

let val = a.name.sex ?? 'default';
console.log('新特性测试.',a?.name?.sex?.name?.sex?.asd,val,a?.name?.sex);


// 在需要执行的函数之前执行某个新添加的功能函数
Function.prototype.before = function(before = () => {}) {
    return () => {
        before.apply(this, arguments);
        return this.apply(this, arguments);
    };
}
// 在需要执行的函数之后执行某个新添加的功能函数
Function.prototype.after = function(after = () => {}) {
    return () => {
        this.apply(this, arguments);
        return after.apply(this, arguments);
    };
}

function test(){
	console.log('aop -> test')
}

function b(){
	console.log('1111')
}

test.before(b)()
// 1111
// aop -> test