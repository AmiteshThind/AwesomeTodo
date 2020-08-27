import Vue from 'vue'
import {uid} from 'quasar'

import {LocalStorage} from 'quasar'

const state = { // where all data goes for tasks /app
 settings: {
   show24HourTimeFormat:false,
   showTasksInOneList:false,
}
}

const mutations = { // methods that change state directly

    setShow24HourTimeFormat(state,value){
        state.settings.show24HourTimeFormat = value;
    },
    setShowTasksInOneList(state,value){
        state.settings.showTasksInOneList = value; 
    },
    setSettings(state,settings){
        Object.assign(state.settings,settings)
    }

}

const actions = { // used to handle events and calls to server (then triggers mutatiosn to modify data )
    setShow24HourTimeFormat({commit,dispatch},value){
        commit('setShow24HourTimeFormat',value)
        dispatch('saveSettings')

    },
    setShowTasksInOneList({commit,dispatch},value){
         commit('setShowTasksInOneList',value)
         dispatch('saveSettings')
    },
    saveSettings({state}){
        LocalStorage.set('settings',state.settings)
    },
    getSettings({commit}){
      let settings =  LocalStorage.getItem('settings');
      if(settings){
          commit('setSettings',settings)
      }
    }
}

const getters = { // methods to retreive information from state 
  settings:state =>{
      return state.settings
  }

}

export default {
    namespaced:true, // allows us to have multiple vuex stores in our app
    state,
    mutations,
    actions,
    getters
}