function Observe(target) {
  if(!target || typeof target !== 'Object') {
    return
  }
  Object.keys(target).forEach((key) => {
    difineReative(target, key, target[key])
  })
}

function difineReative(target, key, value) {
  Observe(value)
  const dep = new Dep()
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false,
    get() {
      if(Dep.target) {
        dep.addItem(Dep.target)
      }
      return value
    },
    set(newValue) {
      if(value === newValue) {
        return
      }
      value = newValue
      dep.notify()
    }
  })
}

function Dep() {
  this.items = []
}

Dep.prototype = {
  addItem(item) {
    this.items.push(item)
  },
  notify() {
    this.items.forEach((item) => {
      item.updata()
    })
  }
}

function Watcher(_this, key, fun) {
  this._this = _this
  this.key = key
  this.fun = fun
  this.value = this.get()
}

Watcher.prototype = {
  update() {
    this.run()
  },
  run() {
    const value = this._this.data[this.key]
    const oldValue = this.value
    if(value !== oldValue) {
      this.fun.call(this._this, value, oldValue)
    }
  },
  get() {
    Dep.target = this
    const value = this._this.data[this.key]
    Dep.target = null
    return value
  }
}

function myVue(data, el, key) {
  this.data = data
  Observe(data)
  el.innerHTML = this.data[key]
  new Watcher(this, key, function (value) {
    el.innerHTML = value
  })
  return this
}
