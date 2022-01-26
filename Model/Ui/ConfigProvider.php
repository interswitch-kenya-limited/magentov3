<?php
/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Magento\InterswitchPayGateway\Model\Ui;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\InterswitchPayGateway\Gateway\Http\Client\ClientMock;
use Magento\Store\Model\Store as Store;

/**
 * Class ConfigProvider
 */
final class ConfigProvider implements ConfigProviderInterface
{
    const CODE = 'interswitch_gateway';


     /**
     * Payment ConfigProvider constructor.
     * @param \Magento\Payment\Helper\Data $paymentHelper
     */
    public function __construct(
        \Magento\Payment\Helper\Data $paymentHelper,  Store $store
    ) {
        $this->method = $paymentHelper->getMethodInstance(self::CODE);
        $this->store = $store;
    }

    /**
     * Retrieve assoc array of checkout configuration
     *
     * @return array
     */
    public function getConfig()
    {
        $domainCode = $this->method->getConfigData('domainCode');
        $currencyCode = $this->method->getConfigData('currencyCode');
        $terminalId = $this->method->getConfigData('terminalId');
        $iconUrl = $this->method->getConfigData('iconUrl');
        $checkoutUrl = $this->method->getConfigData('checkoutUrl');

        return [
            'payment' => [
                self::CODE => [
                    'transactionResults' => [
                        ClientMock::SUCCESS => __('Success'),
                        ClientMock::FAILURE => __('Fraud')
                    ],

                    'domainCode'=> $domainCode,
                    'currencyCode'=> $currencyCode,
                    'terminalId'=> $terminalId,
                    'iconUrl'=> $iconUrl,
                    'checkoutUrl'=> $checkoutUrl,
                    'redirectUrl'=> $this->store->getBaseUrl() . 'interswitchpay/interswitch/UpdateOrder'

                ]
            ]
        ];
    }

    
}
