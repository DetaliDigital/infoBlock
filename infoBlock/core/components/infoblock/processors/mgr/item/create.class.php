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
        }

        // Output date if createdon == ''

        $this->setProperty('createdon', date($this->modx->getOption('manager_date_format') . ' ' . $this->modx->getOption('manager_time_format')));

        // Error validate field position if value == 0

        $position = $this->getProperty('position_id');
        $active = $this->getProperty('active');

        if ($position == 0) {
        $this->modx->error->addField('position_id', $this->modx->lexicon('infoblock_item_err_position'));
        }

        // Error settings level infoBlockPosition

        $object = $this->modx->getObject('infoBlockPosition' , $position);

        if ($this->modx->getCount($this->classKey, ['position_id' => $position]) >= $object->get('limit') && $object->get('limit') != null && $object->get('limit') != 0) {
            $this->modx->error->failure('В настройке инфоблока ' . $object->get('name') . ' стоит ограничение не более ' . $object->get('limit') . ' элемента(ов). Обратите внимание, что данная настройка использульется администратором при условии, если в шаблоне отсутствует возможность вывода большего количества элементов.');
        }

        return parent::beforeSet();
    }

}

return 'infoBlockItemCreateProcessor';
