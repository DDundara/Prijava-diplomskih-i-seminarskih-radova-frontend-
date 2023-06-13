<template>
  
  <div class="submit-form">
    <h4 class="h4w">Dodavanje mentora za kategoriju "{{ this.nazivkat }}"</h4>
    <div v-if="!submitted">
        <input type="hidden" name="idkat" id="idkat" v-model="this.idkat"/>
      <div class="form-group">
        <label for="moderator">Mentor</label>
        <select name="idment" id="idment" class="form-control" v-model="this.idment">
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="ment in mentors" :key="ment.id" :value="ment.id">{{ment.name}}</option>
        </select>
      </div>


      <button @click="saveKategorijaMentor" class="btn btn-success">Dodaj</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";

export default {
  name: "add-kategorijamentor",
  data() {
    return {
      mentors: [],
        idkat: "",
        nazivkat: "",
        idment: "",
      submitted: false
    };
  },
  methods: {
    saveKategorijaMentor() {
      console.log("idd: " + this.idkat)
      console.log("nazivv: " + this.nazivkat)
      console.log("mentorr: " + this.mentorid)
      var data = {
        idkat: this.idkat,
        nazivkat: this.nazivkat,
        idment: this.idment
      };

      UsersDataService.createKategorijaMentor(data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
          this.$router.push({ name: "kategorijementori",params: {idkat: this.idkat, katname: this.nazivkat}});
          //window.location="kategorijementori/"+this.idkat+"/"+this.nazivkat;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    retrieveMentorsForAdd(idkat,nazivkat) {
      UsersDataService.getAllMentoriForAdd(idkat,nazivkat)
        .then(response => {
          this.mentors = response.data;
          this.idkat = idkat;
          this.nazivkat = nazivkat;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted(){
    this.retrieveMentorsForAdd(this.$route.params.idkat,this.$route.params.katname);
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.h4w{
  width: 100% !important;
}
</style>
