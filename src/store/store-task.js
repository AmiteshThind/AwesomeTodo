import Vue from 'vue'
import {uid} from 'quasar'
const state = { // where all data goes for tasks /app
 tasks: {
     'ID1':{
       name:"Go to shop",
       completed:false,
       dueDate:'2020/09/06',
       dueTime: '18:40'
     },
     'ID2':{
       name:"Get food",
       completed:false,
       dueDate:'2020/10/06',
       dueTime: '12:40'
     },
    'ID3': {
       name:"Complete OSAP",
       completed:false,
       dueDate:'2020/07/23',
       dueTime: '15:43'
     }
    }
}

const mutations = { // methods that change state directly
updateTask(state,payload){
    Object.assign(state.tasks[payload.id],payload.updates)
},
deleteTask(state,id){
    console.log('delete');
        Vue.delete(state.tasks,id); //takesd object and key // we do this so it updates the dom and data, not just data
},
addTask(state,payload){
   Vue.set(state.tasks,payload.id,payload.task)
}
}

const actions = { // used to handle events and calls to server (then triggers mutatiosn to modify data )
    updateTask({commit}, payload){
        
        commit('updateTask',payload)//triggering mutation so we can mdoify data
    },
    deleteTask({commit},id){
        console.log(id)
        commit('deleteTask',id);
    } ,
    addTask({commit},task){
        let taskId = uid();
        let payload = {
            id:taskId,
            task:task
        }
        commit('addTask',payload)
    }
}

const getters = { // methods to retreive information from state 
    tasksTodo: (state)=>{
        let tasks = {}
        let keys = Object.keys(state.tasks)

        for(let key of keys){
            if(!state.tasks[key].completed){
                tasks[key] = state.tasks[key];
            }
        }
         
        return tasks;
    },
        tasksCompleted: (state)=>{
        let tasks = {}
        let keys = Object.keys(state.tasks)

        for(let key of keys){
            if(state.tasks[key].completed){
                tasks[key] = state.tasks[key];
            }
        }
         
        return tasks;
    }

}

export default {
    namespaced:true, // allows us to have multiple vuex stores in our app
    state,
    mutations,
    actions,
    getters
}