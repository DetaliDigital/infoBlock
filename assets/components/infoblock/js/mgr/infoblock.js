var infoBlock = function (config) {
    config = config || {};
    infoBlock.superclass.constructor.call(this, config);
};
Ext.extend(infoBlock, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('infoblock', infoBlock);

infoBlock = new infoBlock();