<template>
  <div id="app">
    <header>
      <h1>Gestion des Personnes et Emplois</h1>
      <nav>
        <router-link to="/">Accueil</router-link>
        <router-link to="/add-person">Ajouter une Personne </router-link>
        <router-link to="/add-job">Ajouter un Emploi</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const router = useRouter();

    onMounted(() => {
      // Redirige vers la vue par défaut (par exemple, la liste des personnes)
      router.push('/');
    });

    return {};
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

header {
  background-color: #f8f9fa;
  padding: 10px;
}

nav {
  margin: 10px 0;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #42b983;
}
</style>
