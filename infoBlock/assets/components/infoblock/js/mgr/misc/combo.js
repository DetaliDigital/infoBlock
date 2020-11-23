infoBlock.combo.Search = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        xtype: 'twintrigger',
        ctCls: 'x-field-search',
        allowBlank: true,
        msgTarget: 'under',
        emptyText: _('search'),
        name: 'query',
        triggerAction: 'all',
        clearBtnCls: 'x-field-search-clear',
        searchBtnCls: 'x-field-search-go',
        onTrigger1Click: this._triggerSearch,
        onTrigger2Click: this._triggerClear,
    });
    infoBlock.combo.Search.superclass.constructor.call(this, config);
    this.on('render', function () {
        this.getEl().addKeyListener(Ext.EventObject.ENTER, function () {
            this._triggerSearch();
        }, this);
    });
    this.addEvents('clear', 'search');
};
Ext.extend(infoBlock.combo.Search, Ext.form.TwinTriggerField, {

    initComponent: function () {
        Ext.form.TwinTriggerField.superclass.initComponent.call(this);
        this.triggerConfig = {
            tag: 'span',
            cls: 'x-field-search-btns',
            cn: [
                {tag: 'div', cls: 'x-form-trigger ' + this.searchBtnCls},
                {tag: 'div', cls: 'x-form-trigger ' + this.clearBtnCls}
            ]
        };
    },

    _triggerSearch: function () {
        this.fireEvent('search', this);
    },

    _triggerClear: function () {
        this.fireEvent('clear', this);
    },

});
Ext.reg('infoblock-combo-search', infoBlock.combo.Search);
Ext.reg('infoblock-field-search', infoBlock.combo.Search);

// Combobox render resource
/******************************************************/

MODx.combo.resources = function(config) {
	config = config || {};
	Ext.applyIf(config,{
		name: 'url',
		hiddenName: 'url',
		displayField: 'pagetitle',
		valueField: 'url',
		editable: true,
		fields: ['id','pagetitle','url','parents'],
		pageSize: 10,
        emptyText: _('no'),
		url: infoBlock.config.connectorUrl,
		baseParams: {
			action: 'mgr/resource/getlist'
		},
    triggerConfig: {
        tag: 'span',
        cls: 'x-field-combo-btns',
        cn: [
            {tag: 'div', cls: 'x-form-trigger x-field-combo-list'},
            {tag: 'div', cls: 'x-form-trigger x-field-combo-trigger-clear'}
        ]
    },
    onTriggerClick: function(event, btn) {
        if (btn && Ext.get(btn).hasClass('x-field-combo-trigger-clear')) {
            this.setValue('Нет');
        } else {
            MODx.combo.ComboBox.superclass.onTriggerClick.call(this);
        }
    },
		forceSelection: false,
		tpl: new Ext.XTemplate('\
			 <tpl for=".">\
          <div class="x-combo-list-item infoblock-resource-list-item">\
				      <tpl if="parents">\
					         <span class="parents">\
						           <tpl for="parents">\
							                <small>{pagetitle} / </small></br>\
                       </tpl>\
					         </span>\
				      </tpl>\
                  <span>\
                      <tpl if="id">\
                          <sup><small>({id})</small></sup>\
                          </tpl><b>{pagetitle}</b></span>\
          </div>\
      </tpl>',
    {
		compiled: true
		}),
		itemSelector: 'div.infoblock-resource-list-item'
	});
	MODx.combo.resources.superclass.constructor.call(this,config);
};

Ext.extend(MODx.combo.resources,MODx.combo.ComboBox);
Ext.reg('infoblock-filter-resources',MODx.combo.resources);

// Combobox render Position
/******************************************************/

infoBlock.combo.Position = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        name: 'position_id',
        fieldLabel: _('positions_' + config.name || 'positions'),
        hiddenName: 'position_id',
        displayField: 'name',
        valueField: 'id',
        anchor: '99%',
        fields: ['name', 'id', 'alias'],
        pageSize: 20,
        url: infoBlock.config['connector_url'],
        typeAhead: true,
        editable: true,
        allowBlank: false,
        emptyText: _('no'),
        minChars: 1,
        baseParams: {
            action: 'mgr/position/getlist',
            combo: true,
            id: config.value,
        },
        triggerConfig: {
            tag: 'span',
            cls: 'x-field-combo-btns',
            cn: [
                {tag: 'div', cls: 'x-form-trigger x-field-combo-list'},
                {tag: 'div', cls: 'x-form-trigger x-field-combo-trigger-clear'}
            ]
        },
        onTriggerClick: function(event, btn) {
            if (btn && Ext.get(btn).hasClass('x-field-combo-trigger-clear')) {
                this.setValue(_('no'));
                this.clearValue();
                this.fireEvent('clear', this);
            } else {
                MODx.combo.ComboBox.superclass.onTriggerClick.call(this);
            }
        },
        tpl: new Ext.XTemplate(''
    			+'<tpl for="."><div class="x-combo-list-item infoblock-position-list-item">'
    			   +'<tpl if="alias"><small>{alias} /</small></br></tpl>'
    			   +'<span><tpl if="id"><sup><small>({id})</small></sup> </tpl><b>{name}</b></span>'
    			+'</div></tpl>',
          {
      		compiled: true
      		}),
      		itemSelector: 'div.infoblock-position-list-item'
    });
    infoBlock.combo.Position.superclass.constructor.call(this, config);
    this.on('expand', function () {
        if (!!this.pageTb) {
            this.pageTb.show();
        }
    });
};

