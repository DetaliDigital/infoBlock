<?php

class infoBlockItemRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'infoBlockItem';
    public $classKey = 'infoBlockItem';
    public $languageTopics = ['infoblock'];
    //public $permission = 'remove';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('infoblock_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var infoBlockItem $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('infoblock_item_err_nf'));
            }

            $object->remove();
        }

        return $this->success();
    }

}

return 'infoBlockItemRemoveProcessor';