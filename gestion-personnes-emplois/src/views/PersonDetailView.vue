<template>
  <div>
    <h1>Détails de la Personne</h1>
    <PersonDetail :personId="$route.params.id" />
  </div>
</template>

<script>
import PersonDetail from '../components/PersonDetail.vue';

export default {
  components: {
    PersonDetail
  }
};
</script>
