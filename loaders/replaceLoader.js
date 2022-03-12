module.exports = function (source) {
    // source
    const options = this.getOptions();
    const result = source.replace("lee", options.name || "默认");

    console.log('The request path', loaderUtils.urlToRequest(this.resourcePath));

    return result;
}