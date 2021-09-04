function createInjectPoint(obj, method) {
    let target = obj
    if (!(method in target)) {
        target = target.prototype
    }

    if (!target) {
        throw `${method} not in obj`
    }

    const origin = target[method]

    const wayBack = '__cam_'+method
    if (!target[wayBack]) {
        target[wayBack] = origin
    }

    return {target, origin}
}

module.exports = {
    before(obj, method, inject) {
        const {target, origin} = createInjectPoint(obj, method)
        target[method] = function () {
            inject(this, ...arguments)
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
    },

    leave(obj, method) {
        const {target} = createInjectPoint(obj, method)
        const wayBack = '__cam_'+method
        if (target[wayBack]) {
            target[method] = target[wayBack]
        }
    }
}

