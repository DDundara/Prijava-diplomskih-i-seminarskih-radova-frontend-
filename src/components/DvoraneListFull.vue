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
      <h4>Popis Dvorana</h4>
      <tr>
        <th>Id</th>
        <th>Naziv</th>
        <th>Akcija</th>
      </tr>
      <tr  v-for="(dvorana, index) in dvorane" :key="index">
        <td>{{index+1}}</td>
        <td>        
        {{dvorana.DvoranaId}}
        </td>
        <td>        
        {{dvorana.Naziv}}
        </td>
        <td>        
        </td>
      </tr>
    </table>
    
    <a v-bind:href="'/adddvorana'" class="m-3 btn btn-sm btn-primary"> Add new </a>
  </div>
</template>

<script>
import DvoraneDataService from "../services/DvoraneDataService";

export default {
  name: "dvorane-list",
  data() {
    return {
      dvorane: [],
      currentDvorana: null,
      currentIndex: -1
    };
  },
  methods: {
    retrieveDvorane() {
      DvoraneDataService.getAllDvorane()
        .then(response => {
          this.dvorane = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveDvorane();
      this.currentDvorana = null;
      this.currentIndex = -1;
    },

    searchName() {
      DvoraneDataService.findByName(this.ime)
        .then(response => {
          this.students = response.data;
          //this.setActiveTutorial(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    
  },
  mounted() {
    this.retrieveDvorane();
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
