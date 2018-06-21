const crypto = require('crypto');

function toBase64(str) {
  return new Buffer(str).toString('base64');
}

function sign(input, secret) {
  return crypto.createHmac('HS256', secret).update(input).digest('base64');
}

function encode(payload, secret) {
  let header = {alg: 'HS256', typ: 'JWT'};
  let headerSegment = toBase64(JSON.stringify(header));
  let payloadSegment = toBase64(JSON.stringify(payload));
  let signSegment = sign([headerSegment, payloadSegment].join('.'), secret);
  return [headerSegment, payloadSegment, signSegment].join('.');
}

function fromBase64(input) {
  return new Buffer(input, 'base64').toString();
}

function decode(token, key) {
  let [headerSegment, payloadSegment, signSegment] = token.split('.');
  return JSON.parse(fromBase64(payloadSegment));
}

module.exports = { encode, decode };