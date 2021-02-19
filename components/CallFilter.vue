<template>
  <v-card>
    <div class="pa-4">
      <v-select
        :items="countries"
        :label="sourceLabel"
        :value="source"
        @change="(value) => $emit('onSourceChange', value)"
      />

      <v-select
        :items="countries"
        :label="destinationLabel"
        :value="destination"
        @change="(value) => $emit('onDestinationChange', value)"
      />

      <v-checkbox
        v-for="(value, key) in labels"
        :key="key"
        v-model="filters"
        :label="value"
        :value="key"
        @change="(val) => $emit('onFilterChange', val)"
      />
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'CallFilter',
  model: {
    prop: 'filters',
    event: 'change',
  },
  props: {
    countries: {
      type: Array,
      required: true,
    },
    source: {
      type: [Object, null],
      default: () => null,
    },
    destination: {
      type: [Object, null],
      default: () => null,
    },
  },

  data() {
    return {
      sourceLabel: 'Звонящая сторона (Caller)',
      destinationLabel: 'Принимающая сторона (Calle)',

      labels: {
        all: 'Все',
        direct: 'Направленный',
        one: 'Один дополнительный узел',
        two: 'Два дополнительных узла',
      },
      filters: [],
    }
  },
}
</script>
