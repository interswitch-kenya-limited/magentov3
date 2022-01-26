# A Magento Extension for integrating card and mobile payments through Interswitch

This magento extension enables you to integrate Interswitch payments to your Magento Website

#### Suppoted Magento Versions
- Magento 2^


### Installing and configuring the Magento PlugIn

#### How to install the Magento Plugin
1. Unzip the folder where the extension is stored.
2. Copy the contents of the  folder to  `app/code/Magento` inside magento folder 
3. run `php magento setup:upgrade` to register plugin

#### How to configure the Magento Plugin
1. Log in to your Magento Admin Panel
2. Clear cache by going into System-> Cache Management, selecting all the files in the list, choosing the refresh option in the dropdown menu, and finally clicking Submit.
3. Go to System-> Configuration. 
4. Click on Payment Methods.
5. Select Interswitch Payment Gateway. 
6. Fill the Interswitch Configuration Form. 
7. Save the Configuration by clicking Save Config


### DISCLAIMER
This extension will not be supported if it is modified. 
