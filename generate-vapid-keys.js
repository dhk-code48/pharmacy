const webpush = require("web-push");
const vapidKeys = webpush.generateVAPIDKeys();

console.log("Paste the following keys in your .env file:");
console.log("-------------------");
console.log("NEXT_PUBLIC_VAPID_PUBLIC_KEY=", vapidKeys.publicKey);
console.log("VAPID_PRIVATE_KEY=", vapidKeys.privateKey);

/**
 * Multitenant pharmacy website, where use can upload prescription and our website sends it automatically to nearest pharmacy so that user can order medicines from their nearest pharmacy to their door steps.
 *
 */
