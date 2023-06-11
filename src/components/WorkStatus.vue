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
        <select name="status" id="status" class="form-control" v-model="StatusId">
          <option value="0" selected disabled>Izaberi</option>
          <option v-for="st in statusi" :key="st.id" :value="st.id">{{st.nazivstatus}}</option>
        </select>
      </div>

      <button @click="UpdateWorkStatus" class="btn btn-success">Spremi</button>
      <button @click="Cancel" class="btn btn-warning btnspace">Odustani</button>
  </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";
export default {
  name: "add-mentorstvo",
  data() {
    return {
      statusi: [],
      RadId:'',
      RadName:'',
      AutorName:'',
      KatName:'',
      submitted: false
    };
  },
  methods: {
    UpdateWorkStatus() {
      console.log("RadId_: " + this.RadId)
      var data = {
        RadId: this.RadId
      };

      UsersDataService.updateWorkStatus(this.RadId,data)
        .then(response => {
          //this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.$router.push({ name: "radovimentor" });
        })
        .catch(e => {
          console.log(e);
        });
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

.btnspace{
    margin-left: 15px;
}
</style>
