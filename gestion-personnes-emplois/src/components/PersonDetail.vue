<template>
    <div class="person-detail">
      <h2>Détails des Emplois de {{ personName }}</h2>
      <form @submit.prevent="fetchJobs" class="job-search-form">
        <div class="form-group">
          <label for="startDate">Date de Début:</label>
          <input type="date" id="startDate" v-model="startDate" required />
        </div>
        <div class="form-group">
          <label for="endDate">Date de Fin:</label>
          <input type="date" id="endDate" v-model="endDate" required />
        </div>
        <button type="submit" class="search-button">Rechercher</button>
      </form>
  
      <ul v-if="jobs.length > 0" class="job-list">
        <li v-for="job in sortedJobs" :key="job.id" class="job-item">
          <strong>{{ job.companyName }}</strong> - {{ job.position }} <br />
          <span class="job-dates">
            (De: {{ formatDate(job.startDate) }} à: {{ formatDate(job.endDate) }})
          </span>
        </li>
      </ul>
      <p v-else>Aucun emploi trouvé pour cette période.</p>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    props: ['personId', 'personName'],
    data() {
      return {
        startDate: '',
        endDate: '',
        jobs: [],
        sortBy: 'date',
      };
    },
    async created() {
      await this.fetchJobs();
    },
    computed: {
      sortedJobs() {
        return this.jobs.slice().sort((a, b) => {
          if (this.sortBy === 'date') {
            return new Date(a.startDate) - new Date(b.startDate);
          } else if (this.sortBy === 'company') {
            return a.companyName.localeCompare(b.companyName);
          }
        });
      },
    },
    methods: {
      async fetchJobs() {
        try {
          const params = {};
          if (this.startDate) {
            params.startDate = this.startDate;
          }
          if (this.endDate) {
            params.endDate = this.endDate;
          }
          const response = await api.getJobsByPersonAndDates(this.personId, params);
          this.jobs = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
    },
  };
  </script>
  
  <style scoped>
  .person-detail {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
  }
  
  h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .job-search-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
  }
  
  input[type="date"] {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .search-button {
    padding: 10px 15px;
    font-size: 16px;
    color: #fff;
    background-color: #7d6ec4;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .search-button:hover {
    background-color: #0056b3;
  }
  
  .job-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .job-item {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  
  .job-item strong {
    color: #333;
    font-size: 18px;
  }
  
  .job-dates {
    color: #777;
    font-size: 14px;
  }
  </style>
  