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
    max-width: 650px;
    margin: 30px auto;
    padding: 25px;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Roboto', sans-serif;
    color: #333;
  }
  
  h2 {
    font-size: 28px;
    color: #2c3e50;
    margin-bottom: 25px;
    text-align: center;
    border-bottom: 2px solid #7d6ec4;;
    padding-bottom: 10px;
  }
  
  .job-search-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 25px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: 500;
    color: #555;
    margin-bottom: 8px;
  }
  
  input[type="date"] {
    padding: 10px;
    font-size: 15px;
    border: 1px solid #cfd8dc;
    border-radius: 6px;
    transition: border-color 0.2s;
  }
  
  input[type="date"]:focus {
    outline: none;
    background-color: #7d6ec4;
  }
  
  .search-button {
    align-self: center;
    padding: 12px 18px;
    font-size: 16px;
    color: #fff;
    background-color: #7d6ec4;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .search-button:hover {
    background-color: #2980b9;
  }
  
  .job-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .job-item {
    padding: 15px 20px;
    border: 1px solid #dfe6e9;
    border-radius: 8px;
    margin-bottom: 15px;
    background-color: #fff;
    transition: box-shadow 0.2s;
  }
  
  .job-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .job-item strong {
    font-size: 18px;
    color: #2c3e50;
  }
  
  .job-dates {
    color: #636e72;
    font-size: 14px;
    margin-top: 5px;
    display: block;
  }
  </style>
  