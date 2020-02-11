<template>
  <div class="main">
    <div class="scroll-wraper">
      <div class="wrap-block">
        <app-content class="app-content"></app-content>
      </div>
    </div>
    <app-sidebar v-if="test" class="app-sidebar"></app-sidebar>
  </div>
</template>

<script>
import Content from "../Content.vue";
import Sidebar from "../Sidebar.vue";

export default {
  components: {
    appSidebar: Sidebar,
    appContent: Content
  },
  data: function() {
    return {
      test: true
    };
  }
};
</script>

<style scoped>
.scroll-wraper {
  position: relative;
  overflow-y: scroll;
}

.scroll-wraper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.596);
  border-radius: 5px;
  background-color: #f5f5f5;
}

.scroll-wraper::-webkit-scrollbar {
  padding: 5px;
  width: 5px;
  border-radius: 9px;
  background-color: #f5f5f5;
}

.scroll-wraper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #3e3e3e;
}

.wrap-block {
  width: 99.9%;
  position: absolute;
}
</style>
