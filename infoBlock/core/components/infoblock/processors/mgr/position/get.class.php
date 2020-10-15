<?php

class infoBlockPositionGetProcessor extends modObjectGetProcessor
{
    public $objectType = 'infoBlockPosition';
    public $classKey = 'infoBlockPosition';
    public $languageTopics = ['infoblock:default'];
    //public $permission = 'view';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return mixed
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        return parent::process();
    }

    public function cleanup()

    {
        $data = $this->object->toArray();

        //
        if(!empty($data['parents'])) {
            //
            $data['parents'] = is_array($data['parents'])
                ? $data['parents']
                : explode(',', $data['parents']);
            $data['parents[]'] = [];

            //
            $q = $this->modx->newQuery('modResource')
                ->select('id, pagetitle')
                ->where([
                    'id:IN' => $data['parents'],
                ])
                ->sortby('FIELD(id, ' . join(',', $data['parents']) . ')', '')
            ;
            if ($q->prepare()->execute()) {
                $data['parents'] = [];
                foreach (($q->stmt->fetchAll(PDO::FETCH_ASSOC) ?: []) as $v) {
                    $data['parents'][] = $v['pagetitle'];
                    $data['parents[]'][] = $v;
                }
            }
        }

        //
        $products = $this->modx->fromJSON($this->getProperty('parents', "[]"));
        foreach ($products as $key) {
            $rows = array();
            $c = $this->modx->newQuery('infoBlockPosition');
            $c->sortby('parents', 'ASC');
            $c->select('parents');
            $c->groupby('parents');
            $c->where(array(
                'id' => $this->object->get('id')
            ));
            $c->limit(0);
            if ($c->prepare() && $c->stmt->execute()) {
                $rows = $c->stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            $data = array_merge($data, array($key => $rows));
        }

        //
        if(!empty($data['templates'])) {
            //
            $data['templates'] = is_array($data['templates'])
                ? $data['templates']
                : explode(',', $data['templates']);
            $data['templates[]'] = [];

            //
            $q = $this->modx->newQuery('modTemplate')
                ->select('id, templatename')
                ->where([
                    'id:IN' => $data['templates'],
                ])
                ->sortby('FIELD(id, ' . join(',', $data['templates']) . ')', '')
            ;
            if ($q->prepare()->execute()) {
                $data['templates'] = [];
                foreach (($q->stmt->fetchAll(PDO::FETCH_ASSOC) ?: []) as $v) {
                    $data['templates'][] = $v['templates'];
                    $data['templates[]'][] = $v;
                }
            }
        }

        //
        $products = $this->modx->fromJSON($this->getProperty('templates', "[]"));
        foreach ($products as $key) {
            $rows = array();
            $c = $this->modx->newQuery('infoBlockPosition');
            $c->sortby('templates', 'ASC');
            $c->select('templates');
            $c->groupby('templates');
            $c->where(array(
                'id' => $this->object->get('id')
            ));
            $c->limit(0);
            if ($c->prepare() && $c->stmt->execute()) {
                $rows = $c->stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            $data = array_merge($data, array($key => $rows));
        }

        return $this->success('', $data);
    }


}

return 'infoBlockPositionGetProcessor';
