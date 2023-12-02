class LocalStorageService {
  getItem(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  setItem(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key) {
    window.localStorage.removeItem(key);
  }
}

export const LocalStorage = new LocalStorageService();
