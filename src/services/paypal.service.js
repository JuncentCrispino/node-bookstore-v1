import fetch from 'isomorphic-fetch';
import config from '../config/index.js';
const base = 'https://api-m.sandbox.paypal.com';

export async function paypalOrder(item) {

  const purchase_units = item.map(product => {
    return {
      reference_id: product.productId,
      packageName: product.productName,
      amount: {
        currency_code: 'PHP',
        value: product.price * product.qty
      }

    };
  });

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units
    })
  });

  return handleResponse(response);
}

export async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });

  return handleResponse(response);
}

export async function generateAccessToken() {
  const auth = Buffer.from(config.paypal.client + ':' + config.paypal.secret).toString('base64');
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`
    }
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }
  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
