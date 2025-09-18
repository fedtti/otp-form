import type { UserConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default {
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: './',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'assets/css/style': 'src/scss/style.scss',
        'assets/js/app': 'src/ts/app.ts',
        'assets/js/otp-form': 'src/ts/otp-form.ts',
        index: 'index.html',
      },
      output: [
        {
          entryFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
        }
      ]
    },
  },
  plugins: [
    tailwindcss(),
  ],
  preview: {
    open: true,
  }
} satisfies UserConfig;
