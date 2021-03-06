
infoBlock.window.CreateItem = function (config) {

    config = config || {};
    if (!config.id) {
        config.id = 'infoblock-item-window-create';
    }

    Ext.applyIf(config, {
        title: _('infoblock_item_create'),
        width: 800,
        autoHeight: true,
        url: infoBlock.config.connector_url,
        action: 'mgr/item/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });

    infoBlock.window.CreateItem.superclass.constructor.call(this, config);

    };

    Ext.extend(infoBlock.window.CreateItem, MODx.Window, {

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
                  fieldLabel: _('infoblock_item_name'),
                  name: 'name',
                  id: config.id + '-name',
                  anchor: '99%',
                  allowBlank: false,
              }, {
                  xtype: 'modx-combo-browser',
                  fieldLabel: _('infoblock_item_image'),
                  name: 'image',
                  id: config.id + '-image',
                  source: MODx.config.modextra_source_images || MODx.config.default_media_source,
                  anchor: '99%',
                  allowBlank: true,
              }, {
                  xtype: 'textarea',
                  fieldLabel: _('infoblock_item_description'),
                  name: 'description',
                  id: config.id + '-description',
                  anchor: '99%',
                  height: 50,
              }, {
                  xtype: Ext.ComponentMgr.types['modx-texteditor'] ? 'modx-texteditor' : 'textarea',
                  fieldLabel: _('infoblock_item_content'),
                  name: 'content',
                  id: config.id + '-content',
                  height: 200,
                  mimeType: 'text/html',
                  anchor: '99%',
                  enableKeyEvents: true,
                  setValue: function (v) {
                      v = '';
                      this.superclass().setValue.call(this, v);
                  }
              }, {
                  xtype: 'infoblock-filter-resources',
                  fieldLabel: _('infoblock_item_url'),
                  name: 'url',
                  id: config.id + '-url',
                  anchor: '99%',
                  allowBlank: true,
              }],
          }, {
              columnWidth: .3,
              layout: 'form',
              items: [{
                  xtype: 'numberfield',
                  fieldLabel: _('infoblock_item_menuindex'),
                  id: config.id + '-menuindex',
                  name: 'menuindex',
                  anchor: '99%',
                  allowBlank: true,
              }, {
                  xtype: 'infoblock-combo-position',
                  fieldLabel: _('infoblock_item_position'),
                  anchor: '99%',
                  allowBlank: true,
              }, {
                  xtype: 'infoblock-combo-dates',
                  fieldLabel: _('infoblock_item_createdon'),
                  name: 'createdon',
                  id: config.id + '-createdon',
                  anchor: '99%',
                  allowBlank: true,
              }, {
                  xtype: 'xcheckbox',
                  boxLabel: _('infoblock_item_active'),
                  name: 'active',
                  id: config.id + '-active',
              }],
          }]
      },
      ];
  },

    loadDropZones: function () {
    }

});
Ext.reg('infoblock-item-window-create', infoBlock.window.CreateItem);


infoBlock.window.UpdateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'infoblock-item-window-update';
    }
    Ext.applyIf(config, {
        title: _('infoblock_item_update'),
        width: 900,
        autoHeight: true,
        url: infoBlock.config.connector_url,
        action: 'mgr/item/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    infoBlock.window.UpdateItem.superclass.constructor.call(this, config);


};

Ext.extend(infoBlock.window.UpdateItem, MODx.Window, {

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
                    fieldLabel: _('infoblock_item_name'),
                    name: 'name',
                    id: config.id + '-name',
                    anchor: '99%',
                    allowBlank: false,
                }, {
                    xtype: 'modx-combo-browser',
                    fieldLabel: _('infoblock_item_image'),
                    name: 'image',
                    id: config.id + '-image',
                    source: MODx.config.modextra_source_images || MODx.config.default_media_source,
                    anchor: '99%',
                    allowBlank: true,
                }, {
                    xtype: 'textarea',
                    fieldLabel: _('infoblock_item_description'),
                    name: 'description',
                    id: config.id + '-description',
                    anchor: '99%',
                    height: 50,
                }, {
                    xtype: Ext.ComponentMgr.types['modx-texteditor'] ? 'modx-texteditor' : 'textarea',
                    fieldLabel: _('infoblock_item_content'),
                    name: 'content',
                    id: config.id + '-content',
                    height: 200,
                    mimeType: 'text/html',
                    anchor: '99%',
                }, {
                    xtype: 'infoblock-filter-resources',
                    fieldLabel: _('infoblock_item_url'),
                    name: 'url',
                    id: config.id + '-url',
                    anchor: '99%',
                    allowBlank: true,
                }],
            }, {
                columnWidth: .3,
                layout: 'form',
                items: [{
                    xtype: 'numberfield',
                    fieldLabel: _('infoblock_item_menuindex'),
                    name: 'menuindex',
                    anchor: '99%',
                    allowBlank: true,
                }, {
                    xtype: 'infoblock-combo-position',
                    fieldLabel: _('infoblock_item_position'),
                    anchor: '99%',
                    allowBlank: true,
                }, {
                    xtype: 'infoblock-combo-dates',
                    fieldLabel: _('infoblock_item_createdon'),
                    name: 'createdon',
                    id: config.id + '-createdon',
                    value: config.record.createdon,
                    anchor: '99%',
                    allowBlank: true,
                }, {
                    xtype: 'xcheckbox',
                    boxLabel: _('infoblock_item_active'),
                    name: 'active',
                    id: config.id + '-active',
                }
              ],
            }]
        },
        ];
    },

    loadDropZones: function () {
    }

});

Ext.reg('infoblock-item-window-update', infoBlock.window.UpdateItem);
