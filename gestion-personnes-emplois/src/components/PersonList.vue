<template>
    <div class="person-list">
      <h2>Liste des Personnes</h2>
      <div class="search-container">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Rechercher par entreprise" 
          @input="searchByCompany"
          class="search-input"
        />
      </div>
      <ul>
        <li v-for="person in filteredPeople" :key="person.id" class="person-item">
          <div class="person-header">
            <span class="person-name">{{ person.firstName }} {{ person.lastName }}</span>
            <span class="person-age">- Âge: {{ calculateAge(person.birthDate) }} ans</span>
          </div>
  
          <div v-if="person.currentJobs && person.currentJobs.length > 0" class="current-jobs">
            <h3>Emplois Actuels</h3>
            <div v-for="job in person.currentJobs" :key="job.id" class="job-item">
              <span class="job-position">{{ job.position }}</span>
              <span class="job-company">chez {{ job.companyName }}</span>
              <span class="job-dates">
                (De: {{ formatDate(job.startDate) }} à {{ job.endDate ? formatDate(job.endDate) : 'Présent' }})
              </span>
            </div>
          </div>
  
          <div class="actions">
            <router-link :to="`/person/${person.id}`" class="details-link">Voir les Détails</router-link>
            <router-link :to="`/add-job/${person.id}`" class="add-job-link">Ajouter un Emploi</router-link>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    data() {
      return {
        people: [],
        filteredPeople: [],
        searchQuery: '',
      };
    },
    methods: {
      async fetchPeople() {
        try {
          const response = await api.getAllPersons();
          this.people = await Promise.all(response.data.map(async (person) => {
            const jobsResponse = await api.getJobsByPerson(person.id);
            const currentJobs = jobsResponse.data.filter(job => {
              const now = new Date();
              return new Date(job.startDate) <= now && (!job.endDate || new Date(job.endDate) >= now);
            });
  
            return {
              ...person,
              currentJobs
            };
          }));
          this.people.sort((a, b) => {
            const fullNameA = `${a.firstName} ${a.lastName}`.toLowerCase();
            const fullNameB = `${b.firstName} ${b.lastName}`.toLowerCase();
            return fullNameA.localeCompare(fullNameB);
          });
  
          this.filteredPeople = this.people;
        } catch (error) {
          console.error('Erreur lors de la récupération des personnes:', error);
        }
      },
      async searchByCompany() {
        if (this.searchQuery.trim() === '') {
          this.filteredPeople = this.people;
          return;
        }
  
        this.filteredPeople = this.people.filter(person => {
          return person.currentJobs.some(job => job.companyName.toLowerCase().includes(this.searchQuery.toLowerCase()));
        });
      },
      calculateAge(dateOfBirth) {
        const birthDate = new Date(dateOfBirth);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      },
      formatDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
      }
    },
    async created() {
      await this.fetchPeople();
    }
  };
  </script>