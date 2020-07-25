<template>
  <div class="main-history">
    <edit-card :data="editTicket" @changeEditStatus="editTicket = {}"></edit-card>
    <div class="history-sort"></div>
    <div class="cards-wrapper">
      <div class="history-cards">
        <div class="car-component" v-for="car in transport" v-bind:key="car.ticketNumber">
          <car-card v-bind:cardData="car" @editCard2="test(car)"></car-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import CarCard from "./CarCard";
import editCard from "./EditCard";
export default {
  components: { CarCard, editCard },
  data() {
    return {
      editTicket: {}
    };
  },
  methods: {
    test(val) {
      this.$store.dispatch("UPDATE_TICKET", val.ticketNumber).then(el => {
        let [ticket] = el;
        this.editTicket = ticket;
      });
    }
  },

  computed: {
    transport() {
      const copyArray = [...this.$store.getters.allTransportToday];
      return copyArray.sort((car1, car2) => {
        if ((car1.onTer === car2.onTer) === true) {
          return 0;
        }
        if (car1.onTer !== false && car2.onTer === false) {
          return 1;
        }
      });
    }
  },
  created() {
    // console.log(this.transport);
  }
};
</script>

<style scoped>
.main-history {
  position: relative;
  grid-area: main;
  margin-top: 10px;
  overflow: visible;
  width: 88%;
  justify-self: center;
}

.cards-wrapper {
  position: relative;
}

.history-cards {
  perspective: 1500;
  min-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 272px));
  justify-content: center;
  grid-gap: 10px;
  box-sizing: content-box;
  width: fit-content;
}
</style>
