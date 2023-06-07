<template>
    <!-- <div v-if="username">
    <h1>Hi {{ username }}</h1>
    <p>{{ secretMessage }}</p>
    <input type="button" value="Logout" @click="logout" />
  </div>
  <div v-else>
    <h1>Niste prijavljeni!</h1>
  </div> -->
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <!-- <input type="text" class="form-control" placeholder="Pretraga po imenu"
          v-model="ime"/> -->
        <!-- <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Search
          </button>
        </div> -->
      </div>
    </div>
    <h4 class="h4w">Popis mentora za rad "{{ this.radname }}"</h4>
    <table class="table table-striped tblfont">    
      <tr>
        <th>Id mentora</th>
        <th>Naziv</th>
        <th>Ocjena</th>
      </tr>
      <tr  v-for="(ment, index) in mentorirada" :key="index">
        <td>        
        {{ment.idment}}
        </td>
        <td>        
        {{ment.name}}
        </td>
        <td>        
        {{ment.ocjena}}
        </td>
      </tr>
      <tr>
        <td colspan="2" align="right">Prosjek: </td>
        <td>{{ this.totalSum()}}</td>
      </tr>
    </table>
    
    <a v-bind:href="'#'" @click="nazat" class="m-3 btn btn-sm btn-primary"> Natrag </a>
  </div>
</template>

<script>

import UsersDataService from "../services/UsersDataService";
export default {
  name: "users-list",
  data() {
    return {
      mentorirada: [],
      idrad:'',
      radname:'',
      sumaocjena:0
    };
  },
  methods: {
    vratiMentoreRada(idrad,radname) {
      console.log("spec rad"+idrad);
      UsersDataService.getAllMentoriSpecRad(idrad,radname)
        .then(response => {
          this.mentorirada = response.data;
          this.radname = radname;
          console.log("mentori"+response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    totalSum(){
        var suma=0;
        for(var i=0;i<this.mentorirada.length;i++){
            if(this.mentorirada[i].ocjena == null){
                this.mentorirada[i].ocjena=0;
            }
            suma+=parseFloat(this.mentorirada[i].ocjena);
        }
        return (suma/this.mentorirada.length).toFixed(2);
    },
    nazat(){
        history.back(-1);
    }    
  },
  mounted() {
    this.vratiMentoreRada(this.$route.params.idrad,this.$route.params.radname);
    //this.vratiMentoreRada(rad.idrad);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.tblfont{
  font-size: 12px;
}

.h4w{
  width: 100% !important;
}
</style>
