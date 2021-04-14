'use strict';
const webpay = require('../lib/webpay');
require('dotenv').config('../.env');

let api_key = process.env.WEB_TOKEN;
let reference = 'order-1';
let amount_irr = 100000 * 10;
let callback_url = 'https://example.com/chechout/success';
let payer_mobile = '0912*******';

const example = async () => {
	let payment_response = await webpay.payment(api_key, reference, amount_irr, callback_url, payer_mobile);
	if(! payment_response.ok) {
		throw new Error(payment_response.error);
	}
	let { payment_url } = payment_response.result;
	console.log(payment_url);

	let verify_response = await webpay.verify(api_key, reference, amount_irr);
	if(! verify_response.ok) {
		throw new Error(verify_response.error);
	}
	let payment_info = verify_response.result;
	console.log(payment_info);
}

example();
