<?php

namespace Magento\InterswitchPayGateway\Controller\interswitch;
use Magento\Sales\Api\OrderRepositoryInterface;

class UpdateOrder extends \Magento\Framework\App\Action\Action
{

    protected $orderRepository;

    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        OrderRepositoryInterface $orderRepository
    ) {
        $this->orderRepository = $orderRepository;
        return parent::__construct($context);
    }

    /**
     * say hello text
     */
    public function execute()
    {

        $resultRedirect = $this->resultRedirectFactory->create();
$resultRedirect->setPath('checkout/onepage/success');
return $resultRedirect;
        $orderId = 102;
        $order = $this->orderRepository->get($orderId);
        $order->setState(\Magento\Sales\Model\Order::STATE_PAYMENT_REVIEW);
        $order->setStatus(\Magento\Sales\Model\Order::STATE_PAYMENT_REVIEW);

try {
    $this->orderRepository->save($order);
} catch (\Exception $e) {
    $this->logger->error($e);
    $this->messageManager->addExceptionMessage($e, $e->getMessage());
}
    
        die("Hello ;) - Inchoo\\CustomControllers\\Controller\\Demonstration\\Sayhello - execute() method");
       
    }
}

?>