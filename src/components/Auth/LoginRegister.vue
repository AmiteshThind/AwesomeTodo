<template>
<form @submit.prevent="submitForm" class="my-font">
    <div class="row q-mb-md">
  <q-banner class="bg-grey-4 col">
      <template v-slot:avatar>
        <q-icon name="account_circle" color="primary" />
      </template>
      <div v-if="tab=='register'">
        Register to access your Todos anywhere!
      </div>
      <div v-else>
          Login to access your Todos anywhere!
      </div>
    </q-banner>
    </div>
    <div class="row q-mb-md">
        <q-input ref="email" :rules="[ val => isValidEmailAddress(val) || 'Please enter valid email address']" lazy-rules class="col" outlined v-model="formData.email" label="Email" />
    </div>
        <div class="row q-mb-md">
        <q-input ref="password" :rules="[ val => val.length >= 6 || 'Please use minimum 6 characters']" lazy-rules class="col" outlined v-model="formData.password" type="password"  label="Password" />
    </div>
    <div class="row">
        <q-space/> 
        <q-btn v-if="tab=='register'" type="submit" color="primary" label="Register" />
         <q-btn v-else type="submit" color="primary" label="Login" />

    </div>
        </form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return{
        formData:{
        email:'',
        password:''
    }
        }
    },
    props:['tab'],
    methods:{
        ...mapActions('auth',['registerUser','loginUser']),
        submitForm(){
            this.$refs.email.validate();
            this.$refs.password.validate();

            if(!this.$refs.password.hasError && !this.$refs.email.hasError){
                if(this.tab=='login'){
                    this.loginUser(this.formData)
                }else{
                    console.log('register')
                    this.registerUser(this.formData)
                }
            }
        },
        isValidEmailAddress(email){
             const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }
  
}
</script>

<style>

</style>