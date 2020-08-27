import Vue from 'vue'
 import {firebaseAuth} from 'boot/firebase'
 import {LocalStorage, Loading} from 'quasar'
import {showErrorMessage} from 'src/functions/function-show-error-message'

const state = { // where all data goes for tasks /app
loggedIn:false
   
}


const mutations = { // methods that change state directly

   setLoggedIn(state,value){
       state.loggedIn = value
   }

}

const actions = { // used to handle events and calls to server (then triggers mutatiosn to modify data )
registerUser({},payload){
    Loading.show()
    console.log(payload)
    firebaseAuth.createUserWithEmailAndPassword(payload.email,payload.password)
    .then(response => {
        console.log(response)
    })
    .catch(error=>{
       showErrorMessage(error.message)
       Loading.hide()
    })
},
loginUser({},payload){
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email,payload.password)
      .then(response => {
        console.log(response)
    })
    .catch(error=>{
       showErrorMessage(error.message)
       Loading.hide()
    })
},
logoutUser(){
    firebaseAuth.signOut()
},
handleAuthStateChange({commit}){
      Loading.hide()
    firebaseAuth.onAuthStateChanged(user =>{
     Loading.hide()
        if(user){
            //user signed in
             LocalStorage.set('loggedIn',true)
            commit('setLoggedIn',true);
            this.$router.push('/')
            
        }else{
             LocalStorage.set('loggedIn',false)
           commit('setLoggedIn',false);
           this.$router.replace('/auth')
        }
    })
}
}

const getters = { // methods to retreive information from state 
   

}

export default {
    namespaced:true, // allows us to have multiple vuex stores in our app
    state,
    mutations,
    actions,
    getters
}