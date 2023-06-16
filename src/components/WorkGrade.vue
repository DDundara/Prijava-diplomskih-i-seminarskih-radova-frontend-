<template>
  <div class="submit-form">
    <h4>Ocjena rada:</h4>


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
      <input type="hidden" name="MentorId" id="MentorId" v-model="MentorId"/>
      <input type="hidden" name="CurrentUserId" id="CurrentUserId" v-model="userid"/>

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
        <label for="name">Ocjena</label>
        <input
          type="text"
          class="form-control"
          id="Ocjena"
          required
          v-model="Ocjena"
          name="Ocjena"
        />
      </div>

      <button @click="UpdateWorkGrade" class="btn btn-success">Spremi</button>
  </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";
import AuthService from '@/services/AuthService.js';
export default {
  name: "add-mentorstvo",
  data() {
    return {
      mentori: [],
      secretMessage: '',
      username: '',
      userid:'',
      RadId:'',
      RadName:'',
      AutorName:'',
      KatName:'',
      MentorId:'',
      Ocjena:'',
      submitted: false
    };
  },
  async created() {
      this.loggedin();
    
  },
  methods: {
    UpdateWorkGrade() {
      console.log("RadId_: " + this.RadId)
      console.log("MetnorId_: " + this.MentorId)
      console.log("Ocjena_: " + this.Ocjena)
      var data = {
        RadId: this.RadId,
        MentorId: this.MentorId,
        Ocjena: this.Ocjena
      };

      UsersDataService.updateWorkGrade(this.username,data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
          this.$router.push({ name: "radovimentor" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    async loggedin(){
      console.log("Local storage 1: "+localStorage.getItem("loggeduser"))
      console.log("Local storage 2: "+localStorage.getItem("loggeduserid"))
      if (localStorage.getItem("loggeduser") !== null) {
        this.username = localStorage.getItem("loggeduser");
        this.userid = localStorage.getItem("loggeduserid");
        this.MentorId = localStorage.getItem("loggeduserid");
        this.secretMessage = await AuthService.getSecretContent();
      }
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
    }

  },
  mounted(){
    this.retrieveParams(this.$route.params.idrad,this.$route.params.radname,this.$route.params.autname,this.$route.params.katname);

  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
