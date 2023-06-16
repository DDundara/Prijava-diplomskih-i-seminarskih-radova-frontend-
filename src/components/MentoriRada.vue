<template>

  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
      </div>
    </div>
    <h4 class="h4w">Popis mentora za rad "{{ this.radname }}"</h4>
    <table class="table table-striped tblfont">    
      <tr>
        <th>Id mentora</th>
        <th>Naziv</th>
        <th>Ocjena</th>
      </tr>
      <tr  v-for="(ment, index) in mentorirada" :key="index">
        <td>        
        {{ment.idment}}
        </td>
        <td>        
        {{ment.name}}
        </td>
        <td>        
        {{ment.ocjena}}
        </td>
      </tr>
      <tr>
        <td colspan="2" align="right">Prosjek: </td>
        <td>{{ this.totalSum()}}</td>
      </tr>
      <tr>
        <td colspan="3" v-if="parseInt(totalOcjene())<3">
            <button @click="AcceptWork" class="btn btn-success" disabled>Potvrdi rad</button>
        </td>
        <td colspan="3" v-else-if="parseInt(totalOcjene())==3 && (this.OcjenaAccepted == null || this.OcjenaAccepted == 0)">
            <button @click="AcceptWork" class="btn btn-success">Potvrdi rad</button>
        </td>
        <td colspan="3" v-else>
            <button @click="'#'" class="btn btn-success" disabled>Rad potvrđen</button>
        </td>
      </tr>
    </table>
    
    <a v-bind:href="'#'" @click="nazat" class="m-3 btn btn-sm btn-primary"> Natrag </a>
  </div>
</template>

<script>

import UsersDataService from "../services/UsersDataService";
export default {
  name: "users-list",
  data() {
    return {
      mentorirada: [],
      workaccepted: [],
      idrad:'',
      RadId:'',
      Ocjena:'',
      OcjenaAccepted:'',
      radname:'',
      sumaocjena:0
    };
  },
  methods: {
    vratiMentoreRada(idrad,radname) {
      console.log("spec rad"+idrad);
      UsersDataService.getAllMentoriSpecRad(idrad,radname)
        .then(response => {
          this.mentorirada = response.data;
          this.radname = radname;
          console.log("mentori"+response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    CurrentWorkAccepted(idrad){
        console.log("Id rad idem: "+idrad);
        UsersDataService.isWorkAccepted(idrad)
        .then(resp => {
          this.workaccepted = resp.data;
          this.OcjenaAccepted = this.workaccepted[0].ocjena;
          console.log("Ocjena acc: "+resp.data);
          console.log("Ocjena real: "+this.OcjenaAccepted);
        })
        .catch(e => {
          console.log(e);
        });
    },
    AcceptWork(){
        console.log("RadIdAccept_: " + this.RadId)
      var data = {
        RadId: this.$route.params.idrad,
        Ocjena: this.totalSum()
      };
      console.log("Acc idrad "+this.$route.params.idrad);
      console.log("Acc ocjena "+this.totalSum());
      this.RadId=this.$route.params.idrad;
      this.Ocjena=this.totalSum();

      UsersDataService.updateWorkAcceptance(this.RadId,this.Ocjena,data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
          this.$router.push({ name: "radovimentor" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    totalSum(){
        var suma=0;
        for(var i=0;i<this.mentorirada.length;i++){
            if(this.mentorirada[i].ocjena == null){
                this.mentorirada[i].ocjena=0;
            }
            suma+=parseFloat(this.mentorirada[i].ocjena);
        }
        return (suma/this.mentorirada.length).toFixed(2);
    },
    totalOcjene(){
        var brojac=0;
        for(var i=0;i<this.mentorirada.length;i++){
            if(this.mentorirada[i].ocjena != null && this.mentorirada[i].ocjena !=0){
                brojac++;
            }
            
        }
        console.log("total ocjene"+brojac);
        return brojac;
    },
    nazat(){
        history.back(-1);
    }    
  },
  mounted() {
    this.vratiMentoreRada(this.$route.params.idrad,this.$route.params.radname);
    this.CurrentWorkAccepted(this.$route.params.idrad);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

</style>
