<template>
  <div>
    <b-table striped hover :items="values"></b-table>
  </div>
</template>

<script>
export default {
  props: {
    values: Array,
  },
}
</script>

<style>

</style>
