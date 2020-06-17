<template>
  <div class="main-history">
    <div class="history-sort"></div>
    <div class="cards-wrapper">
      <div class="history-cards">
        <div class="car" v-for="car in transport" :key="car.ticketNumber">
          <div class="car-tittle">
            <div class="car-tittle__date-block">
              <div class="car-tittle__date">
                <div class="date__ticket-number">№ {{car.ticketNumber}}</div>
                <div class="date__incoming-date">{{car.incomingDate}}</div>
              </div>
              <div class="car-tittle__date">
                <div class="date__incoming-time">{{car.incomingTime}}</div>
                <div class="car-tittle__operation">{{car.operation?'Приход':'Отгруз'}}</div>
                <div class="date__outgoing-time">{{car.outgoingTime || ''}}</div>
              </div>
            </div>
          </div>
          <div class="car-docs">
            <div class="car-doc__main">
              <div class="car-docs__car-mark">{{car.carMark}}</div>
              <div class="car-docs__car-number">{{car.carNumber}}</div>
            </div>
            <div class="car-docs__trailer-number">{{car.trailerNumber}}</div>
          </div>
          <div class="car-driver">
            <div class="car-driver__name">{{car.driverName}}</div>
            <div class="car-driver__docs">
              <div class="driver-docs__number">{{car.driverDocs}}</div>
              <div class="driver-docs__div-code">{{car.divisionCode}}</div>
            </div>
            <div class="car-driver__organisation">{{car.organisation}}</div>
            <div class="car-driver__phone">{{car.phone}}</div>
          </div>

          <div class="car-btn"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
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
  min-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 232px));
  justify-content: center;
  grid-gap: 10px;
  box-sizing: content-box;
  width: fit-content;
}

.car {
  width: 200px;
  height: 250px;
  padding: 5px 15px 0 15px;
  border: 2px solid #3e3e3e;
  border-radius: 3px;
  box-shadow: 4px 4px 9px 1px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-items: baseline;
}

.car-tittle__date {
  display: flex;
  justify-content: space-between;
}

.car-tittle {
  display: flex;
  flex-direction: column;
}
</style>
