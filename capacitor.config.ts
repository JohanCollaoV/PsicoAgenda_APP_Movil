import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'PsicoAgenda-MOVIL',
  webDir: 'www',
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/LocalDatabase',
      androidDatabaseLocation: 'default'
    }
  }
};

export default config;
