<template>
  <div class="floorplants">
    <component-table></component-table>
  </div>
</template>

<script>
  import Table from './components/Table.vue'

  export default {
    components: {'component-table': Table}
  }
</script>
