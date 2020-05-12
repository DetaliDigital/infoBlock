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
		emptyText: '',
		url: infoBlock.config.connectorUrl,
		baseParams: {
			action: 'mgr/resource/getlist'
		},
    triggerConfig: {
        tag: 'span',
        cls: 'x-field-combo-btns',
        cn: [
            {tag: 'div', cls: 'x-form-trigger x-field-combo-list'},
            {tag: 'div', cls: 'x-form-trigger x-field-combo-mytrigger'}
        ]
    },
    onTriggerClick: function(event, btn) {
        if (btn && Ext.get(btn).hasClass('x-field-combo-mytrigger')) {
            alert('Нажата кнопка триггера 2');
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
        allowBlank: true,
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
                {tag: 'div', cls: 'x-form-trigger x-field-combo-mytrigger'}
            ]
        },
        onTriggerClick: function(event, btn) {
            if (btn && Ext.get(btn).hasClass('x-field-combo-mytrigger')) {
                alert('Нажата кнопка триггера 2');
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
        url: infoBlock.config['connector_url'],
        baseParams: {
            action: 'mgr/system/element/chunk/getlist',
            mode: 'chunks'
        },
        triggerConfig: {
            tag: 'span',
            cls: 'x-field-combo-btns',
            cn: [
                {tag: 'div', cls: 'x-form-trigger x-field-combo-list'},
                {tag: 'div', cls: 'x-form-trigger x-field-combo-mytrigger'}
            ]
        },
        onTriggerClick: function(event, btn) {
            if (btn && Ext.get(btn).hasClass('x-field-combo-mytrigger')) {
                alert('Нажата кнопка триггера 2');
            } else {
                MODx.combo.ComboBox.superclass.onTriggerClick.call(this);
            }
        }
    });
    infoBlock.combo.Chunk.superclass.constructor.call(this, config);
};
Ext.extend(infoBlock.combo.Chunk, MODx.combo.ComboBox);
Ext.reg('infoblock-combo-chunk', infoBlock.combo.Chunk);
