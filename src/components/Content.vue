<template>
<<<<<<< HEAD
  <transition-group name="newT" tag="div">
    <ticket :ticketValues="ticket" v-for="ticket in dbValues" :key="ticket.ticketNumber"></ticket>
  </transition-group>
=======
    <transition-group
        name="newT"
        enter-active-class="animated bounceInLeft slow"
        tag="div"
    >
        <ticket
            :ticketValues="ticket"
            v-for="ticket in dbValues"
            :key="ticket.ticketNumber"
        ></ticket>
    </transition-group>
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
</template>
<script>
import Ticket from './contentModules/Ticket.vue';

export default {
<<<<<<< HEAD
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
=======
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
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
    }
};
</script>
<style scoped>
.newT-move {
<<<<<<< HEAD
  transition: 1s all 400ms;
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
=======
    transition: 0.8s all 0.4s;
}
/* .newT-enter-active {
    transition: all 1s ease 0.8s;
}
.newT-leave-active {
    transition: all 1s;
    position: absolute;
}

.newT-leave-to {
    transform: translateX(-200px);
    opacity: 0;
}
.newT-enter {
    transform: translateX(-200px);
    opacity: 0;
} */
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
</style>
