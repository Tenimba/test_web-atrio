<template>
    <div>
      <h1>Ajouter un Emploi pour {{ personName }}</h1>
      <JobForm :personId="$route.params.personId" />
    </div>
  </template>
  
  <script>
  import JobForm from '../components/JobForm.vue';
  import api from '../services/api';
  
  export default {
    components: {
      JobForm
    },
    data() {
      return {
        personName: ''
      };
    },
    async created() {
      try {
        const response = await api.getPersonById(this.$route.params.personId);
        const person = response.data;
        this.personName = `${person.firstName} ${person.lastName}`;
      } catch (error) {
        console.error('Erreur lors du chargement de la personne:', error);
      }
    }
  };
  </script>
  