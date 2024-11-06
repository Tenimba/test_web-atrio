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
      
      // Vérification de l'âge
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

<style scoped>
.person-form {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus {
  border-color: #7d6ec4;
  outline: none;
}

button.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #7d6ec4;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
}

button.submit-btn:hover {
  background-color: #5f47a7;
}

.error {
  color: red;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;
}
</style>
