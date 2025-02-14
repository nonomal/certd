/**
 * acme-client
 */
import AcmeClinet  from './client.js'
export const Client = AcmeClinet

/**
 * Directory URLs
 */

export const directory = {
    buypass: {
        staging: 'https://api.test4.buypass.no/acme/directory',
        production: 'https://api.buypass.com/acme/directory',
    },
    google: {
        staging: 'https://dv.acme-v02.test-api.pki.goog/directory',
        production: 'https://dv.acme-v02.api.pki.goog/directory',
    },
    letsencrypt: {
        staging: 'https://acme-staging-v02.api.letsencrypt.org/directory',
        production: 'https://acme-v02.api.letsencrypt.org/directory',
    },
    zerossl: {
        staging: 'https://acme.zerossl.com/v2/DV90',
        production: 'https://acme.zerossl.com/v2/DV90',
    },
};

/**
 * Crypto
 */

export * as crypto from './crypto/index.js'
export * as forge from './crypto/forge.js'

/**
 * Axios
 */

export *  from './axios.js'
/**
 * Logger
 */

export * from './logger.js'
export * from './verify.js'
export * from './error.js'
