const B2 = require('backblaze-b2');

const b2 = new B2({
    applicationKeyId: process.env.B2_APP_KEY_ID,
    applicationKey: process.env.B2_APP_KEY
});

module.exports = {
    b2
}