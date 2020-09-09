
const packageInfo = require('./package.json');

module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-pxtorem': {
            rootValue: 20,
            propList: ['*'],
            minPixelValue: 1
        },
        // 'postcss-banner': {
        //     banner: `${packageInfo.name}@${packageInfo.version} author:${packageInfo.author}`
        // }
    }
};
