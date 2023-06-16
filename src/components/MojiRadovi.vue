<template>

  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
      </div>
    </div>
    <h4 class="h4w">Popis mojih radova</h4>
    <table class="table table-striped tblfont">    
      <tr>
        <th>Id</th>
        <th>Naziv rada</th>
        <th>Opis</th>
        <th>Datum dospjeća</th>
        <th>Vrsta</th>
        <th>Kategorija</th>
        <th>Status</th>
        <th>Autor</th>
        <th>Ocjena</th>
        <th>Mentori</th>
      </tr>
      <tr  v-for="(rad, index) in radovi" :key="index">
        <td>        
        {{rad.idrad}}
        </td>
        <td>        
        {{rad.nazivrad}}
        </td>
        <td> 
          {{rad.opis}}       
        </td>
        <td> 
          {{ this.formatDate(rad.datumdospijeca) }}      
        </td>
        <td> 
          {{rad.VrstaRada}}       
        </td>
        <td> 
          {{rad.KategorijaRada}}       
        </td>
        <td> 
          {{rad.StatusRada}}       
        </td>
        <td> 
          {{rad.AutorRada}}       
        </td>
        <td> 
          {{rad.Ocjena}}       
        </td>
        <td>
          <a v-bind:href="'/workedit/' + rad.idrad + '/'+rad.nazivrad+ '/'+rad.idkat+ '/'+rad.KategorijaRada"> Dodaj </a>
          <a v-bind:href="'/workmentors/' + rad.idrad + '/'+rad.nazivrad"> Pogledaj </a>

        </td>
      </tr>
    </table>
    
    <a v-bind:href="'/addwork'" class="m-3 btn btn-sm btn-primary"> Novi rad </a>
  </div>
</template>

<script>

import UsersDataService from "../services/UsersDataService";
import AuthService from '@/services/AuthService.js';
export default {
  name: "users-list",
  data() {
    return {
      radovi: [],
      mentorirada: [],
      radid:'',
      secretMessage: '',
      username: '',
      date:'',
      month:'',
      year:'',
      hour:'',
      minutes:'',
      seconds:'',
      format:''
    };
  },
  async created() {
      this.loggedin();
    
  },
  methods: {
    vratiMojeRadove() {
      UsersDataService.getMojiRadovi(this.username)
        .then(response => {
          this.radovi = response.data;
          console.log("radovi"+response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    vratiMentoreRada(idrad) {
      console.log("spec rad"+idrad);
      UsersDataService.getAllMentoriSpecRad(idrad)
        .then(response => {
          this.mentorirada = response.data;
          console.log("mentori"+response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    async loggedin(){
      console.log("Local storage 1: "+localStorage.getItem("loggeduser"))
      if (localStorage.getItem("loggeduser") !== null) {
        this.username = localStorage.getItem("loggeduser");
        this.secretMessage = await AuthService.getSecretContent();
      }
    },
    formatDate(date){
      const d = new Date(date);
          this.date = d.getDate();
          if(this.date<=9){
            this.date="0"+this.date;
          }
          this.month = d.getMonth()+1;
          if(this.month<=9){
            this.month="0"+this.month;
          }
          this.year = d.getFullYear();
          this.hour = d.getHours();
          if(this.hour<=9){
            this.hour="0"+this.hour;
          }
          this.minutes=d.getMinutes();
          if(this.minutes<=9){
            this.minutes="0"+this.minutes;
          }
          this.seconds = d.getSeconds();
          if(this.seconds<=9){
            this.seconds="0"+this.seconds;
          }
          this.format = this.date + '.' + this.month + '.' + this.year + ' '+this.hour+':'+this.minutes+':'+this.seconds;
          return this.format;
    }
    
  },
  mounted() {
    this.vratiMojeRadove();
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
