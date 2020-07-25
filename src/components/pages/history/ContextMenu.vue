<template>
  <div
    @contextmenu.stop.prevent
    class="context-wrapper"
    v-if="options.visibility"
    :style="{'left':options.x+'px','top':options.y+'px'}"
  >
    <div class="contextmenu-list">
      <ul>
        <li
          class="submenu-item"
          v-for="item of menuItems"
          @click.stop="contextItemMethod(item, $event)"
          :key="item"
        >{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: ["изменить", "удалить", "отмена"],
      visible: false
    };
  },
  methods: {
    contextItemMethod(i, event) {
      switch (i) {
        case this.menuItems[0]:
          this.$emit("editCard", { type: true });
          return;

        case this.menuItems[1]:
          console.log("CASE 2");
          return;
        case this.menuItems[2]:
          this.$props.options.visibility = false;
          return;
        default:
          break;
      }
      // console.log(i);
      // console.log(event);
    }
  },
  props: ["options"],
  mounted() {}
};
</script>

<style scoped>
.context-wrapper {
  box-sizing: border-box;
  padding-top: 6px;
  padding-bottom: 2px;
  position: absolute;
  width: 100px;
  height: 80px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #3e3e3e;
  color: #fff;
  z-index: 1000;
}

.contextmenu-list {
  z-index: 1000;
}

.submenu-item {
  min-width: 95%;
  list-style: none;
  margin: 2px;
  text-align: center;
  font-size: 17px;
  z-index: 1000;
}
.submenu-item:hover {
  color: #08aef1;
}
</style>