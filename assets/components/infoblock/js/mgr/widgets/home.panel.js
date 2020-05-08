infoBlock.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'infoblock-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('infoblock') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('infoblock_items'),
                layout: 'anchor',
                items: [{
                    html: _('infoblock_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'infoblock-grid-items',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    infoBlock.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(infoBlock.panel.Home, MODx.Panel);
Ext.reg('infoblock-panel-home', infoBlock.panel.Home);
