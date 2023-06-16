<template>
  <div class="submit-form">
    <h3>Unos novog korisnika</h3>
    <div>

      <div class="form-group frmgroup_resize">
        <label for="name">Ime i prezime</label>
        <input
          type="text"
          class="form-control frmcontr"
          id="name"
          required
          v-model="name"
          name="name"
        />
      </div>

      <div class="form-group frmgroup_resize">
        <label for="name">Korisničko ime</label>
        <input
          type="text"
          class="form-control frmcontr"
          id="username"
          required
          v-model="username"
          name="username"
        />
      </div>

      <div class="form-group frmgroup_resize">
        <label for="email">Lozinka</label>
        <input
          class="form-control frmcontr"
          id="password"
          required
          v-model="password"
          name="password"
          type="password"
        />
      </div> 
      
      <div class="form-group frmgroup_resize">
        <label for="email">Lozinka ponovno</label>
        <input
          class="form-control frmcontr"
          id="password_repeat"
          required
          v-model="password_repeat"
          name="password_repeat"
          type="password"
        />
      </div>
      
      <div class="form-group frmgroup_resize">
        <label for="email">E-mail</label>
        <input
          class="form-control frmcontr"
          id="email"
          required
          v-model="email"
          name="email"
        />
      </div>

      <div class="form-group frmgroup_resize">
        <label for="spol">Spol</label>
        <select name="spol" id="spol" class="form-control frmcontr" v-model="spol">
          <option value="" selected disabled>Izaberi</option>
          <option v-for="n in spolovi" :key="n.key" :value="n.key">{{n.value}}</option>
        </select>
      </div>

      <div class="form-group frmgroup_resize">
        <label for="grad">Grad</label>
        <select name="gradid" id="gradid" class="form-control frmcontr" v-model="gradid" @change="PrikaziNovi">
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">{{city.naziv}}</option>
          <option value="new">Novi</option>
        </select>
      </div>

      <div class="form-group frmgroup_resize hiddencity" id="newcity">
        <label for="novigrad">Novi grad</label>
        <input
          class="form-control frmcontr"
          id="novigrad"
          required
          v-model="novigrad"
          name="novigrad"
        />
      </div>

      <div class="form-group frmgroup_resize">
        <label for="grupa">Grupa</label>
        <select name="grupaid" id="grupaid" class="form-control frmcontr" v-model="grupaid">
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="group in groups" :key="group.idgroup" :value="group.idgroup">{{group.naziv}}</option>
        </select>
      </div>

      <button @click="signUp" class="btn btn-success">Sign up</button>

      <p v-if="errors.length" class="greskerazmak">
        <b>Ispravite sljedeće greške:</b>
        <ul>
         <li class="greskeboja" v-for="err in errors" :key="err.key">{{ err }}</li>
        </ul>
      </p>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';
// import UsersDataService from "../services/UsersDataService";
export default {
  data() {
    return {
      name: '',
      username: '',
      password: '',
      password_repeat: '',
      email:'',
      spol:'',
      novigrad:'',
      msg: '',
      gradid: '',
      nazivnovigrad:'',
      novigradid:'',
      grupaid: '',
      spolovi: [
        {key:'M',value:'Muški'},
        {key:'Z',value:'Ženski'}
      ],
      cities: [],
      groups: [],
      errors: []
    };
  },
  methods: {
    async signUp() {
      //console.log("novi idddd:" + await this.UnosNoviGrad());
      try {
        const credentials = {
          name: this.name,
          username: this.username,
          password: this.password,
          password_repeat: this.password_repeat,
          email: this.email,
          spol:this.spol,
          gradid:this.gradid,
          novigrad:this.novigrad,
          grupaid:this.grupaid
        };

        this.errors = [];

        if (!this.name) {
        this.errors.push('Ime i prezime je obavezno!');
        }
        if (!this.username) {
        this.errors.push('Korisničko ime je obavezno!');
        }

        if (!this.password) {
        this.errors.push('Prva lozinka obavezna!');
        }

        if (!this.password_repeat) {
        this.errors.push('Druga lozinka obavezna!');
        }

        if (this.password != this.password_repeat) {
        this.errors.push('Lozinke moraju biti iste!');
        }

        if (!this.email) {
        this.errors.push('E-mail je obavezan.');
        }

        if (!this.spol) {
        this.errors.push('Spol je obavezan!');
        }

        if (!this.gradid || this.gradid==0) {
        this.errors.push('Grad je obavezan izbor!');
        }

        if(this.errors.length==0){
        const response = await AuthService.signUp(credentials);
        this.msg = response.msg;
        this.$router.push('/');
        }

      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
    retrieveCities() {
      AuthService.getallcities()
        .then(response => {
          this.cities = response.data;
          console.log("resp:"+response.data);
          console.log("cities:"+this.cities);
        })
        .catch(e => {
          console.log(e);
        });
    },
    PrikaziNovi(){
        var novi = document.getElementById("gradid");
        console.log("Novi: "+novi.value)
        if(novi.value=='new'){
          document.getElementById("newcity").style.display='block';
        }
    },
    retrieveGroups() {
      AuthService.getallgroups()
        .then(response => {
          this.groups = response.data;
          console.log("resp:"+response.data);
          console.log("groups:"+this.groups);
        })
        .catch(e => {
          console.log(e);
        });
    }


  },
  mounted(){
    this.retrieveCities();
    this.retrieveGroups();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

#newcity{
  display: none;
}


</style>
