/**
 * 这种是webpack4的写法，直接对assets进行操作
 * webpack5已经不允许这种写法了，可以直接看file-list-plugin.js，使用了emitAsset进行输出文件的增加
 */
class CopyRightWebpackPlugin {

    apply(compiler) {

        // 多种hooks，可以在webpack官网查看，并且查看这个hook是异步的还是同步的

        compiler.hooks.compile.tap("CopyRightWebpackPlugin", (compilation) => {
            console.log("compile执行了");
        });

        // emit: 表示打包结束时输出文件时刻！
        // 由于emit是异步的，因此得使用tapAsync
        // 需求：在打包结束的时候，再打包一个新的文件叫copyright.txt，内容是“copyright by dell lee”
        compiler.hooks.thisCompilation.tap("CopyRightWebpackPlugin", (compilation, cb) => {
            compilation.assets["copyright.txt"] = {
                source: function () {
                    return "copyright by dell lee";
                },
                size: function () {
                    return 21;
                }
            };
            cb();
        });
    }
}

module.exports = CopyRightWebpackPlugin;