import { createRouter, createWebHistory } from 'vue-router';
import PersonList from './components/PersonList.vue';
import PersonForm from './components/PersonForm.vue';
import JobForm from './components/JobForm.vue';
import PersonDetail from './components/PersonDetail.vue';

const routes = [
  { path: '/', component: PersonList },
  { path: '/add-person', component: PersonForm },
  { path: '/add-job/:personId?', component: JobForm, props: true },
  { path: '/person/:personId', component: PersonDetail, name: 'person-detail', props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
