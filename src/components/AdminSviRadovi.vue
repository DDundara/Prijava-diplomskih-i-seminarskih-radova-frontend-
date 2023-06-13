<template>

  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
      </div>
    </div>
    <h4 class="h4w">Popis svih radova na sustavu:</h4>
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
        <th>Mentori</th>
        <th>Info</th>
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
        <a v-if="rad.StatusRada=='Prijavljen'" v-bind:href="'/workstatus/' + rad.idrad + '/'+rad.nazivrad+ '/'+rad.AutorRada+ '/'+rad.KategorijaRada"> Promjeni status </a>       
        </td>
        <td> 
          {{rad.AutorRada}}       
        </td>
        <td> 
          {{rad.Ocjena}}       
        </td>
        <td>
          <a v-bind:href="'/workmentors/' + rad.idrad + '/'+rad.nazivrad"> Pogledaj </a>
        </td>
        <td v-if="rad.RadOcjena == null">
          <a v-if="rad.StatusRada=='U obradi'" v-bind:href="'/workgrade/' + rad.idrad + '/'+rad.nazivrad+ '/'+rad.AutorRada+ '/'+rad.KategorijaRada"> Ocjeni </a>
            <a v-else-if="rad.StatusRada=='Prihvacen'" v-bind:href="'#'"> Rad ocijenjen </a>
            <a v-else-if="rad.StatusRada=='Prijavljen'" v-bind:href="'#'"> Rad prijavljen </a>
            <a v-else v-bind:href="'#'" @click="Obrisi(rad.idrad)"> Obriši rad </a>
        </td>
        <td v-else>
            Rad ocijenjen
        </td>
      </tr>
    </table>
    <div class="pagination" v-for="page in parseInt(totalPages)" :key="page" v-bind="page">
     
    <a v-bind:href="'/radoviadmin/'+page" v:model="page" v-if="page===parseInt(this.$route.params.page)" class="active" >{{ page }}</a>
    <a v-bind:href="'/radoviadmin/'+page" v:model="page" v-else >{{ page }}</a>

    </div>
    <div class="newline">
    <a v-bind:href="'/radoviadminpretraga'" class="m-3 btn btn-sm btn-primary"> Pretraga po datumu </a>
  </div>
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
      totals: [],
      total: null,
      totalPages: null,
      date:'',
      month:'',
      year:'',
      hour:'',
      minutes:'',
      seconds:'',
      format:''
    };
  },
  methods: {
    vratiRadoveGdjeSamMentor(page) {
      UsersDataService.getAdminSviRadovi(page)
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
    },
    Obrisi(idrad){
      console.log("rad za brisanje: "+idrad)
      UsersDataService.deleteWork(idrad)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
          this.$router.go();
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveTotalCountOfRadovi() {
      UsersDataService.getRadoviTotal()
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
    this.vratiRadoveGdjeSamMentor(this.$route.params.page);
    this.retrieveTotalCountOfRadovi();
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
</style>
