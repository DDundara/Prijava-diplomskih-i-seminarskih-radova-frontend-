<template>
  <div class="list row prikaz">
    <p class="list-group-item">Sustav služi za prijavu i odobravanje seminarskih i diplomskih radova. Ima 3 role:</p>
    <ul class="list-group">
      <li class="list-group-item">Administrator</li>
      <li class="list-group-item">Moderator (profesor/mentor)</li>
      <li class="list-group-item">Korisnik (student)</li>
    </ul>
    <p align="justify" class="list-group-item">Korisnik može prijaviti diplomski ili seminarski rad koji nakon prijave ide u proces pregleda i dobiva status „Prijavljen“. 
      Kod prijave korisnik može birati mentora (profesora) sa liste slobodnih mentora (oni koji npr. imaju manje od 3 mentorstva u tijeku). 
      Nakon što mentor zaprimi seminarski rad, stavlja ga u status „U obradi“. 
      Korisnik može vidjeti popis svih svojih seminarskih i diplomskih radova po kategoriji, 
      te završnu ocjenu za svaki od njih koji su završeni. Može vidjeti ukupan prosjek svih ocjena po kategoriji.</p>
      <p align="justify" class="list-group-item">Moderator može prihvatiti ili odbiti mentorstvo (ako nije u kategoriji koju on moderira). 
        Ako želi prihvatiti mentorstvo u kategoriji koju on moderira, sa tim se moraju složiti i članovi komisije koje sustav dodjeljuje automatski iz te kategorije. 
        Članovima komisije stiže obavijest da su dodijeljeni kao članovi, te dalje postupaju u skladu sa svojim ovlastima. Rad se smatra završenim i pregledanim nakon što mentor i 2 člana komisije dodijele ocjenu i prihvate sadržaj rada. 
        Sadržaj rada se prihvaća npr. na kvačicu „Pročitao sam rad i odobravam sve što je navedeno u radu“. 
        Moderator može vidjeti koliko radova trenutno čeka na njegovo mentorstvo, te može pretraživati radove prema datumu dospijeća od i do.</p>
      <p align="justify" class="list-group-item">Administrator ima sve ovlasti kao prethodne role te može dodavati nove korisnike na sustav, ažurirati ih i pregledavati. 
        Može dodavati i nove kategorije u sustav, ažurirati ih i pregledavati. 
        Kod nove kategorije, mora se odrediti i njen nositelj, te ispod toga svi profesori koji spadaju u tu kategoriju (ili katedru).
        Administrator vidi statistiku diplomskih radova koji su u procesu odobravanja, a sve one zahtjeve koji su odbijeni može izbrisati trajno sa sustava.</p>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  name: "Home",
  data() {
    return {
      secretMessage: '',
      username: '',
      grupa: ''
    };
  },
  async created() {
      this.loggedin();
      if(this.grupa=="moderator"){
        this.$router.push({ name: "radovimentor" });
      }
      else if(this.grupa=="administrator")
      {
        this.$router.push({ name: "kategorijesve" });
      }
      
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
    async loggedin(){
      console.log("Local storage: "+localStorage.getItem("loggeduser"))
      console.log("Local storage 2: "+localStorage.getItem("loggedusergroup"))
      if (localStorage.getItem("loggeduser") !== null) {
        this.username = localStorage.getItem("loggeduser");
        this.grupa = localStorage.getItem("loggedusergroup");
        this.secretMessage = await AuthService.getSecretContent();
      }
    }
  }
};
</script>

<style>

.prikaz{
  display: block !important;
}

</style>