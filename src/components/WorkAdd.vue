<template>
    
    <div class="submit-form">
        <h3>Unos novog rada</h3>
      <div v-if="!submitted">
  
        <div class="form-group frmgroup_resize">
          <label for="nazivrada">Naziv rada</label>
          <input
            type="text"
            class="form-control frmcontr"
            id="nazivrada"
            required
            v-model="nazivrada"
            name="nazivrada"
          />
        </div>
  
        <div class="form-group frmgroup_resize">
          <label for="opis">Opis</label>
          <textarea
            class="form-control frmcontr"
            id="opis"
            required
            v-model="opis"
            name="opis" cols="11" rows="4"
          ></textarea>
        </div>
  
        <div class="form-group frmgroup_resize">
          <label for="datumd">Datum dospijeća</label>
          <input
            class="form-control frmcontr"
            id="datumd"
            required
            v-model="datumd"
            name="datumd"
            type="date"
          />
        </div> 
  
        <div class="form-group frmgroup_resize">
          <label for="vrsta">Vrsta</label>
          <select name="vrstarada" id="vrstarada" class="form-control frmcontr" v-model="vrstarada">
            <option value="" selected disabled>Izaberi</option>
            <option v-for="vr in vrsteradova" :key="vr.key" :value="vr.key">{{vr.value}}</option>
          </select>
        </div>
  
        <div class="form-group frmgroup_resize">
          <label for="kategorija">Kategorija</label>
          <select name="kategorijarada" id="kategorijarada" class="form-control frmcontr" v-model="kategorijarada">
            <option value="" selected disabled>Izaberi</option>
            <option v-for="kat in kategorije" :key="kat.idkat" :value="kat.idkat">{{kat.nazivkat}}</option>
          </select>
        </div>
  
        <button @click="saveWork" class="btn btn-success">Spremi</button>

      </div>
      <p v-if="errors.length" class="greskerazmak">
        <b>Ispravite sljedeće greške:</b>
        <ul>
         <li class="greskeboja" v-for="err in errors" :key="err.key">{{ err }} </li>
        </ul>
      </p>

    </div>
  </template>
  
  <script>
  import AuthService from '@/services/AuthService.js';
  import UsersDataService from "../services/UsersDataService";
  
  export default {
    data() {
      return {
        nazivrada: '',
        opis: '',
        datumd: '',
        vrstarada: '',
        kategorijarada:'',
        status: 1,
        autor: '',
        autorid: '',
        secretMessage:'',
        vrsteradova: [
          {key:'1',value:'Seminarski rad'},
          {key:'2',value:'Diplomski rad'}
        ],
        kategorije: [],
        statusi: [],
        errors: []
      };
    },
    methods: {
       saveWork() {       
          var data = {
            nazivrada: this.nazivrada,
            opis: this.opis,
            kategorijarada:this.kategorijarada,
            vrstarada: this.vrstarada,         
            statusid:this.status,
            autorid:this.autorid,
            datumd: this.datumd
          };
  
          this.errors = [];

          if (!this.nazivrada) {
            this.errors.push('Naziv rada je prazan!');
            }

            if (!this.opis) {
            this.errors.push('Opis rada je prazan!');
            }
            if (!this.datumd) {
            this.errors.push('Datum dospjeća rada je prazan!');
            }
            if (!this.vrstarada) {
            this.errors.push('Vrsta rada je obavezan odabir!');
            }
            if (!this.kategorijarada) {
            this.errors.push('Kategorija rada je prazna!');
            }


      if(this.errors.length==0){
            UsersDataService.createWork(data)
            .then(response => {
              console.log(response.data);
              this.submitted = true;
              this.$router.push({ name: "mojiradovi" });
            })
            .catch(e => {
              console.log(e);
            });
      }
    },
    async loggedin(){
      console.log("Local storage 5: "+localStorage.getItem("loggeduser"))
      console.log("Local storage userid: "+localStorage.getItem("loggeduserid"))
      if (localStorage.getItem("loggeduser") !== null) {
        this.autor = localStorage.getItem("loggeduser");
        this.autorid = localStorage.getItem("loggeduserid");
        this.secretMessage = await AuthService.getSecretContent();
      }
    },
    vratiKategorije() {
      UsersDataService.getKategorije()
        .then(response => {
          this.kategorije = response.data;
          console.log("kategorije"+response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    vratiStatuse() {
      UsersDataService.getMojiRadovi()
        .then(response => {
          this.statusi = response.data;
          console.log("statusi"+response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
  
    },
    async created() {
      this.loggedin();
    
    },
    mounted(){
      this.vratiKategorije();
      this.vratiStatuse();
    }
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  
  .frmgroup_resize{
    font-size: 12px;
  }
  
  .frmcontr{
    font-size: 12px !important;
  }
  </style>
  