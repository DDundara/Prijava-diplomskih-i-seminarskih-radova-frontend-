<template>
  <div class="submit-form">
    <h3 class="text-warning">Želite promjeniti statusa rada.</h3>
    <h4 class="text-primary">Jeste li sigurni?</h4>


    <div class="form-group">
        <label for="name">Kategorija</label>
        <input
          type="text"
          class="form-control"
          id="KategorijaNaziv"
          required
          v-model="KatName"
          name="KategorijaNaziv"
          readonly
        />
      </div>
      <input type="hidden" name="RadId" id="RadId" v-model="RadId"/>
    <div class="form-group">
        <label for="name">Seminarski rad</label>
        <input
          type="text"
          class="form-control"
          id="SemRadNaziv"
          required
          v-model="RadName"
          name="SemRadNaziv"
          readonly
        />
      </div>

      <div class="form-group">
        <label for="name">Autor rada</label>
        <input
          type="text"
          class="form-control"
          id="AutorRadNaziv"
          required
          v-model="AutorName"
          name="AutorRadNaziv"
          readonly
        />
      </div>


      <div class="form-group">
        <label for="grad">Status</label>
        <select name="StatusId" id="StatusId" class="form-control" v-model="StatusId">
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="st in statusi" :key="st.idstatus" :value="st.idstatus">{{st.nazivstatus}}</option>
        </select>
      </div>

      <button @click="UpdateWorkStatus" class="btn btn-success">Spremi</button>
      <button @click="Cancel" class="btn btn-warning btnspace">Odustani</button>
  </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";
import AuthService from '@/services/AuthService.js';
export default {
  name: "add-mentorstvo",
  data() {
    return {
      statusi: [],
      RadId:'',
      RadName:'',
      AutorName:'',
      StatusId:'',
      KatName:'',
      secretMessage: '',
      username: '',
      grupa: '',
      submitted: false
    };
  },
  async created() {
      this.loggedin();
    
  },
  methods: {
    UpdateWorkStatus() {
      console.log("RadId_: " + this.RadId)
      console.log("StatId_: " + this.StatusId)
      var data = {
        RadId: this.RadId,
        StatusId: this.StatusId
      };

      UsersDataService.updateWorkStatus(this.RadId,data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
          if(this.grupa=="administrator"){
            this.$router.push({ name: "radoviadmin",params: {page: 1}});
          }
          else
          {
            this.$router.push({ name: "radovimentor" });
          }
          
        })
        .catch(e => {
          console.log(e);
        });
    },  
    async loggedin(){
      console.log("Local storage 1: "+localStorage.getItem("loggeduser"))
      console.log("Local storage 2: "+localStorage.getItem("loggedusergroup"))
      if (localStorage.getItem("loggeduser") !== null) {
        this.username = localStorage.getItem("loggeduser");
        this.userid = localStorage.getItem("loggeduserid");
        this.grupa = localStorage.getItem("loggedusergroup");
        this.secretMessage = await AuthService.getSecretContent();
      }
    },
    Cancel(){
        this.$router.push({ name: "radovimentor" });
    },
   
    retrieveParams(idr,rname,autname,kname){
        this.RadId=idr;
        this.RadName=rname;
        this.AutorName=autname;
        this.KatName=kname;
        console.log("IDrad: "+this.RadId)
        console.log("RadName: "+this.RadName)
        console.log("IDkat: "+this.AutorName)
        console.log("KatName: "+this.KatName)
    },
    retrieveStatusi() {

      UsersDataService.getStatusi()
        .then(response => {
          this.statusi = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted(){
    this.retrieveParams(this.$route.params.idrad,this.$route.params.radname,this.$route.params.autname,this.$route.params.katname);
    this.retrieveStatusi();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}


</style>
