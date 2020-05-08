<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/infoBlock/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/infoblock')) {
            $cache->deleteTree(
                $dev . 'assets/components/infoblock/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/infoblock/', $dev . 'assets/components/infoblock');
        }
        if (!is_link($dev . 'core/components/infoblock')) {
            $cache->deleteTree(
                $dev . 'core/components/infoblock/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/infoblock/', $dev . 'core/components/infoblock');
        }
    }
}

return true;