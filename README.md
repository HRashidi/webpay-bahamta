[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/hrashidi/webpay-bahamta)](https://github.com/hrashidi/webpay-bahamta/releases/latest)
[![GitHub](https://img.shields.io/github/license/hrashidi/webpay-bahamta)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/hrashidi/webpay-bahamta)](https://github.com/hrashidi/webpay-bahamta/graphs/contributors)

# webpay-bahamta

This is a lib to handle payment from bahamta


## Installing

Using npm:

```bash
$ npm install webpay-bahamta
```

Using yarn:

```bash
$ yarn add axios
```

## Example
```js
const axios = require('webpay-bahamta');
```

Performing a `Payment` request

```js
let api_key = WEB_TOKEN; 
let reference = 'order#1';
let amount_irr = 100000 * 10;
let callback_url = 'https://example.com/chechout/success';
let payer_mobile = '0912*******';

let payment_response = await payment(api_key, reference, amount_irr, callback_url, payer_mobile);
if(! payment_response.ok) {
	throw new Error(payment_response.error);
}

let { payment_url } = payment_response.result;
console.log(payment_url);


let verify_response = await verify(api_key, reference, amount_irr);
if(! verify_response.ok) {
	throw new Error(verify_response.error);
}
let payment_info = verify_response.result
console.log(payment_info);
```

payment_url will be like:
```
https://webpay.bahamta.com/api/…
```

payment_data will be like:
```json
{
    "state": "paid",
    "total": 1000000,
    "wage": 5000,
    "gateway": "sep",
    "terminal": "11223344",
    "pay_ref": "GmshtyjwKSu5lKOLquYrzO9BqjUMb/TPUK0qak/iVs",
    "pay_trace": "935041",
    "pay_pan": "123456******1234",
    "pay_cid": "77CB1B455FB5F60415A7A02E4502134CFD72DBF6D1EC8FA2B48467DFB124AA75A",
    "pay_time": "2019-11-12T16:39:57.686436+03:30"
}
```