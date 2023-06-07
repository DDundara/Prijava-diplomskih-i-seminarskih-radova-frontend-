import http from "../http-common";

class DvoraneDataService {
  getAllDvorane() {
    return http.get("/dvorane");
  }

  create(data) {
    return http.post("/dvorane", data);
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
    return http.get(`/dvorane?ime=${name}`);
  }
  
}

export default new DvoraneDataService();
