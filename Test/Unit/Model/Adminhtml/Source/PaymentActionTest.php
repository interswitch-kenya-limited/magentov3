<?php
/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Magento\InterswitchPayGateway\Test\Unit\Model\Adminhtml\Source;

use Magento\Payment\Model\Method\AbstractMethod;
use Magento\InterswitchPayGateway\Model\Adminhtml\Source\PaymentAction;

class PaymentActionTest extends \PHPUnit_Framework_TestCase
{
    public function testToOptionArray()
    {
        $sourceModel = new PaymentAction();

        static::assertEquals(
            [
                [
                    'value' => AbstractMethod::ACTION_AUTHORIZE,
                    'label' => __('Authorize')
                ]
            ],
            $sourceModel->toOptionArray()
        );
    }
}