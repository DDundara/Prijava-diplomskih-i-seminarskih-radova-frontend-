<template>

  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
      </div>
    </div>
    <h4 class="h4w">Popis mentora za kategoriju "{{ this.katname }}"</h4>
    <table class="table table-striped tblfont">    
      <tr>
        <th>Id kategorije</th>
        <th>Naziv</th>
        <th>Mentor</th>
        <th>Akcija</th>
      </tr>
      <tr  v-for="(ment, index) in mentorikategorije" :key="index">
        <td>        
        {{ment.idkat}}
        </td>
        <td>        
        {{ment.nazivkat}}
        </td>
        <td>        
        {{ment.mentor}}
        </td>
        <td>
          <a v-bind:href="'#'" @click="makniMentora(ment.idkatment)"> Makni </a>
        </td>
      </tr>
    </table>
    
    <a v-bind:href="'#'" @click="nazat" class="m-3 btn btn-sm btn-primary"> Natrag </a>
    <a v-if="parseInt(this.mentorikategorije.length)==3" v-bind:href="'#'" class="m-3 btn btn-sm btn-primary disabled"> Mentori dodani (3) </a>
    <a v-else v-bind:href="'/dodajmentorekategorije/'+this.idkat+'/'+this.katname" class="m-3 btn btn-sm btn-primary" title="Možete dodati do 3 mentora"> Dodaj mentore </a>
  </div>
</template>

<script>

import UsersDataService from "../services/UsersDataService";
export default {
  name: "users-list",
  data() {
    return {
      mentorikategorije: [],
      idkat:'',
      katname:''
    };
  },
  methods: {
    vratiMentoreKategorije(idkat,katname) {
        console.log("Pr idkat: "+idkat);
        console.log("Pr katnaziv: "+katname);
      UsersDataService.prikaziMentoreKategorije(idkat,katname)
        .then(response => {
          this.mentorikategorije = response.data;
          this.idkat = idkat;
          this.katname = katname;
          console.log("mentori"+response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    nazat(){
        history.back(-1);
    },
    makniMentora(idzapis){
      console.log("Zapis: "+idzapis);
      UsersDataService.removeMentorFromCategory(idzapis)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
          this.$router.go();
        })
        .catch(e => {
          console.log(e);
        });
    }    
  },
  mounted() {
    this.vratiMentoreKategorije(this.$route.params.idkat,this.$route.params.katname);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.tblfont{
  font-size: 12px;
}

.h4w{
  width: 100% !important;
}

.disabled {
    opacity: 0.5;
    pointer-events: none;
}
</style>
