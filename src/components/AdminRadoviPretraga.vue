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
    <h4 class="h4w">Popis svih radova (prema pretrazi datuma dospijeća):</h4>
    <table class="table table-striped tblfont tblduz">    
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
    
    <!-- <a v-bind:href="'/addwork'" class="m-3 btn btn-sm btn-primary"> Novi rad </a> -->

  </div>
</template>

<script>

import UsersDataService from "../services/UsersDataService";
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
  methods: {
    vratiRadoveGdjeSamMentor() {
      UsersDataService.getRadoviAdminPretraga(this.datumod,this.datumdo)
        .then(response => {
          this.radovi = response.data;
          console.log("radovi"+response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    vratiRadoveGdjeSamMentorPretraga() {
      UsersDataService.getRadoviAdminPretraga(this.datumod,this.datumdo)
        .then(response => {
          this.radovi = response.data;
          console.log("radovi"+response.data);
        })
        .catch(e => {
          console.log(e);
        });
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
