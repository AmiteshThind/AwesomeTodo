import Vue from 'vue'
import {uid, Notify} from 'quasar'
import {firebaseDb, firebaseAuth} from 'boot/firebase'
import {showErrorMessage} from 'src/functions/function-show-error-message'
const state = { // where all data goes for tasks /app
 tasks: {
    //  'ID1':{
    //    name:"Go to shop",
    //    completed:false,
    //    dueDate:'2020/09/06',
    //    dueTime: '18:40'
    //  },
    //  'ID2':{
    //    name:"Get food",
    //    completed:false,
    //    dueDate:'2020/10/06',
    //    dueTime: '12:40'
    //  },
    // 'ID3': {
    //    name:"Complete OSAP",
    //    completed:false,
    //    dueDate:'2020/07/23',
    //    dueTime: '15:43'
    //  }
    },
    search:'',
    sort:'name',
    tasksDownloaded:false
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
},
setTasksDownloaded(state,value){
    state.tasksDownloaded = value; 
},
clearData(state){
    state.tasks = {}
   }
}

const actions = { // used to handle events and calls to server (then triggers mutatiosn to modify data )
    updateTask({dispatch}, payload){
       
        dispatch('fbUpdateTask',payload)//triggering mutation so we can mdoify data
    },
    deleteTask({dispatch},id){
        console.log(id)
        dispatch('fbDeleteTask',id);
    } ,
    addTask({dispatch},task){
        let taskId = uid();
        let payload = {
            id:taskId,
            task:task
        }
        dispatch('fbAddTask',payload)
    },
    setSearch({commit},value){
        commit('setSearch',value)
    },
    setSort({commit},value){
        commit('setSort',value)
    },
    clearData({commit}){
        commit('clearData')
    },
    fbReadData({commit}){
       let userTasks =  firebaseDb.ref('tasks/' + firebaseAuth.currentUser.uid)

        //initial check for data avaiblble 
        userTasks.once('value',()=>{
            commit('setTasksDownloaded',true)
        }, error =>{
            showErrorMessage(error.message)
            this.$router.replace('/auth')
        })


       //child added
       userTasks.on('child_added',snapshot =>{ // for every child in userTasks 
           console.log(snapshot)
           let task = snapshot.val();

           let payload = {
               id:snapshot.key,
               task:task
           }

           commit('addTask',payload)
       })

       //child changed

              userTasks.on('child_changed',snapshot =>{ // for every child in userTasks 
           let task = snapshot.val();
           let payload = {
               id:snapshot.key,
               updates:task
           }

           commit('updateTask',payload)
       })


       // child removed

              userTasks.on('child_removed',snapshot =>{ // for every child in userTasks 
           console.log(snapshot)
            let taskId = snapshot.key
            commit('deleteTask',taskId)

           
       })


    },

    fbAddTask({},payload){
        let taskRef = firebaseDb.ref('tasks/'+firebaseAuth.currentUser.uid+'/'+payload.id)
         
        taskRef.set(payload.task, error =>{
            if(error){
                showErrorMessage(error.message)
            }else{
               
            Notify.create({
                message: 'Task Added',
                color:'positive',
                timeout:1000,
                 
                
            })
            }
        })
        
    },

     fbUpdateTask({},payload){
         console.log('here')
        let taskRef = firebaseDb.ref('tasks/'+firebaseAuth.currentUser.uid+'/'+payload.id)

        taskRef.update(payload.updates,(error)=>{
            if(error){
                showErrorMessage(error.message)
            }else{
               let keys = Object.keys(payload.updates)
               if(!(keys.includes('completed')&& keys.length==1)){
                Notify.create({
                    message: 'Task Updated',
                    color:'accent',
                     timeout:1000,
                    
                })
            }
        }
        })
    },
      fbDeleteTask({},id){
        let taskRef = firebaseDb.ref('tasks/'+firebaseAuth.currentUser.uid+'/'+id)

        taskRef.remove((error)=>{
            if(error){
                showErrorMessage(error.message)
            }
            else{
               
            Notify.create({
                message: 'Task Deleted',
                color:'secondary',
                timeout:1000
            })
            }
        })
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