class Event {
    constructor () {
        this._cache = {}
    }
    // 绑定
    on(type, callback) {
        // 将同一个类型的事件放在一起
        let fns = this._cache[type] = this._cache[type] || []
        if(fns.indexOf(callback) === -1) {
            fns.push(callback)
        }
        return this
    }

    // 触发
    trigger(type, data) {
        let fns = this._cache[type]
        if(Array.isArray(fns)) {
            for(const fn of fns) {
                fn(data)
            }
        }
        return this
    }

    // 解绑
    off(type, callback) {
        let fns = this._cache[type]
        if(Array.isArray(fns)) {
            if(callback) {
                let index = fns.indexOf(callback)
                if(index != -1) {
                    fns.splice(index,1)
                }
            } else {
                fns.length = 0
            }
        }
        return this
    }
}

const event = new Event()
event.on('test', (a) => {console.log(a)}).on('test', (a) => {console.log(a.toLocaleUpperCase())})
.trigger('test','hello').off('test').trigger('test','hello')