<template>
  <div id="app-footer">
    <h4>Support</h4>
    <h4>About</h4>
    <h4>Contacts</h4>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#app-footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: start;
  margin-top: 10px;
}
h4 {
  margin: 8px;
}
</style>
