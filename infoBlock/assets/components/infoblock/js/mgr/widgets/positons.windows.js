infoBlock.window.CreatePosition = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'infoblock-position-window-create';
    }
    Ext.applyIf(config, {
        title: _('infoblock_position_create'),
        width: 1100,
        autoHeight: true,
        url: infoBlock.config.connector_url,
        action: 'mgr/position/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    infoBlock.window.CreatePosition.superclass.constructor.call(this, config);
};

Ext.extend(infoBlock.window.CreatePosition, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            layout: 'column',
            items: [{
                columnWidth: .7,
                layout: 'form',
                defaults: {msgTarget: 'under'},
                items: [{
                    xtype: 'trigger',
                    onTriggerClick: function (e,btn) {
                        btn.previousSibling.value = '';
                    },
                    triggerClass: 'x-field-trigger-clear',
                    fieldLabel: _('infoblock_position_name'),
                    name: 'name',
                    id: config.id + '-name',
                    anchor: '99%',
                    allowBlank: false,
                    blankText: _('infoblock_position_err_name'),
                }, {
                    xtype: 'trigger',
                    onTriggerClick: function (e,btn) {
                        btn.previousSibling.value = '';
                    },
                    triggerClass: 'x-field-trigger-clear',
                    fieldLabel: _('infoblock_position_title'),
                    name: 'title',
                    id: config.id + '-title',
                    anchor: '99%',
                    allowBlank: true,
                }, {
                    xtype: Ext.ComponentMgr.types['modx-texteditor'] ? 'modx-texteditor' : 'textarea',
                    fieldLabel: _('infoblock_position_content'),
                    name: 'content',
                    id: config.id + '-content',
                    height: 200,
                    mimeType: 'text/html',
                    anchor: '99%'
                }, {
                    xtype: Ext.ComponentMgr.types['modx-texteditor'] ? 'modx-texteditor' : 'textarea',
                    fieldLabel: _('infoblock_position_additional_field'),
                    name: 'addfld',
                    id: config.id + '-addfld',
                    height: 200,
                    mimeType: 'text/html',
                    anchor: '99%'
                }
                ]
            }, {
                columnWidth: .3,
                layout: 'form',
                items: [{
                    xtype: 'infoblock-combo-chunk',
                    id: config.id + 'chunk',
                    fieldLabel: _('infoblock_position_chunk'),
                    name: 'chunk',
                    anchor: '99%'
                }, {
                    xtype: 'trigger',
                    onTriggerClick: function (e,btn) {
                        btn.previousSibling.value = '';
                    },
                    triggerClass: 'x-field-trigger-clear',
                    fieldLabel: _('infoblock_position_alias'),
                    name: 'alias',
                    id: config.id + '-alias',
                    anchor: '99%',
                    allowBlank: false,
                    blankText: _('infoblock_position_err_alias'),
                    msgTarget: 'under'
                }, {
                    xtype: 'trigger',
                    onTriggerClick: function (e,btn) {
                        btn.previousSibling.value = '';
                    },
                    triggerClass: 'x-field-trigger-clear',
                    fieldLabel: _('infoblock_position_limit'),
                    name: 'limit',
                    id: config.id + '-limit',
                    anchor: '99%',
                    allowBlank: true,
                }, {
                    xtype: 'xcheckbox',
                    boxLabel: _('infoblock_position_active'),
                    name: 'active',
                    id: config.id + '-active',
                    checked: true,
                }],
            }]
        },
        ];
    },

    loadDropZones: function () {
    }

});
Ext.reg('infoblock-position-window-create', infoBlock.window.CreatePosition);


infoBlock.window.UpdatePosition = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'infoblock-position-window-update';
    }
    Ext.applyIf(config, {
        title: _('infoblock_position_update'),
        width: 1100,
        autoHeight: true,
        url: infoBlock.config.connector_url,
        action: 'mgr/position/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    infoBlock.window.UpdatePosition.superclass.constructor.call(this, config);
};

Ext.extend(infoBlock.window.UpdatePosition, infoBlock.window.CreatePosition);
Ext.reg('infoblock-position-window-update', infoBlock.window.UpdatePosition);