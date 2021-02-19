<template>
  <v-card>
    <v-container class="d-flex flex-wrap align-center py-8 px-4">
      <div>
        <v-avatar color="orange darken-2" size="48">
          <span class="white--text"> {{ totalPrice | dollar }} </span>
        </v-avatar>
      </div>

      <v-spacer />

      <div class="d-flex align-center pt-8">
        <div v-for="(item, index) in routes" :key="index">
          <span
            v-if="index === 0"
            class="rounded pa-3 text-center blue-grey darken-1 white--text"
          >
            {{ item.src }}
          </span>

          <CallArrow :price="item.price" :label="item.company" />

          <span class="rounded pa-3 text-center blue-grey darken-1 white--text"
            >{{ item.des }}
          </span>
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'CallItem',
  props: {
    routes: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    totalPrice() {
      return this.routes
        .map((route) => Number(route.price))
        .reduce((accumulator, currentValue) => accumulator + currentValue)
    },
  },
}
</script>
