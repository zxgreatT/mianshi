/**
 * 适配器模式 作用兼容两个软件实体之间的借口不兼容的问题
 */
class GooleMap {
    show() {
        console.log('渲染谷歌地图')
    }
}
// 现在百度地图的方法叫display 我们不能轻易改变第三方的内容，我们需要在封装一层对外暴露方法
class BaiduMap {
    // show() {
    //     console.log('渲染百度地图')
    // }
    display() {
        console.log('渲染百度地图')
    }
}
function render(map) {
    if(map.show instanceof Function) {
        map.show()
    }
}
class BaiduMapAdapter {
    show() {
        var baiduMap = new BaiduMap()
        return baiduMap.display()
    }
}
render(new GooleMap())
render(new BaiduMapAdapter())