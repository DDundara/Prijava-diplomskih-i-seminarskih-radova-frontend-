<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Pretraga po imenu"
          v-model="title" id="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary razmak" type="button"
            @click="retrieveUsersByTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <table class="table table-striped">
      <h4>Popis usera</h4>
      <tr>
        <th @click="sortList('id')" title="Klikni za sort">Id &#8597;</th>
        <th @click="sortList('name')" title="Klikni za sort">Name &#8597;</th>
        <th @click="sortList('email')" title="Klikni za sort">E-mail &#8597;</th>
        <th>Spol</th>
      </tr>
      <tr  v-for="(user, index) in sortedData" :key="index">
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
      </tr>
    </table>

<div class="pagination" v-for="n in parseInt(total)" :key="n">

  <a v-bind:href="'/users/'+n" v-if="n===3" class="active">{{ n }}</a>
  <a v-bind:href="'/users/'+n" v-else>{{ n }}</a>

</div>

<div class="newline">
  <a v-bind:href="'/adduser'" class="m-3 btn btn-sm btn-primary newline"> Add new </a></div>
  </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";
export default {
  name: "UsersListFull",
  data() {
    return {
      users: [],
      totals: [],
      total: null,
      title: "",
      sortedData: [],
      sortedbyASC: true
    };
  },
  methods: {
    retrieveUsers() {
      UsersDataService.getAllUsers()
        .then(response => {
          this.users = response.data;
          //dodajem sort
          this.sortedData = this.users;
          console.log("Sortano:");
          console.log(this.sortedData);
          console.log(this.users);
          //dodajem sort
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveUsersByTitle() {
      UsersDataService.getAllUsersByTitle(this.title)
        .then(response => {
          this.users = response.data;
          console.log("Nesto vratio:");
          console.log(response.data);
          this.sortedData = this.users
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
          this.total = this.totals[0].total;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    sortList(sortBy) {
      if (this.sortedbyASC) {
        this.sortedData.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.sortedData.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    }

    
  },
  mounted() {
    this.retrieveUsers();
    this.retrieveTotalCountOfUsers();

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
}

.razmak{
  margin-left: 10px;
  background-color: burlywood;
}
</style>
