<template>
  <div class="submit-form">
    <h4>Odabir mentora:</h4>


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
        <label for="grad">Mentor</label>
        <select name="mentor" id="mentor" class="form-control" v-model="MentorId" >
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="mentor in mentori" :key="mentor.id" :value="mentor.id">{{mentor.name}}</option>
        </select>
      </div>

      <!-- <div class="form-group">
        <label for="name">Ocjena</label>
        <input
          type="text"
          class="form-control"
          id="Ocjena"
          required
          v-model="Ocjena"
          name="Ocjena"
        />
      </div> -->

      <button v-if="parseInt(mentori.length)==0" disabled class="btn btn-success">Već su dodani mentori</button>
      <button v-else @click="AddMentor" class="btn btn-success">Spremi</button>
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
      KatId:'',
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
    AddMentor() {
      console.log("RadId_: " + this.RadId)
      console.log("MetnorId_: " + this.MentorId)
      var data = {
        RadId: this.RadId,
        MentorId: this.MentorId
      };

      UsersDataService.createMentorRad(data)
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
      console.log("Local storage 1: "+localStorage.getItem("loggeduser"))
      console.log("Local storage 2: "+localStorage.getItem("loggeduserid"))
      if (localStorage.getItem("loggeduser") !== null) {
        this.username = localStorage.getItem("loggeduser");
        this.userid = localStorage.getItem("loggeduserid");
        this.secretMessage = await AuthService.getSecretContent();
      }
    },
    retrieveParams(idr,rname,idk,kname){
        this.RadId=idr;
        this.RadName=rname;
        this.KatId=idk;
        this.KatName=kname;
        console.log("IDrad: "+this.RadId)
        console.log("RadName: "+this.RadName)
        console.log("IDkat: "+this.KatId)
        console.log("KatName: "+this.KatName)
    },
    retrieveMetnorsByCategory(idkat,iduser) {
        console.log("IDkat2: "+idkat)
        console.log("IDuser2: "+iduser)
      UsersDataService.getMentoriByKategorija(idkat,iduser)
        .then(response => {
          this.mentori = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted(){
    this.retrieveParams(this.$route.params.idrad,this.$route.params.radname,this.$route.params.idkat,this.$route.params.katname);
    this.retrieveMetnorsByCategory(this.$route.params.idkat,this.userid);
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
