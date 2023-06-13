<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">SD radovi</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">Početna</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/users" class="nav-link" v-if="username && grupa=='administrator'">Korisnici (pretraga i sort)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/usersperpage/1" class="nav-link" v-if="username && grupa=='administrator'">Korisnici (stranice)</router-link>
        </li>
        <li class="nav-item" v-if="username && grupa=='administrator'">
          <router-link to="/kategorijesve" class="nav-link">Kategorije</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/prosjekocjenapokategoriji" class="nav-link" v-if="username">Prosjek (po kategoriji)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/mojiradovi" class="nav-link" v-if="username && grupa=='korisnik'">Moji radovi</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/radovimentor" class="nav-link" v-if="username && grupa=='moderator'">Mentorstvo</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/radoviadmin/1" class="nav-link" v-if="username && grupa=='administrator'">Svi radovi</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link to="/sortingdata" class="nav-link">Sort</router-link>
        </li> -->
        <li class="nav-item">
          <router-link to="/login" class="nav-link" v-if="!username">Prijava</router-link>
        </li>
        <li class="nav-item" v-if="username && grupa=='administrator'">
          <router-link to="/signup" class="nav-link">Novi korisnik</router-link>
        </li>

        <!-- <li class="nav-item userloginposition" v-if="username">
          <router-link to="/signout" class="nav-link">Vi ste: {{username}}</router-link>
        </li>
        <li class="nav-item" v-if="username">
          <router-link to="/signout" class="nav-link">Odjava</router-link>
        </li> -->
      </div>
      <div id="login" v-if="username">
        <router-link to="/" class="loggedin">Vi ste: {{username}}, tip {{ grupa }}</router-link>
      </div>
      <div id="login" v-if="username">
        <router-link to="/signout" class="loggedin">Odjava</router-link>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>

import AuthService from '@/services/AuthService.js';
export default {
  //props: ['username'],
  name: "app",
  data() {
    return {
      secretMessage: '',
      username: '',
      grupa: ''
    };
  },
  async created() {
      this.loggedin();  
  },
  async mounted() {
      this.loggedin();    
    
  },
  methods: {
    async loggedin(){
      console.log("Local storage: "+localStorage.getItem("loggeduser"))
      console.log("Local storage 2: "+localStorage.getItem("loggedusergroup"))
      if (localStorage.getItem("loggeduser") !== null) {
        this.username = localStorage.getItem("loggeduser");
        this.grupa = localStorage.getItem("loggedusergroup");
        this.secretMessage = await AuthService.getSecretContent();
      }
    }
  }
};
</script>
<style>
.userloginposition{
  margin-left: 320px !important;
  color:rgb(201, 17, 17) !important;
  background-color: rgb(216, 23, 23);
}

#login{
  color:rgb(201, 17, 17) !important;
}

#login a:link{
  color:rgb(201, 17, 17) !important;
}

.loggedin{
  color:rgb(201, 17, 17) !important;
  display: block;
    padding: 0.5rem 1rem;
}
</style>