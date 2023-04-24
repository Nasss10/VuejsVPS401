<script setup>

import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const route = useRoute()
const idPartie = ref()
const partie = ref()
const iduser = ref()


onMounted(async () => {
  idPartie.value = route.params.idgame
  iduser.value = route.params.iduser

  partie.value = await fetchApi()
  setInterval(async () => {
    partie.value = await fetchApi()
  }, 1500
)

})


async function fetchApi() {
  let response = await axios.get(`https://mmi21a11.sae401.ovh/api/parties/${idPartie.value}`)
  console.log(response.data)
  return response.data
}
function isWinningJ1(partie) {
  const motsVerts = partie.motParties.filter(mot => mot.couleurJ2 === 'Vert' || mot.couleurJ1 === 'Vert') 
  return motsVerts.every(mot => mot.etatmot === 'trouver')
}



function ajouter(){
   axios.post('https://mmi21a11.sae401.ovh/api/indices', {
    partie: '/api/parties/' + idPartie.value, 
    mot: mot.value,
   


  })
}

function cartetrigger(index){
  


  if (this.iduser == 1) {
    console.log(this.partie.motParties[index].couleurJ1)

    if (this.partie.motParties[index].couleurJ2 === 'Vert') {
      console.log('good pour le J1 :)')

      this.partie.motParties[index].etatmot = 'trouver'
      axios.patch(`https://mmi21a11.sae401.ovh/api/mot_parties/${this.partie.motParties[index].id}`, {
        etatmot: 'trouver'
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          })
    }


    if (this.partie.motParties[index].couleurJ2 === 'Neutre') {
      console.log('good pour le J1 :)')

      this.partie.motParties[index].etatmot = 'jeton'
      axios.patch(`https://mmi21a11.sae401.ovh/api/mot_parties/${this.partie.motParties[index].id}`, {
        etatmot: 'jeton'
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          })
          axios.patch(`https://mmi21a11.sae401.ovh/api/parties/${idPartie.value}`, {
        tourduj: '2'
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          })
    }
  }

  if (this.partie.motParties[index].couleurJ2 === 'Noir') {
      console.log('good pour le J1 :)')

      this.partie.motParties[index].etatmot = 'perdu'
      axios.patch(`https://mmi21a11.sae401.ovh/api/mot_parties/${this.partie.motParties[index].id}`, {
        etatmot: 'perdu'
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          })
    }
  
  

    


  if (this.iduser == 2) {
    console.log(this.partie.motParties[index].couleurJ2)

    if (this.partie.motParties[index].couleurJ1 === 'Vert') {
      console.log('good pour le J2 :)')

      this.partie.motParties[index].etatmot = 'trouver'
      axios.patch(`https://mmi21a11.sae401.ovh/api/mot_parties/${this.partie.motParties[index].id}`, {
        etatmot: 'trouver'
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          })
    }


    if (this.partie.motParties[index].couleurJ1 === 'Neutre') {
      console.log('good pour le J2 :)')

      this.partie.motParties[index].etatmot = 'jeton'
      axios.patch(`https://mmi21a11.sae401.ovh/api/mot_parties/${this.partie.motParties[index].id}`, {
        etatmot: 'jeton'
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          })
          axios.patch(`https://mmi21a11.sae401.ovh/api/parties/${idPartie.value}`, {
        tourduj: '1'
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          })
    }

    if (this.partie.motParties[index].couleurJ1 === 'Noir') {
      console.log('good pour le J2 :)')

      this.partie.motParties[index].etatmot = 'perdu'
      axios.patch(`https://mmi21a11.sae401.ovh/api/mot_parties/${this.partie.motParties[index].id}`, {
        etatmot: 'perdu'
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          })
    }
  }
  }


  function passageTour(){
    console.log('hehe')
      axios.patch(`https://mmi21a11.sae401.ovh/api/parties/${idPartie.value}`, {
        tourduj: '2'
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          }),
          axios.patch(`https://mmi21a11.sae401.ovh/api/parties/${idPartie.value}`, {
            tourpartie: partie.value.tourpartie +1 
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          })
  }

  function passageTourj2(){
    console.log('hehe')
      axios.patch(`https://mmi21a11.sae401.ovh/api/parties/${idPartie.value}`, {
        tourduj: '1'
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          }),
          axios.patch(`https://mmi21a11.sae401.ovh/api/parties/${idPartie.value}`, {
        tourpartie: partie.value.tourpartie +1 
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          })

  }

  function gagnergame(){
    console.log('hehe')
    axios.patch(`https://mmi21a11.sae401.ovh/api/parties/${idPartie.value}`, {
        victoire: 'oui'
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          }),
          window.location.href = 'https://mmi21a11.sae401.ovh/compte';

  }

  function perdregame(){
    console.log('hehe')
    axios.patch(`https://mmi21a11.sae401.ovh/api/parties/${idPartie.value}`, {
        victoire: 'non'
      }, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error)
          }),
          window.location.href = 'https://mmi21a11.sae401.ovh/compte';

  }





