type Locale = 'en' | 'ja';

const DEV_URL = 'http://127.0.0.1:80';
const PROD_URL = 'https://petfabula.com';

const BASE_URL = process.env.NODE_ENV == 'production' ? PROD_URL : DEV_URL;

class ConnectionConfig {
  locale: Locale = 'ja';
  baseUrl = BASE_URL;

  TIME_OUT = 30 * 1000;

  setLocale(locale: Locale) {
    this.locale = locale;
  }
}

const connectionConfig = new ConnectionConfig();
export { connectionConfig };
