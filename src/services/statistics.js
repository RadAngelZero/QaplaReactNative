// diego          - 02-09-2019 - us91 - File creation

import analytics from '@segment/analytics-react-native';

export async function initializeSegment() {
    try {
        await analytics.setup('Jngk5nWegue5IJe5XPV86T46qrA1nRCQ', {
            // Record screen views automatically!
            recordScreenViews: true,
            // Record certain application events automatically!
            trackAppLifecycleEvents: true,
            flushAt: 5
        });
    } catch (error) {
        console.log('On setup');
        console.error(error);
    }
}

export async function recordScreenOnSegment(screen, properties = {}) {
    try {
        properties.createdAt = new Date().getTime();
        await analytics.screen(screen, properties);
    } catch (error) {
        console.error(error);
    }
}

export async function trackOnSegment(event, properties = {}) {
    try {
        properties.createdAt = new Date().getTime();
        await analytics.track(event, properties);
    } catch (error) {
        console.error(error);
    }
}

export async function setUserIdOnSegment(uid) {
    try {
        analytics.identify(uid);
    } catch (error) {
        console.error(error);
    }
}