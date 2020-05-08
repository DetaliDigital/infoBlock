infoBlock.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'infoblock-panel-home',
            renderTo: 'infoblock-panel-home-div'
        }]
    });
    infoBlock.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(infoBlock.page.Home, MODx.Component);
Ext.reg('infoblock-page-home', infoBlock.page.Home);