<?php
/** @var modX $modx */
/** @var array $scriptProperties */
/** @var infoBlock $infoBlock */

$infoBlock = $modx->getService('infoBlock', 'infoBlock', MODX_CORE_PATH . 'components/infoblock/model/', $scriptProperties);
if (!$infoBlock) {
    return 'Could not load infoBlock class!';
}

// Do your snippet code here. This demo grabs 5 items from our custom table.
$tpl = $modx->getOption('tpl', $scriptProperties, 'Item');
$sortby = $modx->getOption('sortby', $scriptProperties, 'name');
$sortdir = $modx->getOption('sortbir', $scriptProperties, 'ASC');
$limit = $modx->getOption('limit', $scriptProperties, 5);
$outputSeparator = $modx->getOption('outputSeparator', $scriptProperties, "\n");
$id = $modx->getOption('id', $scriptProperties, 1);

// Build query

$c = $modx->newQuery('infoBlockPosition');
$c->where(['active' => 1 , 'id' => $id]);
$c->limit(1);

$q = $modx->newQuery('infoBlockItem');
$q->sortby($sortby, $sortdir);
$q->where(['active' => 1 , 'position_id' => $id]);
$q->limit($limit);


$positions = $modx->getIterator('infoBlockPosition', $c);
$items = $modx->getIterator('infoBlockItem', $q);


$output = [];

foreach ($positions as $position) {
    $output['positions'][] = $position->toArray();
    foreach ($items as $item) {
        $output['positions'][0]['items'][] = $item->toArray();
    }
}

/** @var pdoTools $pdoTools */

$chunk = $modx->getObject('modChunk', $output['positions'][0]['chunk']);
$tpl = $chunk->get('name');

$pdoTools = $modx->getService('pdoTools');
return $pdoTools->getChunk($tpl, $output);