<template>
  <div v-if="username">
    <h1>Hi {{ username }}</h1>
    <p>{{ secretMessage }}</p>
    <input type="button" value="Logout" @click="logout" />
  </div>
  <div v-else>
    <h1>Niste prijavljeni!</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      secretMessage: '',
      username: ''
    };
  },
  async created() {
      this.logout();
    
  },
  methods: {
    logout() {
      localStorage.clear();
      //this.$router.push('/home');
      //location.reload();
      //this.$router.go();
      window.location="/home";
    }
  }
};
</script>