</script>

<template>
  <div class="wrapper2">
  <div class="indicationdiv" v-if="iduser == 1 && partie.tourduj == '2'" > <p><span class="indication">Fournis un indice pour le joueur 2</span></p> </div>
  <div class="indicationdiv" v-if="iduser == 1 && partie.tourduj == '1'" > <p><span class="indication">Attend l'indice pour commencer à deviner</span></p></div>
  <div class="indicationdiv" v-if="iduser == 2 && partie.tourduj == '1'" ><p><span class="indication">Fournis un indice pour le joueur 1</span></p> </div>
  <div class="indicationdiv" v-if="iduser == 2 && partie.tourduj == '2'" ><p><span class="indication">Attend l'indice pour commencer à deviner</span></p> </div>
</div>
<div class="wrappper">
  
  <div v-if="partie" class="cart">
    <p><span class="carteindigice">Carte "indice"</span></p>
    <div v-for="mot in partie.motParties" :key="mot.id">
      <div v-if="iduser === '1'" :class="`case ${ mot.couleurJ1 }`">
        &nbsp;
      </div>
      <div v-else :class="`case ${ mot.couleurJ2 }`">
        &nbsp;
      </div>
    </div>
  </div>
  <div v-if="partie" class="parent">
    
    
    <div v-if="iduser == 1 && partie.tourduj == '2'" class="notyourturn"></div>

    <div v-if="iduser == 2 && partie.tourduj == '1'" class="notyourturn"></div>

    <div  v-for="(mot, index) in partie.motParties" @click="cartetrigger(index)" :key="mot.id">

      <div v-if="iduser === '1'" class="couleurdecarte" :class="`${mot.etatmot} ${mot.couleurJ1}`"> <!-- début de la div pr les mots -->

        <div v-if="mot.etatmot === 'trouver'" class="couleurdecarte">TROUVER</div>
        <div v-if="mot.etatmot === 'jeton'" class="couleurdecarte">Jeton</div>
        <div v-if="mot.etatmot === 'perdu'" class="endgame"><p>Partie Perdu vous avez trouver une carte noir</p> <button @click="perdregame">Finir Partie</button></div>
        <div v-if="isWinningJ1(partie)" class="goodgame"><p>Bien joué c'est gagné</p> <button @click="gagnergame">Finir Partie</button></div>



        <p class="texte">{{ mot.mot.mot }}</p> <!-- le premier mot est la boucle, le deuxième mot est la relation entre PartieMot et Mot, et le troisième mot est le champs dans mot -->
      </div><!-- Fin de la div pr les mots -->

      <div v-else class="couleurdecarte" :class="mot.couleurJ2">
        <div v-if="mot.etatmot === 'trouver'" class="couleurdecarte">TROUVER</div>
        <div v-if="mot.etatmot === 'jeton'" class="couleurdecarte">Jeton</div>
        <div v-if="mot.etatmot === 'perdu'" class="endgame"><p>Partie Perdu vous avez trouver une carte noir</p> <button @click="perdregame">Finir Partie</button></div>
        <div v-if="isWinningJ1(partie)" class="goodgame"><p>Bien joué c'est gagné</p> <button @click="gagnergame">Finir Partie</button></div>

        <p class="texte">{{ mot.mot.mot }}</p> 
        <!-- le premier mot est la boucle, le deuxième mot est la relation entre PartieMot et Mot, et le troisième mot est le champs dans mot -->
      </div>
      
    </div>
    
  </div>


  
  <div class="historiquemessage">
  <p class="indicee">Les indicices</p>
