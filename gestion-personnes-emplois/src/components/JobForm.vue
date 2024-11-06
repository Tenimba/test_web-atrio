<template>
    <div class="job-form">
        <h2>Ajouter un Emploi</h2>
        <form @submit.prevent="submitJob">
            <div class="form-group">
                <div v-if="selectedPersonId !== ''">
                    <label for="person">Choisissez une Personne:</label>
                    <select id="person" v-model="selectedPersonId" required v-if="persons.length">
                        <option disabled value="">Sélectionnez une personne</option>
                        <option v-for="person in persons" :key="person.id" :value="person.id">
                            {{ person.firstName }} {{ person.lastName }} - {{ person.age }}
                        </option>
                    </select>
                    <p v-else>Aucune personne disponible</p>
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
            console.log('Personnes:', this.persons);

            const userIdFromUrl = this.$route.params.personId;
            if (userIdFromUrl) {
                const person = this.persons.find(person => person.id === userIdFromUrl);
                console.log('Personne trouvée:', person);
                if (person) {
                    this.selectedPersonId = person.id;
                    console.log('Personne trouvée:', person);
                } else {
                    console.log('Aucune personne trouvée avec cet ID');
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