<?php

/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */

if ($transport->xpdo) {

    $modx =& $transport->xpdo;
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:

        /** @var modSystemSetting $setting */
            if ($setting = $modx->getObject('modSystemSetting', array('key' => 'infoblock_allowed_chunks_category'))) {
                if (!$setting->get('editedon')) {
                    /** @var modCategory $category */
                    if ($category = $modx->getObject('modCategory', array('category' => 'infoBlock'))) {
                        $setting->set('value', $category->get('id'));
                        $setting->save();
                    }
                }
            }
            break;

        case xPDOTransport::ACTION_UNINSTALL:

            }
        }
    return true;
