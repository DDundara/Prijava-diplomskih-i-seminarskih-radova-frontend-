<template>
  <div v-if="currentUser" class="submit-form">
    <h4>Brisanje korisnika</h4>
    <h5 class="text-warning">Jeste li sigurni da želite izbrisati sljedećeg korisnika?</h5>

      <div class="form-group">
        <label for="name">Name</label>
        <label for="nameval" class="form-control">{{currentUser[0].name}}</label>
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <label for="mailval" class="form-control">{{currentUser[0].email}}</label>
      </div>

      <div class="form-group">
        <label for="spol">Spol</label>
        <select name="spol" id="spol" class="form-control" v-model="currentUser[0].spol" disabled>
          <option value="" selected disabled>Izaberi</option>
          <option v-for="n in spolovi" :key="n.key" :value="n.key">{{n.value}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="grad">Grad</label>
        <select name="gradid" id="gradid" class="form-control" v-model="currentUser[0].gradid" disabled>
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">{{city.naziv}}</option>
        </select>
      </div>

      <button @click="deleteUser" class="btn btn-danger">Delete</button> | 
      <button @click="back" class="btn btn-danger">Back</button>
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

      currentUser: null,
      submitted: false
    };
  },
  methods: {
    deleteUser() {
      UsersDataService.delete(this.currentUser[0].id)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
          this.$router.push({ name: "usersandcities" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    retrieveUserDetails(id) {
      UsersDataService.getUserForEdit(id)
        .then(response => {
          this.currentUser = response.data;
          console.log(response.data);
          console.log("Returned:" +response.data);
          
        })
        .catch(e => {
          console.log(e);
        });
    },
    back(){
      this.$router.push({ name: "usersandcities" });
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
    }
  },
  mounted(){
    this.retrieveUserDetails(this.$route.params.id);
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
