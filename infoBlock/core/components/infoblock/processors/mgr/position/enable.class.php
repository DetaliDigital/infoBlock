<?php

class infoBlockPositionEnableProcessor extends modObjectProcessor
{
    public $objectType = 'infoBlockPosition';
    public $classKey = 'infoBlockPosition';
    public $languageTopics = ['infoblock'];
    //public $permission = 'save';


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
            return $this->failure($this->modx->lexicon('infoblock_position_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var infoBlockPosition $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('infoblock_position_err_nf'));
            }

            $object->set('active', true);
            $object->save();
        }

        return $this->success();
    }

}

return 'infoBlockPositionEnableProcessor';
