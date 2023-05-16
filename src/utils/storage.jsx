import { AES, enc } from 'crypto-js';

const config = {
    secretKey: "b14ca5898a4e4133bbce2ea2315a1916"
}

const StorageService = localStorage;

/**
 * use to encrypt data
 * @method bsEncrypt
 */
 export function bsEncrypt(data) {
  const newString = JSON.stringify(data);
  return AES.encrypt(newString, config.secretKey).toString();
}

/**
 * use to decrypt data
 * @method bsDecrypt
 */
export function bsDecrypt(data) {
  if (!data) {
    return data;
  }
  const newString = AES.decrypt(data, config.secretKey);
  return newString.toString(enc.Utf8);
}

/**
 * Set value in local storage
 * @method set
 */
export function setItem(key, value) {
  value = bsEncrypt(value);
  StorageService.setItem(key, value);
}

/**
 * Get value form local storage
 * @method get
 */
export function getItem(key) {
  let data = StorageService.getItem(key);
  data = bsDecrypt(data);
  if (data != null && data !== '{}') {
    try {
      return JSON.parse(data);
    } catch (error) {
      // console.log(error)
    }
  }
  return null;
}

/**
 * clear local storage
 * @method flush
 */
export function removeItem(key) {
  if (key != null && key !== undefined) {
    StorageService.removeItem(key);
  } else {
    StorageService.clear();
  }
}

/*
 *
 * clear all storage data
 * */
export function clear() {
  StorageService.clear();
}



const allMethods = { getItem, removeItem, setItem, clear };

export default allMethods;
