<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
      </div>
    </div>
    <h4 class="h4w">Popis prosječnih ocjena po kategorijama:</h4>
    <table class="table table-striped tblfont tblduz">    
      <tr>
        <th>Id</th>
        <th>Naziv kategorija</th>
        <th>Ocjena</th>
      </tr>
      <tr  v-for="(kat, index) in kategorijeocjene" :key="index">
        <td>        
        {{kat.idkat}}
        </td>
        <td>        
        {{kat.nazivkat}}
        </td>
        <td> 
          {{kat.prosjek}} 
        </td>      
      </tr>
    </table>
  </div>
</template>

<script>

import UsersDataService from "../services/UsersDataService";
import AuthService from '@/services/AuthService.js';
export default {
  name: "users-list",
  data() {
    return {
      kategorijeocjene: [],
      radid:'',
      secretMessage: '',
      username: '',
      userid:''
    };
  },
  async created() {
      this.loggedin();
    
  },
  methods: {
    vratiKategorijeOcjene() {
      UsersDataService.prosjekOcjenaPoKategoriji()
        .then(response => {
          this.kategorijeocjene = response.data;
          console.log("kat ocjene"+response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    async loggedin(){
      console.log("Local storage 1: "+localStorage.getItem("loggeduser"))
      if (localStorage.getItem("loggeduser") !== null) {
        this.username = localStorage.getItem("loggeduser");
        this.userid = localStorage.getItem("loggeduserid");
        this.secretMessage = await AuthService.getSecretContent();
      }
    }   
  },
  mounted() {
    this.vratiKategorijeOcjene();
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

.tblduz{
    width: 1340px !important;
}
</style>
