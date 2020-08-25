<?php

class infoBlockItemCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'infoBlockItem';
    public $classKey = 'infoBlockItem';
    public $languageTopics = ['infoblock'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
          $this->modx->error->addField('name', $this->modx->lexicon('infoblock_item_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name])) {
          $this->modx->error->addField('name', $this->modx->lexicon('infoblock_item_err_ae'));
        }

        // Output date if createdon == ''

        $this->setProperty('createdon', date($this->modx->getOption('manager_date_format') . ' ' . $this->modx->getOption('manager_time_format')));

        // Error validate field position if value == 0

        $position = $this->getProperty('position_id');
        $active = $this->getProperty('active');

        if ($position == 0) {
        $this->modx->error->addField('position_id', $this->modx->lexicon('infoblock_item_err_position'));
        }

        return parent::beforeSet();
    }

}

return 'infoBlockItemCreateProcessor';
