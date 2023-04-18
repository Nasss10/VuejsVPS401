<script setup>

import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const route = useRoute()
const idPartie = ref()
const partie = ref()
const idUser = ref()


onMounted(async () => {
  idPartie.value = route.params.idgame
  idUser.value = route.params.iduser

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
  


  if (this.idUser == 1) {
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
  
  

    


  if (this.idUser == 2) {
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
          })
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
          })
  }





</script>

<template>
  <body>
    
  <h1>Bienvenue dans la partie {{ idPartie }}</h1>
<div class="wrappper">
  <div v-if="partie" class="cart">
    <p>Carte "indice"</p>
    <div v-for="mot in partie.motParties" :key="mot.id">
      <div v-if="idUser === '1'" :class="`case ${ mot.couleurJ1 }`">
        &nbsp;
      </div>
      <div v-else :class="`case ${ mot.couleurJ2 }`">
        &nbsp;
      </div>
    </div>
  </div>
  <div v-if="partie" class="parent">
    
    
    <div v-if="idUser == 1 && partie.tourduj == '2'" class="notyourturn"></div>

    <div v-if="idUser == 2 && partie.tourduj == '1'" class="notyourturn"></div>

    <div  v-for="(mot, index) in partie.motParties" @click="cartetrigger(index)" :key="mot.id">

      <div v-if="idUser === '1'" class="couleurdecarte" :class="`${mot.etatmot} ${mot.couleurJ1}`">
        <div v-if="mot.etatmot === 'trouver'" class="couleurdecarte">TROUVER</div>
        <div v-if="mot.etatmot === 'jeton'" class="couleurdecarte">Jeton</div>
        <div v-if="mot.etatmot === 'perdu'" class="endgame"><p>Partie Perdu vous avez trouver une carte noir</p> <button @click="perdregame">Finir Partie</button></div>
        <div v-if="isWinningJ1(partie)" class="goodgame"><p>Bien joué c'est gagné</p> <button @click="gagnergame">Finir Partie</button></div>



        <p class="texte">{{ mot.mot.mot }}</p> <!-- le premier mot est la boucle, le deuxième mot est la relation entre PartieMot et Mot, et le troisième mot est le champs dans mot -->
      </div>

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
<div v-if="partie" class="montxt">
  <div v-for="indice in partie.indices.slice().reverse()" :key="indice.id" class="bonindices">
    <p>  Voici votre indice : <span class="indice">{{indice.mot}}</span> </p>
  </div>
</div>



</div>

</div>        <!-- fin div wrapper -->

  

  
  
  <div v-if="idUser == 1 && partie.tourduj == '2'" >Ton pote est en train de deviner </div>
  <div v-if="idUser == 1 && partie.tourduj == '1'" >Veuillez attendre de recevoir l'indice pour jouer </div>
  <div v-if="idUser == 2 && partie.tourduj == '1'" >Ton pote est en train de deviner </div>
  <div v-if="idUser == 2 && partie.tourduj == '2'" >Attend l'indice et vasy devine mon sauce </div>



<div v-if="partie" class="montxt">
    <div v-if="idUser == 2 && partie.tourduj == '1'" >

  
</div>
</div>
<div v-if="partie" class="montxt">
    <div v-if="idUser == 1 && partie.tourduj == '2'" >

</div>
</div>
<div v-if="partie" class="montxt">
  <div v-if="idUser == 1 && partie.tourduj == '1'" >

  <button @click="passageTour">Fini de devinez akhy</button>
</div>

</div>

<div v-if="partie" class="montxt">
  <div v-if="idUser == 2 && partie.tourduj == '2'" >

  <button @click="passageTourj2">Fini de devinez akhy</button>
</div>


</div>
<div v-if="partie" class="montxt">

<div v-if="partie.tourpartie == 9" class="endgame" > Fin de partie 9 tours se sont écoulé</div>
</div>



<h2>Ajouter un indice</h2>
      <div>
        <label for="nom">Votre indice</label>
        <input type="text" id="mot" v-model="mot" placeholder="Indice(s) - 1"/>
      </div>
      
      <button @click="ajouter">Ajouter</button>
    
    

      
     


</body>
</template>

<style scoped>

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
  background-color: aqua;
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
    background-color: #0000004d;
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
  font-size: 1rem;
  color: blue;
}
.Neutre{
  background-color: orange;
}
.Noir{
  background-color: black;
  color: white;
}
.Vert{
  background-color: darkgreen;
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
  background-color: #00FF00;

}

.case.Neutre {
  background-color: orange;
}

.case.Noir {
  background-color: black;

}
</style>