import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
//models
import { LocalStorageKeysEnum } from '@models/local-storage.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private secretKey = 'a9de0671-f9ee-443e-aa5b-7112340795eb';

  setLocalStorageKey<T>(key: string, value: T) {
    const encryptedValue = this.encryptData(value);
    localStorage.setItem(key, encryptedValue);
  }

  getLocalStorageKey(key: LocalStorageKeysEnum) {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue !== null) {
      return this.decryptData(encryptedValue);
    }
    return null;
  }

  removeAllLocalStorage() {
    localStorage.clear();
  }

  private encryptData<T>(value: T): string {
    const jsonString = JSON.stringify(value);
    return CryptoJS.AES.encrypt(jsonString, this.secretKey).toString();
  }

  private decryptData(encryptedValue: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }
}
