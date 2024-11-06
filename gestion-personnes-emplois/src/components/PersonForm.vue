<template>
  <div class="person-form">
    <h2>Ajouter une Personne</h2>
    <form @submit.prevent="submitPerson">
      <div class="form-group">
        <label for="firstName">Nom:</label>
        <input id="firstName" v-model="person.firstName" required placeholder="Entrez le nom" />
      </div>
      <div class="form-group">
        <label for="lastName">Prénom:</label>
        <input id="lastName" v-model="person.lastName" required placeholder="Entrez le prénom" />
      </div>
      <div class="form-group">
        <label for="birthDate">Date de Naissance:</label>
        <input id="birthDate" type="date" v-model="person.birthDate" required />
      </div>
      <button type="submit" class="submit-btn">Enregistrer</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      person: { firstName: '', lastName: '', birthDate: '' },
      error: ''
    };
  },
  methods: {
    calculateAge(dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
    async submitPerson() {
      const age = this.calculateAge(this.person.birthDate);
      
      if (age < 0 || age > 150) {
        this.error = "L'âge doit être compris entre 0 et 150 ans.";
        return;
      }

      try {
        await api.addPerson(this.person);
        this.$router.push('/');
      } catch (error) {
        this.error = error.response ? error.response.data : 'Erreur lors de l’enregistrement';
      }
    }
  }
};
</script>
