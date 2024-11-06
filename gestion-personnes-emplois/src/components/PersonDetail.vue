<template>
    <div class="person-detail">
      <h2>Détails des Emplois de {{ personName }}</h2>
      <form @submit.prevent="fetchJobs">
        <div>
          <label>Date de Début:</label>
          <input type="date" v-model="startDate" required />
        </div>
        <div>
          <label>Date de Fin:</label>
          <input type="date" v-model="endDate" required />
        </div>
        <button type="submit">Rechercher</button>
      </form>
      <ul v-if="jobs.length > 0">
        <li v-for="job in jobs" :key="job.id">
          {{ job.companyName }} - {{ job.position }} 
          (De: {{ formatDate(job.startDate) }} à: {{ formatDate(job.endDate) }})
        </li>
      </ul>
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
            sortBy: 'date'
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
        }
    },
    methods: {
        async fetchJobs() {
            try {
                const params = {}
                if (this.startDate) {
                    params.startDate = this.startDate;
                }
                if (this.endDate) {
                    params.endDate = this.endDate;
                }
                console.log(params);
                const response = await api.getJobsByPersonAndDates(this.personId, params);
                this.jobs = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        }
    }
};
</script>
