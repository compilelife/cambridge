//todo:
//添加.d.ts
//发包
function createInjectPoint(obj, method) {
    let target = obj
    if (!(method in target)) {
        target = target.prototype
    }

    if (!target) {
        throw `${method} not in obj`
    }

    return {target, origin:target[method]}
}

module.exports = {
    before(obj, method, inject) {
        const {target, origin} = createInjectPoint(obj, method)
        target[method] = function () {
            inject(this)
            origin.call(this, ...arguments)
        }
    },
    
    after(obj, method, inject) {
        const {target, origin} = createInjectPoint(obj, method)
        target[method] = function () {
            const result = origin.call(this, ...arguments)
            inject(this, result)
        }
    },
    
    replace(obj, method, inject) {
        const {target, origin} = createInjectPoint(obj, method)
        target[method] = function() {
            return inject(this, origin, ...arguments)
        }
    }
}

