<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Pretraga po imenu"
          v-model="ime"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <table class="table table-striped">
      <h4>Popis studenata</h4>
      <tr>
        <th>Redni broj</th>
        <th>Id</th>
        <th>Ime</th>
        <th>Grad</th>
        <th>Godiste</th>
        <th>Akcija</th>
      </tr>
      <tr  v-for="(student, index) in students" :key="index">
        <td>{{index+1}}</td>
        <td>        
        {{student.StudentId}}
        </td>
        <td>        
        {{student.Ime}}
        </td>
        <td>        
        {{student.Grad}}
        </td>  
        <td>        
        {{student.Godiste}}
        </td>        
        <td>        
        </td>
      </tr>
    </table>
    
    <a v-bind:href="'/addstudent'" class="m-3 btn btn-sm btn-primary"> Add new </a>
  </div>
</template>

<script>
import StudentDataService from "../services/StudentDataService";

export default {
  name: "students-list",
  data() {
    return {
      students: [],
      currentStudent: null,
      currentIndex: -1
    };
  },
  methods: {
    retrieveStudents() {
      StudentDataService.getAllStudents()
        .then(response => {
          this.students = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveStudents();
      this.currentStudent = null;
      this.currentIndex = -1;
    },

    searchName() {
      StudentDataService.findByName(this.ime)
        .then(response => {
          this.students = response.data;
          //this.setActiveTutorial(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    
  },
  mounted() {
    this.retrieveStudents();
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
