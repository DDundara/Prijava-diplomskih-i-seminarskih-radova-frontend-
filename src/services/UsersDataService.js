import http from "../http-common";

class UsersDataService {
  getAllUsers() {
    return http.get("/users");
  }

  getAllUsersByTitle(title) {
    return http.get(`/users?title=${title}`);
  }

  getAllUsersPerPage(page) {
    return http.get("/usersperpage/"+page);
  }

  getAllUsersAndCities() {
    return http.get("/usersandcities");
  }

  getUserForEdit(id) {
    return http.get(`/useredit/${id}`);
  }

  getWorkForEdit(idr,radname,idk,katname) {
    return http.get(`/workedit/${idr}/${radname}/${idk}/${katname}`);
  }

  getWorkForGrade(idr,radname,autname,katname) {
    return http.get(`/workgrade/${idr}/${radname}/${autname}/${katname}`);
  }
  
  getMentoriByKategorija(idkat,iduser) {
    return http.get("/mentorsbycategory/"+idkat+"/"+iduser);
  }

  getWorkForEdite(idr) {
    return http.get(`/workedite?idrad=${idr}`);
  }

  getAllCities() {
    return http.get("/cities");
  }

  getKategorije() {
    return http.get("/kategorije");
  }

  getStatusi() {
    return http.get("/statusi");
  }

  //radovi

  getAllRadovi() {
    return http.get("/sviradovi");
  }

  getMojiRadovi(username) {
    return http.get("/mojiradovi/"+username);
  }

  getRadoviMentor(username) {
    return http.get("/radovimentor/"+username);
  }

  getRadoviMentorPretraga(username,datumod,datumdo) {
    return http.get(`/radovimentorpretraga/${username}?datumod=${datumod}+&datumdo=${datumdo}`);
  }

  getUsersTotal() {
    return http.get("/userstotal");
  }
  findByName(name) {
    return http.get(`/users?name=${name}`);
  }
  create(data) {
    return http.post("/users", data);
  }
  update(id,data) {
    return http.put(`/users/${id}`, data);
  }

  updateWorkGrade(username,data) {
    return http.put(`radovimentor/${username}`, data);
  }
  
  delete(id) {
    return http.delete(`/users/${id}`);
  }

  createWork(data) {
    return http.post("/sviradovi", data);
  }

  createMentorRad(data) {
    return http.post("/svimentorirad", data);
  }

  getAllMentoriRad() {
    return http.get("/svimentorirad");
  }

  getAllMentoriSpecRad(idrad,radname) {
    return http.get("/workmentors/"+idrad+"/"+radname);
  }

  provjeriOcjenuMentora(idrad,idment) {
    return http.get("/provjeriocjenuradamentora/"+idrad+"/"+idment);
  }

  getWorkForChangeStatus(idr,radname,autname,katname) {
    return http.get(`/workstatus/${idr}/${radname}/${autname}/${katname}`);
  }

  updateWorkStatus(idrad,data) {
    return http.put(`workstatus/${idrad}`, data);
  }

  updateWorkAcceptance(idrad,ocjena,data) {
    return http.put(`workacceptance/${idrad}/${ocjena}`, data);
  }

  isWorkAccepted(idrad) {
    return http.get("isworkaccepted/"+idrad);
  }

  prosjekOcjenaPoKategoriji() {
    return http.get("/prosjekocjenapokategoriji");
  }

  
  prikaziSveKategorije() {
    return http.get("/kategorijesve");
  }

  prikaziMentoreKategorije(idkat,katname) {
    return http.get(`/kategorijementori/${idkat}/${katname}`);
  }

  createKategorija(data) {
    return http.post("/kategorijesve", data);
  }

  createNoviGrad(data){
    return http.post("/cities", data);
  }

  getAllMentori() {
    return http.get("/svimentori");
  }

  getAllMentoriForAdd(idkat,katname) {
    return http.get(`/svimentoriadd/${idkat}/${katname}`);
  }

  createKategorijaMentor(data) {
    return http.post("/kategorijementorialljoin",data);
  }

  removeMentorFromCategory(idzapis) {
    return http.delete(`/kategorijesve/${idzapis}`);
  }

  retrieveKategorijaDetails(idkat){
      return http.get(`/azurirajkategoriju/${idkat}`);

  }

  updateKategorija(idkat,data) {
    return http.put(`/kategorijesve/${idkat}`, data);
  }

  getAdminSviRadovi(page) {
    return http.get("/radoviadmin/"+page);
  }

  getRadoviAdminPretraga(datumod,datumdo) {
    return http.get(`/radoviadminpretraga?datumod=${datumod}+&datumdo=${datumdo}`);
  }

  getRadoviTotal() {
    return http.get("/radovitotal");
  }

  deleteWork(idrad) {
    return http.delete(`/radovitotal?idrad=${idrad}`);
  }


  
}

export default new UsersDataService();
