<?php

class infoBlockPositionCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'infoBlockPosition';
    public $classKey = 'infoBlockPosition';
    public $languageTopics = ['infoblock'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('infoblock_position_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name])) {
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

return 'infoBlockPositionCreateProcessor';
