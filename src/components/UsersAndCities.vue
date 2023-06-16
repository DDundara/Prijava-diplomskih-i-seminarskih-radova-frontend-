<template>

  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Pretraga po imenu"
          v-model="ime"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <table class="table table-striped">
      <h4>Popis usera</h4>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>E-mail</th>
        <th>Spol</th>
        <th>Grad</th>
        <th>Akcija</th>
      </tr>
      <tr  v-for="(user, index) in users" :key="index">
        <td>        
        {{user.id}}
        </td>
        <td>        
        {{user.name}}
        </td>
        <td> 
          {{user.email}}       
        </td>
        <td v-if="user.spol==='M'"> 
          Muški      
        </td>
        <td v-else> 
          Ženski   
        </td>
        <td> 
          {{user.naziv}}       
        </td>
        <td>
          <a v-bind:href="'/useredit/' + user.id"> Ažuriraj </a> | 
          <a v-bind:href="'/userdelete/' + user.id"> Briši </a>
        </td>
      </tr>
    </table>
    
    <a v-bind:href="'/adduser'" class="m-3 btn btn-sm btn-primary"> Add new </a>
  </div>
</template>

<script>

import UsersDataService from "../services/UsersDataService";
export default {
  name: "users-list",
  data() {
    return {
      users: []
    };
  },

  methods: {
    retrieveUsers() {
      UsersDataService.getAllUsersAndCities()
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    
  },
  mounted() {
    this.retrieveUsers();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
