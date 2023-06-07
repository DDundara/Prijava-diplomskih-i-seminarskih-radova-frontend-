<template>
  <div class="submit-form">
    <div v-if="!submitted">

      <div class="form-group frmgroup_resize">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control frmcontr"
          id="name"
          required
          v-model="name"
          name="name"
        />
      </div>

      <div class="form-group frmgroup_resize">
        <label for="name">Username</label>
        <input
          type="text"
          class="form-control frmcontr"
          id="username"
          required
          v-model="username"
          name="username"
        />
      </div>

      <div class="form-group frmgroup_resize">
        <label for="email">Password</label>
        <input
          class="form-control frmcontr"
          id="password"
          required
          v-model="password"
          name="password"
          type="password"
        />
      </div> 
      
      <div class="form-group frmgroup_resize">
        <label for="email">Password repeat</label>
        <input
          class="form-control frmcontr"
          id="password_repeat"
          required
          v-model="password_repeat"
          name="password_repeat"
          type="password"
        />
      </div>
      
      <div class="form-group frmgroup_resize">
        <label for="email">E-mail</label>
        <input
          class="form-control frmcontr"
          id="email"
          required
          v-model="email"
          name="email"
        />
      </div>

      <div class="form-group frmgroup_resize">
        <label for="spol">Spol</label>
        <select name="spol" id="spol" class="form-control frmcontr" v-model="spol">
          <option value="" selected disabled>Izaberi</option>
          <option v-for="n in spolovi" :key="n.key" :value="n.key">{{n.value}}</option>
        </select>
      </div>

      <div class="form-group frmgroup_resize">
        <label for="grad">Grad</label>
        <select name="gradid" id="gradid" class="form-control frmcontr" v-model="gradid">
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">{{city.naziv}}</option>
        </select>
      </div>

      <div class="form-group frmgroup_resize">
        <label for="grupa">Grupa</label>
        <select name="grupaid" id="grupaid" class="form-control frmcontr" v-model="grupaid">
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="group in groups" :key="group.idgroup" :value="group.idgroup">{{group.naziv}}</option>
        </select>
      </div>

      <button @click="signUp" class="btn btn-success">Sign up</button>
      <!-- <p v-if="msg">{{ msg }}</p> -->
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
         <li v-for="err in errors" :key="err.key">{{ err }}</li>
        </ul>
      </p>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="signUp">Sign up</button>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';

export default {
  data() {
    return {
      name: '',
      username: '',
      password: '',
      password_repeat: '',
      email:'',
      spol:'',
      msg: '',
      gradid: '',
      grupaid: '',
      spolovi: [
        {key:'M',value:'Muški'},
        {key:'Z',value:'Ženski'}
      ],
      cities: [],
      groups: [],
      errors: []
    };
  },
  methods: {
    async signUp() {
      try {
        const credentials = {
          name: this.name,
          username: this.username,
          password: this.password,
          password_repeat: this.password_repeat,
          email: this.email,
          spol:this.spol,
          gradid:this.gradid,
          grupaid:this.grupaid
        };

        this.errors = [];

        if (!this.name) {
        this.errors.push('Name required.');
        }
        if (!this.username) {
        this.errors.push('Username required.');
        }

        if (!this.password) {
        this.errors.push('Password required.');
        }

        if (!this.password_repeat) {
        this.errors.push('Password repeat required.');
        }

        if (this.password != this.password_repeat) {
        this.errors.push('Passwords must be the same!');
        }

        if (!this.email) {
        this.errors.push('E-mail required.');
        }

        if (!this.spol) {
        this.errors.push('Gender required.');
        }

        if (!this.gradid || this.gradid==0) {
        this.errors.push('Grad required.');
        }

        // if(this.errors.length==0){
        //   return true;
        // }


        //console.log("errors:"+this.errors[0]);
        if(this.errors.length==0){
        const response = await AuthService.signUp(credentials);
        this.msg = response.msg;
        this.$router.push('/');
        }

      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
    retrieveCities() {
      AuthService.getallcities()
        .then(response => {
          this.cities = response.data;
          console.log("resp:"+response.data);
          console.log("cities:"+this.cities);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveGroups() {
      AuthService.getallgroups()
        .then(response => {
          this.groups = response.data;
          console.log("resp:"+response.data);
          console.log("groups:"+this.groups);
        })
        .catch(e => {
          console.log(e);
        });
    }


  },
  mounted(){
    this.retrieveCities();
    this.retrieveGroups();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.frmgroup_resize{
  font-size: 12px;
}

.frmcontr{
  font-size: 12px !important;
}
</style>
