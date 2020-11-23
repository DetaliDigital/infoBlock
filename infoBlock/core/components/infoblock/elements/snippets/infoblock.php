<?php

/** @var modX $modx */
/** @var array $scriptProperties */
/** @var infoBlock $infoBlock */
/** @var pdoFetch $pdo */

$infoBlock = $modx->getService('infoBlock', 'infoBlock', MODX_CORE_PATH . 'components/infoblock/model/', $scriptProperties);
$pdo = $modx->getService('pdoFetch');

if (!$infoBlock) {
    return 'Could not load infoBlock class!';
}

if (!$pdo) {
    return 'Could not load pdoFetch class!';
}

// Do your snippet code here. This demo grabs 5 items from our custom table.

$id = $modx->getOption('id', $scriptProperties, 1);
$sortby = $modx->getOption('sortby', $scriptProperties, 'name');
$sortdir = $modx->getOption('sortbir', $scriptProperties, 'ASC');
$limit = $modx->getOption('limit', $scriptProperties, 5);
$outputSeparator = $modx->getOption('outputSeparator', $scriptProperties, "\n");

$q = $modx->newQuery('infoBlockItem');
$q->select($modx->getSelectColumns('infoBlockItem', 'infoBlockItem'));
$q->where(['active' => 1, 'position_id' => $id]);
$items = [];

if ($q->prepare() && $q->stmt->execute()) {
    while ($row = $q->stmt->fetch(PDO::FETCH_ASSOC)) {
        $items[] = $row;
    }
}

$q = $modx->newQuery('infoBlockPosition');
$q->select($modx->getSelectColumns('infoBlockPosition', 'infoBlockPosition'));
$q->where(['active' => 1, 'id' => $id]);
$data = [];

if ($q->prepare() && $q->stmt->execute()) {
    while ($outer = $q->stmt->fetch(PDO::FETCH_ASSOC)) {

        $tpl = $outer['chunk'];
        $data['positions'][] = $outer;
        foreach ($items as $item) {
            $data['positions'][0]['items'][] = $item;
        }
    }
}

$tpl = $pdo->getArray('modChunk', $tpl);
return $pdo->getChunk($tpl['name'], $data);