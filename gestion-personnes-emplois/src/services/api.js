import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export default {
    getAllPersons() { return axios.get(`${API_URL}/persons`); },
    getPersonsByCompany(companyName) { return axios.get(`${API_URL}/persons/company/${companyName}`); },
    getJobsByPersonAndDates(personId, startDate, endDate) {
        return axios.get(`${API_URL}/jobs/${personId}/jobs`, {
            params: { startDate, endDate }
        });
    },
    getJobsByPerson(personId) {
        return axios.get(`${API_URL}/jobs/${personId}/jobs`);
    },
    addPerson(personData) { return axios.post(`${API_URL}/persons`, personData); },
    addJobToPerson(personId, jobData) { return axios.post(`${API_URL}/jobs/${personId}/jobs`, jobData); },
    getPersonById(personId) { return axios.get(`${API_URL}/persons/${personId}`); },
};