Ext.extend(infoBlock.combo.Position,MODx.combo.ComboBox);
Ext.reg('infoblock-combo-position',infoBlock.combo.Position);

// Combobox render data
/******************************************************/


infoBlock.combo.DateTime = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        timePosition: 'right',
        allowBlank: true,
        hiddenFormat: 'Y-m-d H:i:s',
        dateFormat: MODx.config['manager_date_format'],
        timeFormat: MODx.config['manager_time_format'],
        dateWidth: 150,
        timeWidth: 100,
    });
    infoBlock.combo.DateTime.superclass.constructor.call(this, config);
};

Ext.extend(infoBlock.combo.DateTime, Ext.ux.form.DateTime);
Ext.reg('infoblock-combo-dates',infoBlock.combo.DateTime);

// Combobox render list chunk
/******************************************************/

infoBlock.combo.Chunk = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        name: 'chunk',
        hiddenName: config.name || 'chunk',
        displayField: 'name',
        valueField: 'id',
        editable: true,
        fields: ['id', 'name'],
        pageSize: 20,
        emptyText: _('infoblock_combo_select'),
        hideMode: 'offsets',
        emptyText: _('no'),
        url: infoBlock.config['connector_url'],
        baseParams: {
            action: 'mgr/chunk/getlist',
            mode: 'chunks'
        },
        triggerConfig: {
            tag: 'span',
            cls: 'x-field-combo-btns',
            cn: [
                {tag: 'div', cls: 'x-form-trigger x-field-combo-list'},
                {tag: 'div', cls: 'x-form-trigger x-field-combo-trigger-clear'}
            ]
        },
        onTriggerClick: function(event, btn) {
            if (btn && Ext.get(btn).hasClass('x-field-combo-trigger-clear')) {
                this.setValue('Нет');
            } else {
                MODx.combo.ComboBox.superclass.onTriggerClick.call(this);
            }
        }
    });
    infoBlock.combo.Chunk.superclass.constructor.call(this, config);
};
Ext.extend(infoBlock.combo.Chunk, MODx.combo.ComboBox);
Ext.reg('infoblock-combo-chunk', infoBlock.combo.Chunk);

// Combobox render list templates
/******************************************************/

infoBlock.combo.templates = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        xtype: 'superboxselect',
        name: config['name'] || 'templates',
        hiddenName: config['name'] || 'templates',
        originalName: 'templatename',
        displayField: 'templatename',
        displayFieldTpl: '{templatename} ({id})',
        valueField: 'id',
        hideMode: 'offsets',
        emptyText: _('no'),
        store: new Ext.data.JsonStore({
            url: infoBlock.config['connector_url'],
            baseParams: {
                action: 'mgr/combo/templates/getlist',
                combo: true,
                id: config.value
            },
            root: 'results',
            totalProperty: 'total',
            autoLoad: true,
            autoSave: false,
            fields: ['id', 'templatename'],
        }),
        minChars: 2,
        editable: true,
        resizable: true,
        typeAhead: false,
        allowBlank: true,
        forceFormValue: false,
        allowAddNewData: true,
        addNewDataOnBlur: true,
        forceSameValueQuery: true,
        triggerAction: 'all',
        pageSize: 15,
        anchor: '100%',
        extraItemCls: 'x-tag',
        clearBtnCls: 'x-form-trigger',
        expandBtnCls: 'x-form-trigger',
        listEmptyText: '<div style="padding: 7px;">в списке отсутствуют элементы</div>',
        tpl: new Ext.XTemplate('\
            <tpl for="."><div class="x-combo-list-item">\
                <span>\
                    {templatename}\
                </span>\
            </div></tpl>',
            {compiled: true}
        ),
    });
    ['name', 'hiddenName', 'originalName'].forEach(function (name) {
        config[name] += '[]';
    });
    infoBlock.combo.templates.superclass.constructor.call(this, config);

    this.on('newitem', function (combo, val) {
        combo.addItem({id: val, templatename: val});
    }, this);
};

Ext.extend(infoBlock.combo.templates, Ext.ux.form.SuperBoxSelect, {
    initValue: function () {
        let sbs = this;
        window.setTimeout(function () {
            if (Ext.isEmpty(sbs.value)) {
                return;
            }
            if (Ext.isObject(sbs.value) || Ext.isArray(sbs.value)) {
                sbs.setValueEx(sbs.value);
                sbs.originalValue = sbs.getValue();
            } else {
                Ext.ux.form.SuperBoxSelect.superclass.initValue.call(sbs);
            }
            if (sbs.mode === 'remote') {
                sbs.value = 0;
            }
            console.log(sbs.value);
        }, 700);
    },
});

Ext.reg('infoblock-combo-templates', infoBlock.combo.templates);
