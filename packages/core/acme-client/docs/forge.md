## Objects

<dl>
<dt><a href="#forge">forge</a> : <code>object</code></dt>
<dd><p>Legacy node-forge crypto interface</p>
<p>DEPRECATION WARNING: This crypto interface is deprecated and will be removed from acme-client in a future
major release. Please migrate to the new <code>acme.crypto</code> interface at your earliest convenience.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#createPublicKey">createPublicKey</a> ⇒ <code>Promise.&lt;buffer&gt;</code></dt>
<dd><p>Create public key from a private RSA key</p>
</dd>
<dt><a href="#getPemBody">getPemBody</a> ⇒ <code>string</code></dt>
<dd><p>Parse body of PEM encoded object from buffer or string
If multiple objects are chained, the first body will be returned</p>
</dd>
<dt><a href="#splitPemChain">splitPemChain</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Split chain of PEM encoded objects from buffer or string into array</p>
</dd>
<dt><a href="#getModulus">getModulus</a> ⇒ <code>Promise.&lt;buffer&gt;</code></dt>
<dd><p>Get modulus</p>
</dd>
<dt><a href="#getPublicExponent">getPublicExponent</a> ⇒ <code>Promise.&lt;buffer&gt;</code></dt>
<dd><p>Get public exponent</p>
</dd>
<dt><a href="#readCsrDomains">readCsrDomains</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Read domains from a Certificate Signing Request</p>
</dd>
<dt><a href="#readCertificateInfo">readCertificateInfo</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Read information from a certificate</p>
</dd>
<dt><a href="#createCsr">createCsr</a> ⇒ <code>Promise.&lt;Array.&lt;buffer&gt;&gt;</code></dt>
<dd><p>Create a Certificate Signing Request</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#createPrivateKey">createPrivateKey([size])</a> ⇒ <code>Promise.&lt;buffer&gt;</code></dt>
<dd><p>Generate a private RSA key</p>
</dd>
</dl>

<a name="forge"></a>

## forge : <code>object</code>
Legacy node-forge crypto interface

DEPRECATION WARNING: This crypto interface is deprecated and will be removed from acme-client in a future
major release. Please migrate to the new `acme.crypto` interface at your earliest convenience.

**Kind**: global namespace  
<a name="createPublicKey"></a>

## createPublicKey ⇒ <code>Promise.&lt;buffer&gt;</code>
Create public key from a private RSA key

**Kind**: global constant  
**Returns**: <code>Promise.&lt;buffer&gt;</code> - PEM encoded public RSA key  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>buffer</code> \| <code>string</code> | PEM encoded private RSA key |

**Example**  
Create public key
```js
const publicKey = await acme.forge.createPublicKey(privateKey);
```
<a name="getPemBody"></a>

## getPemBody ⇒ <code>string</code>
Parse body of PEM encoded object from buffer or string
If multiple objects are chained, the first body will be returned

**Kind**: global constant  
**Returns**: <code>string</code> - PEM body  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>buffer</code> \| <code>string</code> | PEM encoded buffer or string |

<a name="splitPemChain"></a>

## splitPemChain ⇒ <code>Array.&lt;string&gt;</code>
Split chain of PEM encoded objects from buffer or string into array

**Kind**: global constant  
**Returns**: <code>Array.&lt;string&gt;</code> - Array of PEM bodies  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>buffer</code> \| <code>string</code> | PEM encoded buffer or string |

<a name="getModulus"></a>

## getModulus ⇒ <code>Promise.&lt;buffer&gt;</code>
Get modulus

**Kind**: global constant  
**Returns**: <code>Promise.&lt;buffer&gt;</code> - Modulus  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>buffer</code> \| <code>string</code> | PEM encoded private key, certificate or CSR |

**Example**  
Get modulus
```js
const m1 = await acme.forge.getModulus(privateKey);
const m2 = await acme.forge.getModulus(certificate);
const m3 = await acme.forge.getModulus(certificateRequest);
```
<a name="getPublicExponent"></a>

## getPublicExponent ⇒ <code>Promise.&lt;buffer&gt;</code>
Get public exponent

**Kind**: global constant  
**Returns**: <code>Promise.&lt;buffer&gt;</code> - Exponent  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>buffer</code> \| <code>string</code> | PEM encoded private key, certificate or CSR |

