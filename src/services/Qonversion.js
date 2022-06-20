import Qonversion, { Property } from 'react-native-qonversion';

export function identifyQonversion(uid) {
    Qonversion.setProperty(Property.CUSTOM_USER_ID, uid);
    Qonversion.identify(uid);
}

export async function getProductsQonversion() {
    try {
        const offerings = await Qonversion.offerings();
        if (offerings.main !== null && offerings.main.products.length > 0) {
          // Display products for sale
          console.log('Products', offerings.main.products);
        }
      } catch (e) {
        console.log('No products', e);
        // handle error here
      }
}