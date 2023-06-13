<template>
  
  <div class="submit-form">
    <h4 class="h4w">Dodavanje nove kategorije:</h4>
    <div v-if="!submitted">

      <div class="form-group">
        <label for="name">Naziv</label>
        <input
          type="text"
          class="form-control"
          id="nazivkat"
          required
          v-model="kategorija.nazivkat"
          name="nazivkat"
        />
      </div>

      <div class="form-group">
        <label for="moderator">Moderator</label>
        <select name="moderatorid" id="moderatorid" class="form-control" v-model="kategorija.moderatorid">
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="mod in moderators" :key="mod.id" :value="mod.id">{{mod.name}}</option>
        </select>
      </div>


      <button @click="saveKategorija" class="btn btn-success">Dodaj</button>
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
  name: "add-kategorija",
  data() {
    return {
      moderators: [],
      kategorija: {
        idkat: "",
        nazivkat: "",
        moderatorid: ""
      },
      submitted: false
    };
  },
  methods: {
    saveKategorija() {
      console.log("id: " + this.kategorija.idkat)
      console.log("naziv: " + this.kategorija.nazivkat)
      console.log("moderator: " + this.kategorija.moderatorid)
      var data = {
        idkat: this.kategorija.idkat,
        nazivkat: this.kategorija.nazivkat,
        moderatorid: this.kategorija.moderatorid
      };

      UsersDataService.createKategorija(data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
          this.$router.push({ name: "kategorijesve" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    retrieveMentors() {
      UsersDataService.getAllMentori()
        .then(response => {
          this.moderators = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    newKategorija() {
      this.submitted = false;
      this.kategorija = {};
    }
  },
  mounted(){
    this.retrieveMentors();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
