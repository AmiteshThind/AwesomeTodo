<template>
  <q-page class="q-pa-md" >
 <q-list separator bordered>
      <q-item  
       :class="{'bg-green-3':task.completed, 'bg-amber-1 ':!task.completed}"
        v-for="task in tasks"
        clickable
        @click="task.completed=!task.completed"
        :key = "task.id">
        <q-item-section side top  >
          <q-checkbox v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{'text-strikethrough': task.completed}">{{task.name}}</q-item-label>
        </q-item-section>
        <q-item-section side >
      <div class="row">
        <div class="column justify-center">
          <q-icon  class="q-mr-sm"  name="event" size="20px" />
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end" >{{task.dueDate}}</q-item-label>
          <small><q-item-label class="row justify-end" caption >{{task.dueTime}}</q-item-label></small>
        </div>
      </div>
        </q-item-section>
          
       
        
      </q-item>
 </q-list>
  
  </q-page>
</template>

<script>
export default {
 data:function(){
   return{
     tasks:[{
       id:1,
       name:"Go to shop",
       completed:false,
       dueDate:'2020/09/06',
       dueTime: '18:40'
     },
     {
       id:2,
       name:"Get food",
       completed:false,
       dueDate:'2020/10/06',
       dueTime: '12:40'
     },
     {
       id:3,
       name:"Complete OSAP",
       completed:false,
       dueDate:'2020/07/23',
       dueTime: '15:43'
     }]
   }
 }
}
</script>
