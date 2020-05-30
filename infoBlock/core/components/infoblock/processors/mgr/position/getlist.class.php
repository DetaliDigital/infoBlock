<?php

class infoBlockPositionGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'infoBlockPosition';
    public $classKey = 'infoBlockPosition';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    //public $permission = 'list';


    /**
     * We do a special check of permissions
     * because our objects is not an instances of modAccessibleObject
     *
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where([
                'name:LIKE' => "%{$query}%",
                'OR:alias:LIKE' => "%{$query}%",
            ]);
        }

        return $c;
    }


    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = $object->toArray();
        $array['actions'] = [];

        // Edit
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('infoblock_position_update'),
            //'multiple' => $this->modx->lexicon('infoblock_items_update'),
            'action' => 'updatePosition',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('infoblock_position_enable'),
                'multiple' => $this->modx->lexicon('infoblock_position_enable'),
                'action' => 'enablePosition',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('infoblock_position_disable'),
                'multiple' => $this->modx->lexicon('infoblock_position_disable'),
                'action' => 'disablePosition',
                'button' => true,
                'menu' => true,
            ];
        }

        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('infoblock_position_remove'),
            'multiple' => $this->modx->lexicon('infoblock_position_remove'),
            'action' => 'removePosition',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'infoBlockPositionGetListProcessor';
