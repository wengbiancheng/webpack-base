class FileListPlugin {
    static defaultOptions = {
        outputFile: 'assets.md',
    };

    // Any options should be passed in the constructor of your plugin,
    // (this is a public API of your plugin).
    constructor(options = {}) {
        // Applying user-specified options over the default options
        // and making merged options further available to the plugin methods.
        // You should probably validate all the options here as well.
        this.options = { ...FileListPlugin.defaultOptions, ...options };
    }

    apply(compiler) {
        const pluginName = FileListPlugin.name;

        // webpack module instance can be accessed from the compiler object,
        // this ensures that correct version of the module is used
        // (do not require/import the webpack or any symbols from it directly).
        const { webpack } = compiler;

        // Compilation object gives us reference to some useful constants.
        const { Compilation } = webpack;

        // RawSource is one of the "sources" classes that should be used
        // to represent asset sources in compilation.
        const { RawSource } = webpack.sources;

        // Tapping to the "thisCompilation" hook in order to further tap
        // to the compilation process on an earlier stage.
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: pluginName,

                    // Using one of the later asset processing stages to ensure
                    // that all assets were already added to the compilation by other plugins.
                    stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
                },
                (assets) => {
                    // "assets" is an object that contains all assets
                    // in the compilation, the keys of the object are pathnames of the assets
                    // and the values are file sources.

                    // Iterating over all the assets and
                    // generating content for our Markdown file.
                    const content =
                        '# In this build:\n\n' +
                        Object.keys(assets)
                            .map((filename) => `- ${filename}`)
                            .join('\n');

                    // Adding new asset to the compilation, so it would be automatically
                    // generated by the webpack in the output directory.
                    console.log("emitAsset", this.options.outputFile);
                    compilation.emitAsset(
                        this.options.outputFile, // my-assets.md
                        new RawSource(content)
                    );
                    compilation.emitAsset(
                        "emitAsset-test-1.txt",
                        new RawSource("哈哈哈")
                    );
                    compilation.emitAsset(
                        "emitAsset-test-2.md",
                        new RawSource("嘻嘻嘻嘻嘻")
                    );
                }
            );
        });
    }
}

module.exports = { FileListPlugin };