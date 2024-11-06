<template>
    <div class="job-form">
        <h2>Ajouter un Emploi</h2>
        <form @submit.prevent="submitJob">
            <div class="form-group">
                <label for="person">Choisissez une Personne:</label>
                <select id="person" v-model="selectedPersonId" required v-if="persons.length">
                    <option disabled value="">Sélectionnez une personne</option>
                    <option v-for="person in persons" :key="person.id" :value="person.id">
                        {{ person.firstName }} {{ person.lastName }}
                    </option>
                </select>
                <div v-else>
                    Aucune personne trouvée. <router-link to="/add-person">Ajouter une personne</router-link>
            </div>
    </div>

    <div class="form-group">
        <label for="companyName">Nom de l'Entreprise:</label>
        <input id="companyName" v-model="job.companyName" required placeholder="Nom de l'entreprise" />
    </div>

    <div class="form-group">
        <label for="position">Poste Occupé:</label>
        <input id="position" v-model="job.position" required placeholder="Nom du poste" />
    </div>

    <div class="form-group">
        <label for="startDate">Date de Début:</label>
        <input id="startDate" type="date" v-model="job.startDate" required />
    </div>

    <div class="form-group">
        <label for="endDate">Date de Fin:</label>
        <input id="endDate" type="date" v-model="job.endDate" />
    </div>

    <button type="submit" class="submit-btn">Ajouter Emploi</button>
    <p v-if="error" class="error">{{ error }}</p>
    </form>
    </div>
</template>

<script>
import api from '../services/api';

export default {
    data() {
        return {
            persons: [],
            selectedPersonId: '',
            job: {
                companyName: '',
                position: '',
                startDate: '',
                endDate: null,
            },
            error: ''
        };
    },
    async created() {
        try {
            const response = await api.getAllPersons();
            this.persons = response.data;

            const userIdFromUrl = this.$route.params.personId;
            if (userIdFromUrl) {
                const person = this.persons.find(person => person.id === userIdFromUrl);
                if (person) {
                    this.selectedPersonId = person.id;
                }
            }
        } catch (error) {
            this.error = 'Erreur lors de la récupération des personnes';
            console.error(error);
        }
    },

    methods: {
        async submitJob() {
            try {
                if (!this.selectedPersonId) {
                    this.error = 'Veuillez sélectionner une personne.';
                    return;
                }

                await api.addJobToPerson(this.selectedPersonId, this.job);
                this.$router.push('/');
            } catch (error) {
                this.error = error.response ? error.response.data : 'Erreur lors de l’ajout de l’emploi';
            }
        }
    }
};
</script>

<style scoped>
.job-form {
    max-width: 400px;
    margin: 30px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    font-size: 1.6rem;
    margin-bottom: 20px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-size: 1rem;
    margin-bottom: 5px;
    color: #333;
}

select,
input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
    background-color: #f9f9f9;
}

select:focus,
input:focus {
    border-color: #7d6ec4;
    outline: none;
    background-color: #fff;
}

button.submit-btn {
    width: 100%;
    padding: 12px;
    background-color: #7d6ec4;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 15px;
}

button.submit-btn:hover {
    background-color: #5f47a7;
}

.error {
    color: red;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 15px;
}
</style>