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
$toPlaceholder = $modx->getOption('toPlaceholder', $scriptProperties, false);

// Build query

$c = $modx->newQuery('infoBlockPosition');
$c->where(['active' => 1 , 'id' => 1]);
$c->limit(1);

$q = $modx->newQuery('infoBlockItem');
$q->sortby($sortby, $sortdir);
$q->where(['active' => 1 , 'position_id' => 1]);
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
$pdoTools = $modx->getService('pdoTools');
return $pdoTools->getChunk($tpl, $output);