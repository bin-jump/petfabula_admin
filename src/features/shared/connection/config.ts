type Locale = 'en' | 'ja';

class ConnectionConfig {
  locale: Locale = 'ja';
  baseUrl = 'http://127.0.0.1:80';

  TIME_OUT = 15 * 1000;

  setLocale(locale: Locale) {
    this.locale = locale;
  }
}

const connectionConfig = new ConnectionConfig();
export { connectionConfig };
