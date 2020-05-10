<?php

/**
 * The home manager controller for infoBlock.
 *
 */
class infoBlockHomeManagerController extends modExtraManagerController
{
    /** @var infoBlock $infoBlock */
    public $infoBlock;


    /**
     *
     */
    public function initialize()
    {
        $this->infoBlock = $this->modx->getService('infoBlock', 'infoBlock', MODX_CORE_PATH . 'components/infoblock/model/');
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return ['infoblock:default'];
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('infoblock');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->infoBlock->config['cssUrl'] . 'mgr/main.css');
        $this->addJavascript($this->infoBlock->config['jsUrl'] . 'mgr/infoblock.js');
        $this->addJavascript($this->infoBlock->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->infoBlock->config['jsUrl'] . 'mgr/misc/combo.js');
        $this->addJavascript($this->infoBlock->config['jsUrl'] . 'mgr/widgets/items.grid.js');
        $this->addJavascript($this->infoBlock->config['jsUrl'] . 'mgr/widgets/items.windows.js');
        $this->addJavascript($this->infoBlock->config['jsUrl'] . 'mgr/widgets/positions.grid.js');
        $this->addJavascript($this->infoBlock->config['jsUrl'] . 'mgr/widgets/positons.windows.js');
        $this->addJavascript($this->infoBlock->config['jsUrl'] . 'mgr/widgets/items.gallery.windows.js');
        $this->addJavascript($this->infoBlock->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->infoBlock->config['jsUrl'] . 'mgr/sections/home.js');




// Конфиги добавил

        $this->addHtml('<script type="text/javascript">
        infoBlock.config = ' . json_encode($this->infoBlock->config) . ';
        infoBlock.config.connector_url = "' . $this->infoBlock->config['connectorUrl'] . '";
        Ext.onReady(function() {MODx.load({ xtype: "infoblock-page-home"});});
        ;
        </script>');


    }



    /**
     * @return string
     */
    public function getTemplateFile()
    {
        $this->content .= '<div id="infoblock-panel-home-div"></div>';

        return '';
    }
}
