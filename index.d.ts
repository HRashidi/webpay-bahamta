// Payment Interfaces

export interface IPaymentResult {
	payment_url : string
}

export type IPaymentError = 
	| 'INVALID_API_CALL'
	| 'INVALID_API_KEY'
	| 'NOT_AUTHORIZED'
	| 'INVALID_AMOUNT'
	| 'LESS_THAN_WAGE_AMOUNT'
	| 'TOO_LESS_AMOUNT'
	| 'TOO_MUCH_AMOUNT'
	| 'INVALID_REFERENCE'
	| 'INVALID_TRUSTED_PAN'
	| 'INVALID_CALLBACK'
	| 'INVALID_PARAM'
	| 'ALREADY_PAID'
	| 'MISMATCHED_DATA'
	| 'NO_REG_TERMINAL'
	| 'NO_AVAILABLE_GATEWAY'
	| 'SERVICE_ERROR'
	| 'NETWORK_ERROR';

export interface IPaymentSuccesResponse {
	ok     : boolean,
	result : IWebpayResult,
}

export interface IPaymentErrorResponse {
	ok     : boolean,
	error  : IPaymentError
}

export type IPaymentResponse = IPaymentSuccesResponse | IPaymentErrorResponse;

/**
	* @param {string} api_key - The bahamta api-key: 'webpay:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz'
	* @param {string} reference - The order number (should be unique): 'order#1004'
	* @param {number} amount_irr - The amount of money in Rials: 100000
	* @param {string} callback_url - Call back url for bahamta recall (should start with http or https) : 'https://mydomain.ir/checkout/order#1004'
	* @param {string} payer_mobile - The payer mobile number: '98912*******'
	* @param {string} trusted_pan - The trusted credit cards number list: '6219234531241234,623254******5645,5453612376879876'

	* @returns {Promise} - Promise object represents server response success=({ok: true, result}), failure = ({ok: false, error})
*/
export function payment(api_key: string, reference: string, amount_irr: number, callback_url: string, payer_mobile?: string, trusted_pan?: string): Promise<IPaymentResponse>;


// Verify InterFaces
export type IVerifyError = 
	| 'INVALID_API_CALL'
	| 'INVALID_API_KEY'
	| 'NOT_AUTHORIZED'
	| 'INVALID_AMOUNT'
	| 'INVALID_REFERENCE'
	| 'INVALID_PARAM'
	| 'UNKNOWN_BILL'
	| 'MISMATCHED_DATA'
	| 'NOT_CONFIRMED'
	| 'SERVICE_ERROR'
	| 'NETWORK_ERROR';

export interface IVerifyResult {
	state     : string,
	total     : number,
	wage      : number,
	gateway   : string,
	terminal  : string,
	pay_ref   : string,
	pay_trace : string,
	pay_pan   : string,
	pay_cid   : string,
	pay_time  : Date
}


export interface IVerifySuccesResponse {
	ok     : boolean,
	result : IVerifyResult,
}

export interface IVerifyErrorResponse {
	ok     : boolean,
	error  : IVerifyError
}

export type IVerifyResponse = IVerifySuccesResponse | IVerifyErrorResponse;

/**
	* @param {string} api_key - The bahamta api-key: 'webpay:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz'
	* @param {string} reference - The order number (should be unique): 'order#1004'
	* @param {number} amount_irr - The amount of money in Rials: 100000
	* @returns {Promise} - Promise object represents server response success=({ok: true, result}), failure = ({ok: false, error})
*/
export function verify(api_key: string, reference: string, amount_irr: number): Promise<IVerifyResponse>;