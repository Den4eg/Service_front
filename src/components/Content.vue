<template>
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
</template>
<script>
import Ticket from './contentModules/Ticket.vue';

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
</style>
