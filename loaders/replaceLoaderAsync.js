// loader本质是一个function
// 在webpack.config.js中配置rules：特定的js文件会直接使用该转化的function函数
// 同步，直接调用该函数，直接拿到转化后的数据
// 异步，调用该函数，等到异步返回结果

module.exports = function (source) {
    const options = this.getOptions();
    const callback = this.async();

    setTimeout(() => {
        const result = source.replace("Weng", options.name);
        callback(null, result);
    }, 1000);
}