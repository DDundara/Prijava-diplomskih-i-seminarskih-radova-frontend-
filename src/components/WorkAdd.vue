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
        
        <!-- <div class="form-group frmgroup_resize">
          <label for="email">E-mail</label>
          <input
            class="form-control frmcontr"
            id="email"
            required
            v-model="email"
            name="email"
          />
        </div> -->
  
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
  
        <!-- <div class="form-group frmgroup_resize">
          <label for="grupa">Grupa</label>
          <select name="grupaid" id="grupaid" class="form-control frmcontr" v-model="grupaid">
            <option value="0" selected disabled>Izaberi</option>
            <option v-for="group in groups" :key="group.idgroup" :value="group.idgroup">{{group.naziv}}</option>
          </select>
        </div> -->
  
        <button @click="saveWork" class="btn btn-success">Spremi</button>
        <!-- <p v-if="msg">{{ msg }}</p> -->
        <!-- <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
           <li v-for="err in errors" :key="err.key">{{ err }}</li>
          </ul>
        </p> -->
      </div>
  
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="signUp">Sign up</button>
      </div>
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
            //autor:this.autor,
            statusid:this.status,
            autorid:this.autorid,
            datumd: this.datumd
          };
  
          this.errors = [];
  
          if (!this.name) {
          this.errors.push('Name required.');
          }
          if (!this.username) {
          this.errors.push('Username required.');
          }
  
          if (!this.password) {
          this.errors.push('Password required.');
          }
  
          if (!this.password_repeat) {
          this.errors.push('Password repeat required.');
          }
  
          if (this.password != this.password_repeat) {
          this.errors.push('Passwords must be the same!');
          }
  
          if (!this.email) {
          this.errors.push('E-mail required.');
          }
  
          if (!this.spol) {
          this.errors.push('Gender required.');
          }
  
          if (!this.gradid || this.gradid==0) {
          this.errors.push('Grad required.');
          }

        UsersDataService.createWork(data)
        .then(response => {
          //this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.$router.push({ name: "mojiradovi" });
        })
        .catch(e => {
          console.log(e);
        });
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
  
          // if(this.errors.length==0){
          //   return true;
          // }
  
  
          //console.log("errors:"+this.errors[0]);
        //   if(this.errors.length==0){
        //   const response = await AuthService.signUp(credentials);
        //   this.msg = response.msg;
        //   this.$router.push('/');
        //   }
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
  