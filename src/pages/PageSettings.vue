<template>
<q-page padding class="my-font text-subtitle1">
    <q-list bordered padding class="q-mb-md">

      <q-item-label header class="text-h6">Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 24 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="show24HourTimeFormat"  />
        </q-item-section>
      </q-item>

       <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="showTasksInOneList"  />
        </q-item-section>
      </q-item>

    </q-list>
    <q-list bordered padding>

      <q-item-label header class="text-h6">More</q-item-label>

      <q-item to="/settings/help" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section side >
         <q-icon name="chevron_right" ></q-icon>
        </q-item-section>
      </q-item>


      <q-item @click="visitOurWebsite" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Visit Our Website</q-item-label>
        </q-item-section>
        <q-item-section side >
         <q-icon name="chevron_right" ></q-icon>
        </q-item-section>
      </q-item>



      <q-item @click="emailUs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Give us feedback</q-item-label>
        </q-item-section>
        <q-item-section side >
         <q-icon name="chevron_right" ></q-icon>
        </q-item-section>
      </q-item>


    </q-list>



</q-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {openURL} from 'quasar'
export default {
 data(){
   return{
     
   }
 },
 computed:{
   ...mapGetters('settings',['settings']),
   show24HourTimeFormat:{
     get(){
       return this.settings.show24HourTimeFormat
     },
     set(value){
       this.setShow24HourTimeFormat(value)
     }
   },
    showTasksInOneList:{
     get(){
       return this.settings.showTasksInOneList
     },
     set(value){
       this.setShowTasksInOneList(value)
     }
   }
 },
 methods:{
   ...mapActions('settings',['setShow24HourTimeFormat','setShowTasksInOneList']),
   visitOurWebsite(){
     openURL('https://operation-void.herokuapp.com/')
   },
   emailUs(){
     window.location.href = 'mailto:thindamitesh@gmail.com?subject=AwesomeTodo Feedback'
   }
 }
}
</script>
