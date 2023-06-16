<template>

  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
         <div class="razmak">Datum od:<input type="date" class="form-control" placeholder="Datum od" v-model="datumod"/></div>
         <div class="razmak">Datum do:<input type="date" class="form-control" placeholder="Datum do" v-model="datumdo"/></div>
      </div>
      <div class="input-group-append">
          <button class="btn btn-outline-secondary btnfont" type="button"
            @click="vratiRadoveGdjeSamMentorPretraga"
          >
            Pretraži
          </button>
        </div>
    </div>
    <h4 class="h4w">Popis radova gdje imam mentorstvo (prema pretrazi datuma dospijeća):</h4>
    <table class="table table-striped tblfont tblduz">    
      <tr>
        <th>Id</th>
        <th>Naziv rada</th>
        <th>Opis</th>
        <th>Datum dospjeća</th>
        <th>Vrsta</th>
        <th>Kategorija</th>
        <th>Mentor kategorije</th>
        <th>Status</th>
        <th>Autor</th>
        <th>Ocjena</th>
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
        <td v-if="rad.MentorKat==1">
          da
        </td>
        <td v-else>
            ne
        </td>
        <td> 
          {{rad.StatusRada}}
        <br>
          <a v-if="rad.StatusRada=='Prijavljen'" v-bind:href="'/workstatus/' + + rad.idrad + '/'+rad.nazivrad+ '/'+rad.AutorRada+ '/'+rad.KategorijaRada"> Stavi u obradu </a>       
        </td>
        <td> 
          {{rad.AutorRada}}       
        </td>
        <td> 
          {{rad.FinalOcjena}}       
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
      radovi: [],
      mentorirada: [],
      mentoriradaocjene: [],
      radid:'',
      secretMessage: '',
      username: '',
      userid:'',
      date:'',
      month:'',
      year:'',
      hour:'',
      minutes:'',
      seconds:'',
      format:'',
      datumod:'',
      datumdo:''
    };
  },
  async created() {
      this.loggedin();
    
  },
  methods: {
    vratiRadoveGdjeSamMentor() {
      UsersDataService.getRadoviMentor(this.username)
        .then(response => {
          this.radovi = response.data;
          console.log("radovi"+response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    vratiRadoveGdjeSamMentorPretraga() {
        console.log("us pretr1: "+this.username);
      UsersDataService.getRadoviMentorPretraga(this.username,this.datumod,this.datumdo)
        .then(response => {
          this.radovi = response.data;
          console.log("radovi"+response.data);
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
    this.vratiRadoveGdjeSamMentor();
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

.razmak{
    margin-left: 15px !important;
}

.btnnovired{
    clear: both;
    display: block !important;
    
}

.btnfont{
    margin-left: 15px !important;
    background-color: aquamarine;
    font-size: 12px;
}
</style>
