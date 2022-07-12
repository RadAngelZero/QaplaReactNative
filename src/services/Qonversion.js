import Qonversion, { Property } from 'react-native-qonversion';

export function identifyQonversion(uid) {
    Qonversion.setProperty(Property.CUSTOM_USER_ID, uid);
    Qonversion.identify(uid);
}

export async function purchaseProduct(productId) {
    try {
        const permissions = await Qonversion.purchaseProduct(productId);
        console.log(permissions);
    } catch (e) {
        if (e.userCanceled) {
          // purchase canceled by the user
        }
        console.log(e);
    }
}

export async function getProductsQonversion() {
    try {
        const offerings = await Qonversion.products();
        offerings.forEach((prod) => {
            if (prod.currencyCode) {
                console.log(prod);
            }
        });
      } catch (e) {
        console.log('No products', e);
        // handle error here
      }
}