const cam = require('./index')

/**
 * This is a class representing the one we can't modify, or don't want to
 * But we do need to add some code
 */
class SealedClass {
    sum(a, b) {
        return a + b
    }
    minus(a, b) {
        return a - b
    }
    static print() {
        console.log('static function')
    }
}

//Test & Usage

const tests = [
    function before() {
        cam.before(SealedClass, 'sum', (thiz, ...args) => {
            console.log('called sum with arguments:', ...args)
        })

        const obj = new SealedClass()
        obj.sum(1, 2)
    },
    function after() {
        cam.after(SealedClass, 'sum', (thiz, ret) => {
            console.log('called sum returns', ret)
        })

        const obj = new SealedClass()
        obj.sum(1, 2)
    },
    function replace() {
        cam.replace(SealedClass, 'sum', (thiz, func, ...args) => {
            console.log('called sum with arguments:', ...args)
            const ret = func.call(thiz, ...args)
            console.log('then returns', ret)
        })

        const obj = new SealedClass()
        obj.sum(1, 2)
    },
    function instance() {
        const o1 = new SealedClass()
        cam.before(o1, 'sum', (thiz, ...args) => {
            console.log('called sum with arguments:', ...args)
        })
        o1.sum(1, 2)

        const o2 = new SealedClass()
        o2.sum(2, 3)
    },
    function logsAllFunc() {
        for (const method of Object.getOwnPropertyNames(SealedClass.prototype)) {
            if (method === 'constructor' || method.startsWith('__cam_'))
                continue

            cam.replace(SealedClass, method, (thiz, func, ...args) => {
                const ret = func.call(thiz, ...args)
                console.log('called '+method+' with arguments '+args.join(',')+' then returns ', ret)
            })
        }

        const obj = new SealedClass()
        obj.sum(1,2)
        obj.minus(1,2)
    },
    function staticFunc() {
        cam.before(SealedClass, 'print', ()=>console.log('before static'))

        SealedClass.print()
    }
]

for (const test of tests) {
    console.log('> run test', test.name)
    test()
    console.log()
    cam.leave(SealedClass, 'sum') //just cleanup what test mess up
}