<?php

class infoBlockModResourcesProcessor extends modObjectGetListProcessor

{
    public $classKey = 'modResource';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
    protected $id = 0;

    /**
     * @return bool
     */
    public function initialize()
{
    if ($this->getProperty('combo') && !$this->getProperty('limit') && $id = (int)$this->getProperty('id')) {
        $this->id = $id;
    }
    $this->setDefaultProperties(array(
        'parents' => 3,
        'start' => 0,
        'limit' => 20,
        'sort' => $this->defaultSortField,
        'dir' => $this->defaultSortDirection,
        'combo' => true,
        'query' => '',
    ));

    return true;
}


    /**
     * @return array|string
     */
    public function process()
{
    $beforeQuery = $this->beforeQuery();
    if ($beforeQuery !== true) {
        return $this->failure($beforeQuery);
    }
    $data = $this->getData();
    $list = $this->iterate($data);

    return $this->outputArray($list, $data['total']);
}


    /**
     * @return array
     */
    public function getData()
{
    $data = array();
    $limit = intval($this->getProperty('limit'));
    $start = intval($this->getProperty('start'));

    /* query for chunks */
    $c = $this->modx->newQuery($this->classKey);
    $c = $this->prepareQueryBeforeCount($c);
    $data['total'] = $this->modx->getCount($this->classKey, $c);
    $c = $this->prepareQueryAfterCount($c);

    $sortClassKey = $this->getSortClassKey();
    $sortKey = $this->modx->getSelectColumns($sortClassKey, $this->getProperty('sortAlias', $sortClassKey), '',
        array($this->getProperty('sort')));
    if (empty($sortKey)) {
        $sortKey = $this->getProperty('sort');
    }
    $c->sortby($sortKey, $this->getProperty('dir'));
    if ($limit > 0) {
        $c->limit($limit, $start);
    }

    if ($c->prepare() && $c->stmt->execute()) {
        $data['results'] = $c->stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    return $data;
}


    /**
     * @param array $data
     *
     * @return array
     */
    public function iterate(array $data)
{
    $list = array();
    $list = $this->beforeIteration($list);
    $this->currentIndex = 0;
    /** @var xPDOObject|modAccessibleObject $object */
    foreach ($data['results'] as $array) {
        $objectArray = $this->prepareResult($array);
        if (!empty($objectArray) && is_array($objectArray)) {
            $list[] = $objectArray;
            $this->currentIndex++;
        }
    }
    $list = $this->afterIteration($list);

    return $list;
}



    /**
     * {@inheritDoc}
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $c->select('id,parent,pagetitle,context_key');
        if ($query = $this->getProperty('query')) {
            $c->where(array('pagetitle:LIKE' => "%$query%"));
        }

        return $c;
    }


    /**
     * @param array $resourceArray
     *
     * @return array
     */
    public function prepareResult(array $resourceArray)
{
    $resourceArray['parents'] = array();
    $parents = $this->modx->getParentIds($resourceArray['id'], 2,
        array('context' => $resourceArray['context_key']));
    if ($parents[count($parents) - 1] == 0) {
        unset($parents[count($parents) - 1]);
    }
    if (!empty($parents) && is_array($parents)) {
        $q = $this->modx->newQuery('msProduct', array('id:IN' => $parents));
        $q->select('id,pagetitle');
        if ($q->prepare() && $q->stmt->execute()) {
            while ($row = $q->stmt->fetch(PDO::FETCH_ASSOC)) {
                $key = array_search($row['id'], $parents);
                if ($key !== false) {
                    $parents[$key] = $row;
                }
            }
        }
        $resourceArray['parents'] = array_reverse($parents);
    }

    return $resourceArray;
}

    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
{
    $data = array();
    if ($this->getProperty('combo')) {
        $data = array(
            'id' => $object->get('id'),
            'pagetitle' => $object->get('pagetitle'),
        );
    }

    return $data;
}

}

return 'infoBlockModResourcesProcessor';