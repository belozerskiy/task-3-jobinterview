<template>
  <div class="arrow d-inline-flex justify-center">
    <v-chip class="orange darken-2 white--text max-width arrow__chip">
      <strong>{{ label }} {{ price | dollar }}</strong>
    </v-chip>
    <v-icon color="grey darken-2" size="24" class="mx-8">
      mdi-arrow-right
    </v-icon>
  </div>
</template>

<script>
export default {
  name: 'CallArrow',
  props: {
    label: {
      type: String,
      required: true,
    },
    price: {
      type: [Number, String],
      required: true,
    },
  },
}
</script>
<style scoped>
.arrow {
  position: relative;
}

.arrow__chip {
  position: absolute;
  max-width: initial;
  top: -48px;
}
</style>
