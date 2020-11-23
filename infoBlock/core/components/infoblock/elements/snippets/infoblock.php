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

$q = $modx->newQuery('infoBlockPosition');
$q->select($modx->getSelectColumns('infoBlockPosition', 'infoBlockPosition'));
$q->where(['active' => 1, 'id' => $id]);

$output = '';

if ($q->prepare() && $q->stmt->execute()) {
    $position = $q->stmt->fetch(PDO::FETCH_ASSOC);
    if ($position) {

        $template = $modx->resource->get('template');
        $position['tpls'] = $modx->fromJSON($position['tpls']);

        if (empty($position['tpls']) || in_array($template, $position['tpls'])) {

            $position['items'] = [];
            $q = $modx->newQuery('infoBlockItem');
            $q->select($modx->getSelectColumns('infoBlockItem', 'infoBlockItem'));
            $q->where(['active' => 1, 'position_id' => $id]);
            if ($q->prepare() && $q->stmt->execute()) {
                while ($row = $q->stmt->fetch(PDO::FETCH_ASSOC)) {
                    $position['items'][] = $row;
                }
            }
            $tpl = $pdo->getArray('modChunk', $position['tpl']);
            $output = $pdo->getChunk($tpl['name'], $position);
        }
    }
}

echo '<pre>';
print_r($position);
echo '</pre>';
return $output;