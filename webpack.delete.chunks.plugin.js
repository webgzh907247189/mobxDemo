const path = require('path');
const fs = require('fs');

// 让其先编译(compile) -> 过程已经结束，模块已经被封闭(after-compile) -> 开始输出资源(emit) -> 找到与配置相匹配的这个文件 -> 在所有任务完成时(done),删除文件
function DeleteChunksPlugin({ chunks }) {
    this.chunks = Array.isArray(chunks) && chunks || []
    this.deleteFiles = []
}


/* http://www.css88.com/doc/webpack2/api/plugins/
 * complier对象(分为两大类)   一个webpack运行时的参数,是用户写在webpack.config.js里的参数
 *
 * compiler.plugin()《就相当于给compiler设置了事件监听》 这个相当于是插件可以进行处理的webpack的运行中的一些任务点
 * webpack就是完成一个又一个任务而完成整个打包构建过程的。如make是最开始的起点, complie就是编译任务点
 * after-complie是编译完成，emit是即将准备生成文件，after-emit是生成文件之后等等
 *
 * compilation继承于complier       compiler和compilation，一个代表编译器实体，另一个代表编译过程
 */ 
DeleteChunksPlugin.prototype.apply = function(compiler) {
    const self = this;

    compiler.plugin('emit', function(compilation, callback) {
        
        // compilation.chunks是块的集合（构建后将要输出的文件，即编译之后得到的结果）
        compilation.chunks.forEach(function(chunk) {
            if (self.chunks.includes(chunk.name)) {

                // chunk.modules是模块的集合（构建时webpack梳理出的依赖，即import、require的module）
                // 形象一点说：chunk.modules是原材料，chunk.files才是最终的成品
                chunk.files.forEach(function(file) {
                    self.deleteFiles.push(path.resolve('dist', file));

                    // source()可以得到每个文件的源码
                    // let source = compilation.assets[file].source();
                });
            }
        });

        // callback在最后必须调用
        callback();
    });


    // 所有任务已经完成
    compiler.plugin('done', function() {
        self.deleteFiles.forEach(function(file) {

            //https://www.cnblogs.com/mangoxin/p/5664615.html
            fs.unlink(file);
        });
    });
};

module.exports = DeleteChunksPlugin;