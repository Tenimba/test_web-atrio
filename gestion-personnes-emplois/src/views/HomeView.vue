<template>
    <div>
      <h1>Gestion des Personnes et Emplois</h1>
      <PersonList />
    </div>
  </template>
  
  <script>
  import PersonList from '../components/PersonList.vue';
  
  export default {
    components: {
      PersonList
    }
  };
  </script>
  