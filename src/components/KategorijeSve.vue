<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <!-- <input type="text" class="form-control" placeholder="Pretraga po imenu"
          v-model="ime"/> -->
        <div class="input-group-append">
          <!-- <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Search
          </button> -->
        </div>
      </div>
    </div>
    <h4 class="h4w">Popis svih kategorija</h4>
    <table class="table table-striped">
      
      <tr>
        <th>Id</th>
        <th>Kategorija</th>
        <th>Moderator</th>
        <th>Opcija</th>
        <th>Akcija</th>
      </tr>
      <tr  v-for="(kat, index) in kategorije" :key="index">
        <td>        
        {{kat.idkat}}
        </td>
        <td>        
        {{kat.nazivkat}}
        </td>
        <td> 
          {{kat.moderator}}       
        </td>
        <td>
          <a v-bind:href="'/kategorijementori/' + kat.idkat+'/'+kat.nazivkat"> Mentori </a>
        </td>
        <td>
          <a v-bind:href="'/azurirajkategoriju/' + kat.idkat"> Ažuriraj </a>
        </td>
      </tr>
    </table>
  <a v-bind:href="'/dodajkategoriju'" class="m-3 btn btn-sm btn-primary"> Dodaj novu </a></div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";

export default {
  name: "users-list",
  data() {
    return {
      kategorije: []
    };
  },
  methods: {
    SveKategorije() {
      UsersDataService.prikaziSveKategorije()
        .then(response => {
          this.kategorije = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        
    }
    
  },
  mounted() {
    this.SveKategorije();
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
