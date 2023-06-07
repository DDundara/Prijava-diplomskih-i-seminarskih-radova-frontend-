import http from "../http-common";

class StudentDataService {
  getAllStudents() {
    return http.get("/students");
  }

  create(data) {
    return http.post("/students", data);
  }
/*
  getAllFull() {
    return http.get("/tutorialsfull");
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }



  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }
*/
  findByName(name) {
    return http.get(`/students?ime=${name}`);
  }
  
}

export default new StudentDataService();
