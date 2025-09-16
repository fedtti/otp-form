import type { UserConfig } from 'vite';

export default {
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: './',
    emptyOutDir: true,
    rolldownOptions: {
      input: {
        'assets/js/otp-form': 'src/ts/otp-form.ts',
        index: 'index.html',
      },
      output: [
        {
          entryFileNames: '[name].js',
        }
      ]
    },
  },
  preview: {
    open: true,
  }
} satisfies UserConfig;
