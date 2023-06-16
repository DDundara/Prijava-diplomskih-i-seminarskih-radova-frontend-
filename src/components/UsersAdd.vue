<template>
  <div class="submit-form">
    <div v-if="!submitted">

      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="user.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="user.email"
          name="email"
        />
      </div>

      <div class="form-group">
        <label for="spol">Spol</label>
        <select name="spol" id="spol" class="form-control" v-model="user.spol" @change="promjena('spol')">
          <option value="" selected disabled>Izaberi</option>
          <option v-for="n in spolovi" :key="n.key" :value="n.key">{{n.value}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="grad">Grad</label>
        <select name="grad" id="grad" class="form-control" v-model="user.gradid" @change="promjena('grad')">
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">{{city.naziv}}</option>
        </select>
      </div>

      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";

export default {
  name: "add-user",
  data() {
    return {
      spolovi: [
        {key:'M',value:'Muški'},
        {key:'Z',value:'Ženski'}
      ],
      cities: [],
      user: {
        id: "",
        name: "",
        email: "",
        spol: "",
        gradid: null
      },
      submitted: false
    };
  },
  methods: {
    saveUser() {
      console.log("id: " + this.user.id)
      console.log("name: " + this.user.name)
      console.log("email: " + this.user.email)
      console.log("spol: " + this.user.spol)
      console.log("grad: " + this.user.gradid)
      var data = {
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        spol: this.user.spol,
        gradid: this.user.gradid
      };

      UsersDataService.create(data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
          this.$router.push({ name: "usersandcities" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    retrieveCities() {
      UsersDataService.getAllCities()
        .then(response => {
          this.cities = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    newUser() {
      this.submitted = false;
      this.user = {};
    },

    promjena(nekid){
      var nesto = document.getElementById(nekid);
      console.log("Nesto: "+nesto.value);
    }
  },
  mounted(){
    this.retrieveCities();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
