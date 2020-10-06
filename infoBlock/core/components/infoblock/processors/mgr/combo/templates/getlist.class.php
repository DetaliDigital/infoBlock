<?php

class infoBlockTemplateGetListProcessor extends modObjectGetListProcessor
{
    public $classKey = 'modTemplate';
    public $languageTopics = array('template');
    public $defaultSortField = 'templatename';

    /**
     * @return bool
     */
    public function initialize()
    {

        $this->setDefaultProperties(array(
            'combo' => true,
            'query' => '',
        ));

        return true;
    }

    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {

        if ($id = (int)$this->getProperty('id')) {
            $c->where(array('id' => $id));
        }
        if ($query = trim($this->getProperty('query'))) {
            $c->where(array(
                'templatename:LIKE' => "%{$query}%",
                'OR:description:LIKE' => "%{$query}%",
            ));
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

        if ($this->getProperty('combo')) {
        $array = array(
            'id' => $object->get('id'),
            'templatename' => $object->get('templatename'),
        );
        }

        return $array;
    }
}
return 'infoBlockTemplateGetListProcessor';
