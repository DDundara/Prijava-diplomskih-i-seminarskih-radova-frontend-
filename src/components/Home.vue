<template>
  <!-- <div v-if="username">
    <h1>Hi {{ username }}</h1>
    <p>{{ secretMessage }}</p>
    <input type="button" value="Logout" @click="logout" />
  </div>
  <div v-else>
    <h1>Niste prijavljeni!</h1>
  </div> -->
  <div class="list row">
    
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  name: "Home",
  data() {
    return {
      secretMessage: '',
      username: ''
    };
  },
  async created() {
      this.loggedin();
    
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
    async loggedin(){
      console.log("Local storage: "+localStorage.getItem("loggeduser"))
      if (localStorage.getItem("loggeduser") !== null) {
        this.username = localStorage.getItem("loggeduser");
        this.secretMessage = await AuthService.getSecretContent();
      }
    }
  }
};
</script>