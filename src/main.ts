import { createApp } from 'vue';
import App from './App.vue';
import '@aws-amplify/ui-vue/styles.css';

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json'; // Update path as needed

Amplify.configure(outputs);

createApp(App).mount('#app');
