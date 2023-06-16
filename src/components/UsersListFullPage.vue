<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <div class="input-group-append">
        </div>
      </div>
    </div>
    <h4 class="h4w">Popis usera</h4>
    <table class="table table-striped">
      
      <tr>
        <th>Id</th>
        <th>Ime i prezime</th>
        <th>E-mail</th>
        <th>Grad</th>
        <th>Spol</th>
        <th>Grupa</th>
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
        <td> 
          {{user.gradnaziv}}       
        </td>
        <td v-if="user.spol==='M'"> 
          Muški      
        </td>
        <td v-else> 
          Ženski   
        </td>
        <td> 
          {{user.grupanaziv}}       
        </td>
        <td>
          <a v-bind:href="'/useredit/' + user.id"> Ažuriraj </a> | 
          <a v-bind:href="'/userdelete/' + user.id"> Briši </a>
        </td>
      </tr>
    </table>

<div class="pagination" v-for="page in parseInt(totalPages)" :key="page" v-bind="page">

  <a v-bind:href="'/usersperpage/'+page" v:model="page" v-if="page===parseInt(this.$route.params.page)" class="active" >{{ page }}</a>
  <a v-bind:href="'/usersperpage/'+page" v:model="page" v-else >{{ page }}</a>

</div>
<p>&nbsp;</p>
<div class="newline">
  <a v-bind:href="'/signup'" class="m-3 btn btn-sm btn-primary"> Add new </a></div>
  </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";

export default {
  name: "users-list",
  data() {
    return {
      users: [],
      totals: [],
      total: null,
      totalPages: null
    };
  },
  methods: {
    retrieveUsers(page) {
      UsersDataService.getAllUsersPerPage(page)
        .then(response => {
          this.users = response.data;
          console.log(response.data);

        })
        .catch(e => {
          console.log(e);
        });
        
    },
    retrieveTotalCountOfUsers() {
      UsersDataService.getUsersTotal()
        .then(response => {
          this.totals = response.data;
          console.log("Total: "+this.totals[0].total)
          this.totalPages = this.totals[0].numOfpages;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    
  },
  mounted() {
    this.retrieveUsers(this.$route.params.page);
    this.retrieveTotalCountOfUsers();
    console.log("Stranica: "+this.$route.params.page)
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

.pagination {
  display: inline-block;
  height: 45px;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
}

.pagination a:hover:not(.active) {background-color: #ddd;}

.newline{
  display: block;
  clear: both;
  margin-top: 50px;
    margin-left: -143px;
}

.h4w{
  width: 100% !important;
}

</style>
