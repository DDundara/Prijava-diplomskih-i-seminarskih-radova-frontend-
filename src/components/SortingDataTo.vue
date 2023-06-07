<template>
    <div>
      <h2>Sortable list &#128203;</h2>
      <table>
        <tr>
          <th @click="sortList('id')">ID &#8597;</th>
          <th @click="sortList('name')">Name &#8597;</th>
          <th @click="sortList('email')">Email &#8597;</th>
        </tr>
        <tr v-for="(data, index) in sortedData" :key="index">
          <td>{{ data.id }}</td>
          <td>{{ data.name }}</td>
          <td>{{ data.email }}</td>
        </tr>
      </table>
      <div style="padding-top: 10px">wwww.nightprogrammer.com</div>
    </div>
  </template>

<script>
export default {
  name: "ItemList",
  computed: {
    originalData() {
      return [
        { id: 1, name: "Night", email: "nightprogrammer95@gmail.com" },
        { id: 2, name: "Gautam", email: "mailgautam@test.com" },
        { id: 3, name: "Alex", email: "xalex@testmail.com" },
        { id: 4, name: "Zora", email: "zora@mail.com" },
        { id: 5, name: "Peter", email: "peter.me@test.com" },
      ];
    },
  },
  data() {
    return {
      sortedData: [],
      sortedbyASC: true,
    };
  },
  mounted() {
    this.sortedData = this.originalData;
    console.log(this.sortedData);
  },
  methods: {
    sortList(sortBy) {
      if (this.sortedbyASC) {
        this.sortedData.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.sortedData.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    },
  },
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th:hover {
  cursor: pointer;
  background: rgb(229, 255, 211);
}

tr:nth-child(even) {
  background-color: #f3f3f3;
}
</style>