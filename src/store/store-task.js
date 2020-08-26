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
    },
    search:'',
    sort:'name'
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
},
setSearch(state,value){
    state.search = value; 
},
setSort(state,value){
    state.sort = value; 
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
    },
    setSearch({commit},value){
        commit('setSearch',value)
    },
    setSort({commit},value){
        commit('setSort',value)
    }
}

const getters = { // methods to retreive information from state 
    tasksSorted:(state)=>{
        let tasksSorted = {}
        let keysOrdered = Object.keys(state.tasks);

        keysOrdered.sort((a,b) =>{
            let taskAprop = state.tasks[a][state.sort].toLowerCase(),
            taskBprop = state.tasks[b][state.sort].toLowerCase()


            if(taskAprop>taskBprop) return 1
            else if(taskAprop<taskBprop) return -1
            else return 0
        })

        keysOrdered.forEach((key)=>{
            tasksSorted[key]  = state.tasks[key]
        })

        return tasksSorted
    },
        tasksFiltered:(state,getters)=>{
        let tasksFiltered = {}
            let tasksSorted = getters.tasksSorted
        if(state.search){
            Object.keys(tasksSorted).forEach(function(key){
                let task = tasksSorted[key]
                
                if(task.name.toLowerCase().includes(state.search.toLowerCase())){
                    tasksFiltered[key] = task;
                }
            })
            return tasksFiltered
        }
            return tasksSorted
        

    },
    tasksTodo: (state,getters)=>{
        let tasksFiltered = getters.tasksFiltered;
        let tasks = {}
        let keys = Object.keys(tasksFiltered)

        for(let key of keys){
            if(!tasksFiltered[key].completed){
                tasks[key] = tasksFiltered[key];
            }
        }
         
        return tasks;
    },
        tasksCompleted: (state,getters)=>{
        let tasksFiltered = getters.tasksFiltered;
        let tasks = {}
        let keys = Object.keys(tasksFiltered)

        for(let key of keys){
            if(tasksFiltered[key].completed){
                tasks[key] = tasksFiltered[key];
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