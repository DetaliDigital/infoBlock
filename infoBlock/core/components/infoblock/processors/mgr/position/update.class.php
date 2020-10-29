<?php

class infoBlockPositionUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'infoBlockPosition';
    public $classKey = 'infoBlockPosition';
    public $languageTopics = ['infoblock'];
    //public $permission = 'save';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return bool|string
     */
    public function beforeSave()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $id = (int)$this->getProperty('id');
        $name = trim($this->getProperty('name'));
        if (empty($id)) {
            return $this->modx->lexicon('infoblock_position_err_ns');
        }

        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('infoblock_position_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name, 'id:!=' => $id])) {
            $this->modx->error->addField('name', $this->modx->lexicon('infoblock_position_err_ae'));
        }

        // Error settings level count infoBlockItem

        $count_item = $this->modx->getCount('infoBlockItem' , ['position_id' => $this->getProperty('id')]);

        if ($count_item >= $this->getProperty('limit') && $this->getProperty('limit') != null && $this->getProperty('limit') != 0) {
            $this->modx->error->addField('limit', $this->modx->lexicon('infoblock_position_err_limit'));
        }

        return parent::beforeSet();
    }
}

return 'infoBlockPositionUpdateProcessor';
