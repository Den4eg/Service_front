<template>
  <transition-group name="newT" tag="div">
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
      return this.$store.getters.allTransportToday
        .filter(item => item.onTer)
        .reverse();
    }
  }
};
</script>
<style scoped>
.newT-move {
  transition: 1s all 0.6s;
}

.newT-leave-active {
  animation: tested reverse;
  animation-duration: 0.7s;
  position: absolute;
}
.newT-leave-to,
.newT-enter-to,
.newT-enter {
  opacity: 0;
}
.newT-enter-active {
  animation: tested;
  animation-duration: 0.6s;
  animation-delay: 0.8s;
}
@keyframes tested {
  0% {
    left: -300px;
    opacity: 0;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}
</style>
