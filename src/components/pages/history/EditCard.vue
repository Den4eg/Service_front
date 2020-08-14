<template>
  <div class="wrap" @contextmenu.prevent v-if="editStatus">
    <h1>Редактирование</h1>
    <div class="editor-date">
      <div class="number-title">Номер пропуска:</div>
      <div class="number">{{data.ticketNumber}}</div>
      <div class="date-title">Дата въезда</div>
      <div class="number">{{data.incomingDate}}</div>
    </div>
    <div class="edit-buttons"></div>
    <pre>
      {{data}}
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeStatus() {
      this.$emit("changeEditStatus");
    }
  },
  computed: {
    editStatus() {
      return Object.keys(this.data).length > 0;
    }
  },
  props: ["data"]
};
</script>

<style scoped>
.wrap {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.973);
  color: #fff;
  /* left: 0;
  right: 0;
  top: 0;
  bottom: 0; */
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: center;
  align-items: center;
  align-self: center;
  z-index: 3000;
}

.editor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 8px;
  justify-items: center;
}
</style>