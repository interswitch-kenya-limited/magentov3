/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
/*global define*/
define(
    [
        'Magento_Checkout/js/view/payment/default',
        'jquery',
        'Magento_Checkout/js/model/totals',
        'Magento_Checkout/js/model/quote'
    ],

    function(Component, $, totals, quote) {
        'use strict';

        return Component.extend({

            defaults: {
                template: 'Magento_InterswitchPayGateway/payment/form',
                transactionResult: ''
            },

            getGrandTotal: function() {

                if (totals.totals()) {

                    var grandTotal = parseFloat(totals.totals()['grand_total']);
                    return grandTotal;

                }

            },

            redirectAfterPlaceOrder: false, // this is optional
            /**
             * After place order callback
             */
            afterPlaceOrder: function(resp) {

                // your super awesome code
                console.log(resp)
                var config = window.checkoutConfig.payment.interswitch_gateway;

                var shippingAddress = quote.shippingAddress();
                var billingAddress = quote.billingAddress();

                console.log(shippingAddress);

                // do assignments here
                $("#ipg_gateway").attr('action', config.checkoutUrl)
                $("input[name='domain']").val(config.domainCode);
                $("input[name='transactionReference']").val(resp);
                $("input[name='orderId']").val(resp);
                $("input[name='currencyCode']").val(config.currencyCode);
                $("input[name='terminalId']").val(config.terminalId);
                $("input[name='domain']").val(config.domainCode);
                $("input[name='redirectUrl']").val(config.redirectUrl + '?id=' + resp);
                $("input[name='iconUrl']").val(config.iconUrl);
                $("input[name='customerId']").val(shippingAddress.customerId);
                $("input[name='customerFirstName']").val(shippingAddress.firstname);
                $("input[name='customerSecondName']").val(shippingAddress.lastname);
                $("input[name='customerEmail']").val(shippingAddress.email);
                $("input[name='customerMobile']").val(shippingAddress.telephone);
                $("input[name='customerCity']").val(shippingAddress.city);
                $("input[name='customerCountry']").val(shippingAddress.countryId);
                $("input[name='customerPostalCode']").val(shippingAddress.postcode);
                $("input[name='customerStreet']").val(shippingAddress.street[0]);
                $("input[name='customerState']").val(shippingAddress.city);

                var customerInfo = shippingAddress.customerId + '|' + shippingAddress.firstname + '|' + shippingAddress.lastname + '|' + shippingAddress.email + '|' + shippingAddress.telephone + '|' + shippingAddress.city + '|' + shippingAddress.countryId + '|' +
                    shippingAddress.postcode + '|' + shippingAddress.street[0] + '|' + shippingAddress.city;

                $("input[name='customerInfor']").val(customerInfo);

                document.getElementById("ipg_gateway").submit();


            },

            /**
             * Place order.
             */
            placeOrder: function(data, event) {
                var self = this;

                if (event) {
                    event.preventDefault();
                }

                if (this.validate() &&

                    this.isPlaceOrderActionAllowed() === true
                ) {
                    this.isPlaceOrderActionAllowed(false);

                    this.getPlaceOrderDeferredObject()
                        .done(
                            function(response) {
                                self.afterPlaceOrder(response);

                                if (self.redirectAfterPlaceOrder) {
                                    redirectOnSuccessAction.execute();
                                }
                            }
                        ).always(
                            function() {
                                self.isPlaceOrderActionAllowed(true);
                            }
                        );

                    return true;
                }

                return false;
            },

            initObservable: function() {

                this._super()
                    .observe([
                        'transactionResult'
                    ]);
                return this;
            },

            getCode: function() {
                return 'interswitch_gateway';
            },

            getData: function() {
                return {
                    'method': this.item.method,
                    'additional_data': {
                        'transaction_result': this.transactionResult()
                    }
                };
            },

            getTransactionResults: function() {
                return _.map(window.checkoutConfig.payment.interswitch_gateway.transactionResults, function(value, key) {
                    return {
                        'value': key,
                        'transaction_result': value
                    }
                });
            }

        });
    }
);