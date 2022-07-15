import { Platform } from 'react-native';
import Qonversion, { Property } from 'react-native-qonversion';
import { addQoinsToUser, getAndroidProductDetails } from './database';

/**
 * Identify the user on Qonversion
 * @param {string} uid User identifier
 */
export function identifyQonversion(uid) {
    Qonversion.setProperty(Property.CUSTOM_USER_ID, uid);
    Qonversion.identify(uid);
}

/**
 * Send to payment processs and handle result
 * @param {string} uid User identifier
 * @param {string} productId Qonversion product identifier
 * @param {string} storeId Native store (Apple or Google) identifier
 * @param {function} onSuccess Function called after a successful payment
 * @param {function} onPendingPurchase Function called on Pending purchase
 */
export async function purchaseProduct(uid, productId, storeId, onSuccess, onPendingPurchase) {
    identifyQonversion(uid);
    try {
        if (Platform.OS === 'android') {
            await Qonversion.purchase(productId);
            const productDetails = await getAndroidProductDetails(storeId);
            if (productDetails.val().type === 'Qoins') {
                await addQoinsToUser(uid, productDetails.val().amount);
            }
            onSuccess();
        } else {
            const permissions = await Qonversion.purchaseProduct(productId);
            console.log(permissions);
        }
    } catch (e) {
        if (e.message.trim() === 'Purchase is pending') {
            onPendingPurchase();
        }
        if (e.userCanceled) {
            console.log('canceled');
        }
    }
}

/**
 * Get all the products from Qonversion
 */
export async function getProductsQonversion() {
    try {
        return await Qonversion.products();
      } catch (e) {
        console.log('No products', e);
        // handle error here
      }
}