<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Billy CRM</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/">Home</v-btn>
      <v-btn v-if="!isAuthenticated" to="/login">Login</v-btn>
      <v-btn v-if="isAuthenticated" to="/app-1">Membership</v-btn>
      <v-btn v-if="!isAuthenticated" to="/app-2">Apply for membership</v-btn>
      <v-btn v-if="isAuthenticated" @click="logout">Logout</v-btn>
      <span v-if="user">({{ user.name }})</span>
    </v-app-bar>
    <v-main>
      <v-container class="d-flex justify-center align-center" style="height: 100vh;">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
nav {
  margin-top: 20px;
  display: flex;
  gap: 20px;
}
nav a {
  text-decoration: none;
  color: #646cff;
  font-size: 1.2em;
  font-weight: bold;
}
nav a:hover {
  color: #42b883;
}
</style>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['isAuthenticated', 'user']),
  },
  methods: {
    ...mapActions(['login', 'logout']),
  },
};
</script>