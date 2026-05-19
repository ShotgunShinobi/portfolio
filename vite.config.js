import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        about: resolve(__dirname, 'about.html'),
        projectNlp: resolve(__dirname, 'project-nlp.html'),
        projectDataviz: resolve(__dirname, 'project-dataviz.html'),
      }
    }
  }
});
