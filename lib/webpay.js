'use strict';

const axios = require('axios').default;
const pjson = require('../package.json');

const BASE_URL = 'https://webpay.bahamta.com/api';
const DOCS_URL = 'https://webpay.bahamta.com/doc/api';
const USER_AGENT = `Webpay NodeJS Library - ${pjson.version}`;

axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if(!error.response)
			error.response = {
				data: { ok: false, error: 'NETWORK_ERROR', apidoc: DOCS_URL},
				status: 500,
			};
		return Promise.reject(error.response);
	}
);

const serverCall = config => {
	config.headers = {
		"user-agent": USER_AGENT,
	};

	config.baseURL = BASE_URL;
	config.timeout = 60 * .5 * 1000; // Let's say you want to wait at least .5 mins
	return axios(config);
};

/**
	* @param {string} api_key - The bahamta api-key: 'webpay:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz'
	* @param {string} reference - The order number (should be unique): 'order#1004'
	* @param {number} amount_irr - The amount of money in Rials: 100000
	* @param {string} callback_url - Call back url for bahamta recall (should start with http or https) : 'https://mydomain.ir/checkout/order#1004'
	* @param {string} payer_mobile - The payer mobile number: '98912*******'
	* @param {string} trusted_pan - The trusted credit cards number list: '6219234531241234,623254******5645,5453612376879876'

	* @returns {Promise} - Promise object represents server response success=({ok: true, result}), failure = ({ok: false, error})
*/
const payment = async (
	api_key,
	reference,
	amount_irr,
	callback_url,
	payer_mobile = null,
	trusted_pan = null
	) => {

	try {

		let params = {
			api_key,
			reference,
			amount_irr,
			callback_url,
			payer_mobile,
			trusted_pan
		};
		const response = await serverCall({method: 'GET', url:`/create_request`, params: params});
		return response.data;
	} catch (error) {
		return {...response.data, apidoc: DOCS_URL};
	}
}

/**
	* @param {string} api_key - The bahamta api-key: 'webpay:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz'
	* @param {string} reference - The order number (should be unique): 'order#1004'
	* @param {number} amount_irr - The amount of money in Rials: 100000
	* @returns {Promise} - Promise object represents server response success=({ok: true, result}), failure = ({ok: false, error})
*/
const verify = async (
	api_key,
	reference,
	amount_irr
	) => {
		
	try {
		let params = {
			api_key,
			reference,
			amount_irr
		};
		const response = await serverCall({method: 'GET', url:`/confirm_payment`, params});
		return response.data;
	} catch (error) {
		return {...response.data, apidoc: DOCS_URL};
	}
}

module.exports = {
	payment : payment,
	verify : verify
};