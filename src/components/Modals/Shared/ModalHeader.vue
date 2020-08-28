<template>
      <q-card-section class="row my-font">
      <div class="text-h6 column"><slot></slot></div>
      <q-btn
        v-close-popup
        dense
        class="column absolute-right q-ma-md"
        flat
        round
        color="secondary"
        icon="cancel"
      />
    </q-card-section>
</template>

<script>
export default {

}
</script>

<style>

</style>