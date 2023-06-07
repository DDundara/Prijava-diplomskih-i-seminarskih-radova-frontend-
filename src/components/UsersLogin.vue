<template>
  <div class="submit-form submitwidth">
    <!-- <div v-if="!submitted"> -->

      <div class="form-group">
        <label for="name">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          required
          v-model="username"
          name="username"
        />
      </div>

      <div class="form-group">
        <label for="email">Password</label>
        <input
          class="form-control"
          id="password"
          required
          v-model="password"
          name="password"
          type="password"
        />
      </div> 

      <button @click="login" class="btn btn-success">Login</button>
      <p v-if="msg">{{ msg }}</p>
    <!-- </div> -->

    <!-- <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="signUp">Sign up</button>
    </div> -->
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  data() {
    return {
      username: '',
      password: '',
      msg: ''
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          username: this.username,
          password: this.password
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;
        console.log("Poruka1: "+this.msg)
        const token = response.token;
        console.log("Token: "+token)
        const user = response.user;
        console.log("Userrr name: "+user.username)
        console.log("Userrr id: "+user.id)
        //const grupaid = response.userIdGroup;
        console.log("Grupaaa id: "+user.groupid)
        console.log("Grupaaa naziv: "+user.naziv)
        //this.$store.dispatch('login', { token, user });
        localStorage.setItem("loggeduser",user.username)       
        localStorage.setItem("loggeduserid",user.id)       
        localStorage.setItem("loggedusergroup",user.naziv)    
        //this.$router.push('/');
        window.location="/";
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
};
</script>
<style>
.submitwidth {
  max-width: 300px;
  margin: auto;
}
</style>