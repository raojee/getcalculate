import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.techprogarage.thecalcpro',
  appName: 'TheCalcPro',
  webDir: 'dist/client',
  server: {
    androidScheme: 'https',
  },
};

export default config;