<div class="trait"></div>
<div v-if="partie" class="montxpt">
  <div v-for="indice in partie.indices.slice().reverse()" :key="indice.id" class="bonindices">
    <p>  Voici votre indice : <span class="indice">{{indice.mot}}</span> </p>
  </div>
</div>



</div>

</div>        <!-- fin div wrapper -->

  

  
  
  


<div class="wrapper3">





<p><span class="titleajt">Ajouter un indice</span></p>
      <div>
        <input type="text" id="mot" v-model="mot" placeholder="Indice(s) - 1"/>
      </div>
      
      <button @click="ajouter">Ajouter</button>



<div v-if="partie" class="montxt">
  <div v-if="iduser == 1 && partie.tourduj == '1'" >

  <button @click="passageTour">J'ai fini de deviner</button>
</div>

</div>

<div v-if="partie" class="montxt">
  <div v-if="iduser == 2 && partie.tourduj == '2'" >

  <button @click="passageTourj2">J'ai fini de deviner</button>
</div>


</div>
<div v-if="partie" class="montxt">

<div v-if="partie.tourpartie == 9" class="endgame" > Fin de partie 9 tours se sont écoulé</div>
</div>
    
    
</div>
      
     


</template>

<style scoped>
.montxpt{
  margin-left: 10px;
}

.titleajt{
  color: aliceblue;
  font-size: 2.3rem;
  margin-right: 20px;
}
.montxt{
  margin-left: 50px;
}
.montxt button{
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}
.montxt button:hover{
  background-color: #23c483;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);

}
.wrapper3{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.carteindigice{
  color: aliceblue;
  font-size: 20px;
}
.wrapper2{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.indicationdiv{
  width: 80%;
  height: 8vh;
  background-color: antiquewhite;
  border-radius: 10px;
  margin-bottom: 30px;
}
.indication{
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  width: 100%;
  color: black;
  font-size: 30px;
  text-align: center;
}
body{
  background-color: #1e1e1e;
}
.bonindices{
  font-size: 1.3rem;
}
.wrappper{
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.trait {
background-color: black;  
width: 100%;
  height: 2px;
}
.indicee{
  font-size: 2rem;
  font-weight: bolder;
  text-align: center;

}
.historiquemessage{
  background: radial-gradient(343px at 46.3% 47.5%, rgb(242, 242, 242) 0%, rgb(241, 241, 241) 72.9%);
  border-radius: 20px;
  width: 20vw;
  height: 40vh;
  justify-content: center;
  overflow-y: scroll;

}


.endgame{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background-color: black;
  color: white;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

}
.goodgame{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background-color: rgb(68, 255, 0);
  color: white;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

}

.notyourturn {
  position: absolute;
    background-color: #000000;
    opacity: 90%;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.parent{
  display: grid;
  width: 50%;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 20px;
    border: solid black 1px;
    padding: 1rem;
    position: relative;
    background-color: aliceblue;
}
.couleurdecarte{
 border-radius: 10px;
  display: flex;
  justify-content : center;
  align-items: center;
  background-color: aquamarine;
  height: 70px;
  width: 100%;
}

.texte{
  font-size: 1.3rem;
  color: black;
}
.Neutre{
background-color: #ECEBBD;}
.Noir{
  background-color: black;
  color: white;
}
.Noir .texte {
  color: white;
}

.Vert{
  background-color: #23c483;
}
.carte {
  float: left;
  width: 20%
}

.cart {
  width: 150px;
  height: 150px;
}
.case {
  width:30px;
  height:30px;
  float:left;
}

.case.Vert {
  background-color: #23c483;
  

}

.case.Neutre {
  background-color: orange;
}

.case.Noir {
  background-color: black;

}
</style>