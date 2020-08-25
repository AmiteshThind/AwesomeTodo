<template>
     <div class="row q-mb-sm">
          <q-input
            class="col"
            v-if="dueDate"
            outlined
            standout="bg-amber-1 "
            label="Due Time"
            :value="dueTime"
            @input="$emit('update:dueTime',$event)"
          >
            <template v-slot:append>
              <q-icon
                v-if="dueTime"
                @click="dueTime = '' "
                name="cancel"
                class="cursor-pointer"
              />
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time :value="dueTime"  @input="$emit('update:dueTime',$event)" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
</template>

<script>
export default {
 props:['dueTime','dueDate']
}
</script>

<style>

</style>