<template>
  <transition-group name="newT">
    <ticket :ticketValues="ticket" v-for="ticket in dbValues" :key="ticket.ticketNumber"></ticket>
  </transition-group>
</template>
<script>
import Ticket from "./contentModules/Ticket.vue";

export default {
  components: {
    ticket: Ticket
  },
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    dbValues() {
      return this.$store.getters.transportOnTer;
    }
  }
};
</script>
<style scoped>
.newT-move {
  transition: all 1s;
}

.newT-leave-active {
  transition: transform 1s ease;
}
.newT-enter-active {
  transition: transform 1s cubic-bezier(0.3, 0.2, 0.3, 1.08);
}
.newT-enter,
.newT-leave-to {
  transform: translateX(-1000px);
}
</style>