**Example**  
Get public exponent
```js
const e1 = await acme.forge.getPublicExponent(privateKey);
const e2 = await acme.forge.getPublicExponent(certificate);
const e3 = await acme.forge.getPublicExponent(certificateRequest);
```
<a name="readCsrDomains"></a>

## readCsrDomains ⇒ <code>Promise.&lt;object&gt;</code>
Read domains from a Certificate Signing Request

**Kind**: global constant  
**Returns**: <code>Promise.&lt;object&gt;</code> - {commonName, altNames}  

| Param | Type | Description |
| --- | --- | --- |
| csr | <code>buffer</code> \| <code>string</code> | PEM encoded Certificate Signing Request |

**Example**  
Read Certificate Signing Request domains
```js
const { commonName, altNames } = await acme.forge.readCsrDomains(certificateRequest);

console.log(`Common name: ${commonName}`);
console.log(`Alt names: ${altNames.join(', ')}`);
```
<a name="readCertificateInfo"></a>

## readCertificateInfo ⇒ <code>Promise.&lt;object&gt;</code>
Read information from a certificate

**Kind**: global constant  
**Returns**: <code>Promise.&lt;object&gt;</code> - Certificate info  

| Param | Type | Description |
| --- | --- | --- |
| cert | <code>buffer</code> \| <code>string</code> | PEM encoded certificate |

**Example**  
Read certificate information
```js
const info = await acme.forge.readCertificateInfo(certificate);
const { commonName, altNames } = info.domains;

console.log(`Not after: ${info.notAfter}`);
console.log(`Not before: ${info.notBefore}`);

console.log(`Common name: ${commonName}`);
console.log(`Alt names: ${altNames.join(', ')}`);
```
<a name="createCsr"></a>

## createCsr ⇒ <code>Promise.&lt;Array.&lt;buffer&gt;&gt;</code>
Create a Certificate Signing Request

**Kind**: global constant  
**Returns**: <code>Promise.&lt;Array.&lt;buffer&gt;&gt;</code> - [privateKey, certificateSigningRequest]  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| [data.keySize] | <code>number</code> | Size of newly created private key, default: `2048` |
| [data.commonName] | <code>string</code> |  |
| [data.altNames] | <code>Array.&lt;string&gt;</code> | default: `[]` |
| [data.country] | <code>string</code> |  |
| [data.state] | <code>string</code> |  |
| [data.locality] | <code>string</code> |  |
| [data.organization] | <code>string</code> |  |
| [data.organizationUnit] | <code>string</code> |  |
| [data.emailAddress] | <code>string</code> |  |
| [key] | <code>buffer</code> \| <code>string</code> | CSR private key |

**Example**  
Create a Certificate Signing Request
```js
const [certificateKey, certificateRequest] = await acme.forge.createCsr({
    altNames: ['test.example.com'],
});
```
**Example**  
Certificate Signing Request with both common and alternative names
> *Warning*: Certificate subject common name has been [deprecated](https://letsencrypt.org/docs/glossary/#def-CN) and its use is [discouraged](https://cabforum.org/uploads/BRv1.2.3.pdf).
```js
const [certificateKey, certificateRequest] = await acme.forge.createCsr({
    keySize: 4096,
    commonName: 'test.example.com',
    altNames: ['foo.example.com', 'bar.example.com'],
});
```
**Example**  
Certificate Signing Request with additional information
```js
const [certificateKey, certificateRequest] = await acme.forge.createCsr({
    altNames: ['test.example.com'],
    country: 'US',
    state: 'California',
    locality: 'Los Angeles',
    organization: 'The Company Inc.',
    organizationUnit: 'IT Department',
    emailAddress: 'contact@example.com',
});
```
**Example**  
Certificate Signing Request with predefined private key
```js
const certificateKey = await acme.forge.createPrivateKey();

const [, certificateRequest] = await acme.forge.createCsr({
    altNames: ['test.example.com'],
}, certificateKey);
<a name="createPrivateKey"></a>

## createPrivateKey([size]) ⇒ <code>Promise.&lt;buffer&gt;</code>
Generate a private RSA key

**Kind**: global function  
**Returns**: <code>Promise.&lt;buffer&gt;</code> - PEM encoded private RSA key  

| Param | Type | Description |
| --- | --- | --- |
| [size] | <code>number</code> | Size of the key, default: `2048` |

**Example**  
Generate private RSA key
```js
const privateKey = await acme.forge.createPrivateKey();
```
**Example**  
Private RSA key with defined size
```js
const privateKey = await acme.forge.createPrivateKey(4096);
```
