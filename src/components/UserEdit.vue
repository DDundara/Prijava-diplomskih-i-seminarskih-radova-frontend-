<template>
  <div v-if="currentUser" class="submit-form">
    <h4>Current user</h4>

      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" required v-model="currentUser[0].name"/>
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="currentUser[0].email"
          name="email"
        />
      </div>

      <div class="form-group">
        <label for="spol">Spol</label>
        <select name="spol" id="spol" class="form-control" v-model="currentUser[0].spol">
          <option value="" selected disabled>Izaberi</option>
          <option v-for="n in spolovi" :key="n.key" :value="n.key">{{n.value}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="grad">Grad</label>
        <select name="gradid" id="gradid" class="form-control" v-model="currentUser[0].gradid">
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">{{city.naziv}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="grupa">Grupa</label>
        <select name="grupaid" id="grupaid" class="form-control frmcontr" v-model="currentUser[0].groupid">
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="group in groups" :key="group.idgroup" :value="group.idgroup">{{group.naziv}}</option>
        </select>
      </div>

      <button @click="updateUser" class="btn btn-success">Update</button>
  </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";
import AuthService from '@/services/AuthService.js';
export default {
  name: "add-user",
  data() {
    return {
      spolovi: [
        {key:'M',value:'Muški'},
        {key:'Z',value:'Ženski'}
      ],
      cities: [],
      groups: [],
      currentUser: null,
      submitted: false
    };
  },
  methods: {
    updateUser() {
      console.log("id: " + this.currentUser[0].id)
      console.log("name: " + this.currentUser[0].name)
      console.log("email: " + this.currentUser[0].email)
      console.log("spol: " + this.currentUser[0].spol)
      console.log("grad: " + this.currentUser[0].gradid)
      var data = {
        id: this.currentUser[0].id,
        name: this.currentUser[0].name,
        email: this.currentUser[0].email,
        spol: this.currentUser[0].spol,
        gradid: this.currentUser[0].gradid,
        groupid: this.currentUser[0].groupid
      };

      UsersDataService.update(this.currentUser[0].id,data)
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
    this.retrieveGroups();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
