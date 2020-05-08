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
		forceSelection: false,
		tpl: new Ext.XTemplate(''
			+'<tpl for="."><div class="x-combo-list-item infoblock-resource-list-item">'
				+'<tpl if="parents">'
					+'<span class="parents">'
						+'<tpl for="parents">'
							+'<small>{pagetitle} / </small></br>'
						+'</tpl>'
					+'</span>'
				+'</tpl>'
			+'<span><tpl if="id"><sup><small>({id})</small></sup> </tpl><b>{pagetitle}</b></span>'
			+'</div></tpl>',
    {
		compiled: true
		}),
		itemSelector: 'div.infoblock-resource-list-item'
	});
	MODx.combo.resources.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.resources,MODx.combo.ComboBox);
Ext.reg('infoblock-filter-resources',MODx.combo.resources);
