<template>
  
  <div v-if="kategorija" class="submit-form">
    <h4 class="h4w">Ažuriranje kategorije:</h4>
    <div>

      <div class="form-group">
        <label for="name">Naziv</label>
        <input
          type="text"
          class="form-control"
          id="nazivkat"
          required
          v-model="kategorija[0].nazivkat"
          name="nazivkat"
        />
      </div>

      <div class="form-group">
        <label for="moderator">Moderator</label>
        <select name="moderatorid" id="moderatorid" class="form-control" v-model="kategorija[0].moderatorid">
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="mod in moderators" :key="mod.id" :value="mod.id">{{mod.name}}</option>
        </select>
      </div>


      <button @click="updateKategorija" class="btn btn-success">Dodaj</button>
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
      kategorija: null,
      submitted: false
    };
  },
  methods: {
    updateKategorija() {
      console.log("id: " + this.kategorija[0].idkat)
      console.log("naziv: " + this.kategorija[0].nazivkat)
      console.log("moderator: " + this.kategorija[0].moderatorid)
      var data = {
        idkat: this.kategorija[0].idkat,
        nazivkat: this.kategorija[0].nazivkat,
        moderatorid: this.kategorija[0].moderatorid
      };

      UsersDataService.updateKategorija(this.kategorija[0].idkat,data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
          this.$router.push({ name: "kategorijesve" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    retrieveKategorijaDetails(idkat) {
        console.log("id retrive: " + idkat)
      UsersDataService.retrieveKategorijaDetails(idkat)
        .then(response => {
          this.kategorija = response.data;
          console.log(response.data);
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
  },
  mounted(){
    this.retrieveKategorijaDetails(this.$route.params.idkat);
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
