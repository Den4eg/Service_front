<template>
  <div class="new-ticket-main" :class="!ticketPosition.hiden?'new-ticket-main__hiden':''">
    <div
      @click="toggleTicket"
      class="support-view-modifier"
      :class="ticketPosition.hiden ? 'support-view-modifier-hover' : ''"
    ></div>

    <div class="wraper">
      <div class="input-wraper">
        <input type="text" placeholder="Поиск . . ." v-model="searchCar" />
      </div>
      <div class="scroll-wraper">
        <div class="car-box-wraper" v-for="car in filterCars" :key="car.carNumber">
          <div class="car-box">
            <div class="car-data">
              <div class="car-mark">{{ car.carMark }}</div>
              <div class="car-number">{{ car.carNumber }}</div>
            </div>
            <div class="car-owner-data">
              <div class="car-owner-duty">{{ car.carOwnerDuty }}</div>
              <div class="car-owner-name">{{ car.carOwner }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="appendCar" v-if="userRights">
        <button>Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticketPosition: {
        hiden: true
      },
      searchCar: ""
    };
  },
  methods: {
    toggleTicket() {
      this.ticketPosition.hiden = !this.ticketPosition.hiden;
      setTimeout(() => (this.searchCar = ""), 500);
    }
  },
  computed: {
    userRights: function() {
      return this.$store.getters.getUserProperties >= 9;
    },
    transportArr() {
      return this.$store.getters.employeeCars;
    },
    filterCars() {
      return this.transportArr.filter(arrayItem => {
        return (
          arrayItem.carNumber
            .replace(/\s/g, "")
            .indexOf(this.searchCar.replace(/\s/g, "").toUpperCase()) !== -1
        );
      });
    }
  },
  beforeCreate() {}
};
</script>

<style scoped>
.new-ticket-main {
  background-color: #333;
  position: fixed;
  top: 70px;
  left: -290px;
  box-shadow: -4px 4px 7px #3d3d3d;
  width: 290px;
  height: 500px;
  border-radius: 3px;
  transition: ease-out 0.4s;
  z-index: 11;
}

.wraper {
  position: relative;
  display: grid;
  grid-gap: 5px;
  justify-content: stretch;
  align-content: start;
  height: 100%;
  width: 290px;
  box-sizing: border-box;
  background-color: #c9c9c9;
  border-radius: 3px;
  padding-top: 15px;
  padding-bottom: 5px;
  padding-left: 30px;
  overflow: hidden;
}
.support-view-modifier {
  position: absolute;
  background-color: #c9c9c9;
  width: 120px;
  height: 170px;
  top: 160px;
  box-shadow: 1px 1px 4px #3e3e3e;
  right: -35px;
  border-radius: 0 12% 12% 0;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  transition: all 0.2s;
}
.support-view-modifier-hover:hover {
  transform: translateX(2px);
}

.support-view-modifier::after {
  content: "Транспорт";
  color: #333;
  position: absolute;
  font-size: 14px;
  font-weight: 600;
  width: 10px;
  word-wrap: break-word;
  padding: 12px 15px 13px 0;
}

.new-ticket-main__hiden {
  transform: translateX(296px);
}

.scroll-wraper {
  overflow: auto;
  width: 257px;
  scrollbar-color: #3e3e3e #6868688e;
  scrollbar-width: thin;
}

.scroll-wraper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px #00000098;
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

/*  car label  */
.car-box-wraper {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
  text-align: center;
  padding-bottom: 6px;
  /* background-color: #fff; */
}
.car-box {
  display: grid;
  grid-template-columns: 1fr 1.6fr 0.1fr;
  align-items: center;
  grid-gap: 5px;
  position: relative;
  grid-auto-flow: column;
  padding-bottom: 10px;
  padding: 5px;
  color: #000;
}
.car-box::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 3px;
  width: 240px;
  height: 2px;
  background-color: #000;
}
.car-number {
  font-weight: 600;
}
.car-owner-data,
.car-data {
  display: grid;
  grid-gap: 5px;
  padding-right: 5px;
}
.car-data {
  grid-gap: 8px;
  white-space: nowrap;
}

/*  search field  */
input {
  width: 240px;
  padding: 0;
  height: 30px;
  font-size: 0.9rem;
  font-family: "Roboto-mono", sans-serif;
  text-align: center;
  border-style: none;
  border: none;
  line-break: initial;
  outline: none;
  background-color: #d6d5d5 !important;
  border-right: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
  border-radius: 2px;
  box-shadow: 3px 3px 3px rgba(7, 7, 7, 0.6);
}
input:focus {
  box-shadow: 0 0 3px 2px #08aef1;
}

input::placeholder {
  color: #858585;
  font-family: "Roboto-mono", sans-serif;
  font-weight: 400;
}
input:disabled {
  color: black;
}

.input-bold {
  font-weight: 600;
}
.input-wraper {
  position: relative;
  margin-bottom: 5px;
}

.carsOpacity-enter-active,
.carsOpacity-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.carsOpacity-enter {
  opacity: 1;
}
.carsOpacity-leave-to {
  opacity: 0;
}
</style>
