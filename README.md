> 轻轻的我走了，正如我轻轻的来 —— 徐志摩《再别康桥》

> Very quietly I take my leave, As quietly as I came here —— Xu Zhimo 《Saying Good-bye to Cambridge Again》

这个库实现了对函数的非侵入式修改。

This library support noninvasive hook into functions.

目前支持对类或对象内的函数进行修改。

For now, only functions of a Class or a Object can be hooked.

支持在函数前后插入代码，或直接替换函数的实现。

Support insert code before/after functions. Or replace whole function directly.

## before

假设有这样的一个类

Suppose that we have a class like:

```js
class SealedClass {
    sum(a, b) {
        return a + b
    }
}
```

在不修改源码的情况下，如果想要每次函数进入时打印它的调用参数：

We can print it's arguments before execution without touching source code.

```js
const cam = require('@compilelife/cambridge')

cam.before(SealedClass, 'sum', (thiz, ...args)=>{
    console.log('called sum with arguments:', ...args)
})

const obj = new SealedClass()
obj.sum(1, 2)

//console output
//called sum with arguments: 1 2
```

## after

类似地，我们也可以在函数执行后，打印计算结果

Similarly, we can print it's return value after execution.

```js
cam.after(SealedClass, 'sum', (thiz, ret)=>{
    console.log('called sum returns', ret)
})


const obj = new SealedClass()
obj.sum(1, 2)

//console output
//called sum returns 3
```

## replace

如果需要包裹一个函数，可以直接替换它

If you want to 'wrap' a function, just replace it.

```js
cam.replace(SealedClass, 'sum', (thiz, func, ...args)=>{
    console.log('called sum with arguments:', ...args)
    const ret = func.call(thiz, ...args)
    console.log('then returns', ret)
})

const obj = new SealedClass()
obj.sum(1, 2)

//console output
//called sum with arguments: 1 2
//then returns 3
```

## Hook Object vs Hook Class

上面的示例代码将回调函数注入在类原型上，因此，所有的示例都会执行回调函数。

Examples above inject callback into proptotype of class, thus all instance would call the callback

```js
cam.before(SealedClass, 'sum', (thiz, ...args)=>{
    console.log('called sum with arguments:', ...args)
})

const o1 = new SealedClass()
o1.sum(1, 2)

const o2  = new SealedClass()
o2.sum(2, 3)

//console output
//called sum with arguments: 1 2
//called sum with arguments: 2 3
```

当然也可以只影响一个实例

We can also hook to a specific instance

```js
const o1 = new SealedClass()
cam.before(o1, 'sum', (thiz, ...args)=>{
    console.log('called sum with arguments:', ...args)
})
o1.sum(1, 2)

const o2  = new SealedClass()
o2.sum(2, 3)

//console output
//called sum with arguments: 1 2
```

## 一些戏法（Some tricks）

- 你可以用来做函数的入参合法性检查
- You can check target's arguments in callback
- 你可以在修改第三方库源码的情况下改变它的行为
- You can change external library's behavior without modify it's code
- 你可以用来调试目标函数
- You can debug target function
- 你可以用来做日志插桩
- You can log target function

Having fun~