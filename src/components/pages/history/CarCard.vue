<template>
  <div class="animation-wraper" @click="rotateCard" @contextmenu.prevent="testContext($event)">
    <context-menu class="context-menu-component" :options="contextMenuOptions"></context-menu>
    <div class="card-front" :class="side?'card-front__action':''">
      <div class="car-tittle">
        <div class="car-tittle__date-block">
          <div class="car-tittle__date">
            <div class="date__ticket-number">№ {{cardData.ticketNumber}}</div>
            <div class="date__incoming-date">{{cardData.incomingDate}}</div>
          </div>
          <div class="car-tittle__date2">
            <div class="date__incoming-time">{{cardData.incomingTime}}</div>
            <div class="car-tittle__operation">{{cardData.operation?'Приход':'Отгруз'}}</div>
            <div class="date__outgoing-time">{{cardData.outgoingTime || ''}}</div>
          </div>
        </div>
      </div>
      <hr />
      <div class="car-data">
        <div class="car-doc__main">
          <div class="car-docs__car-mark">{{cardData.carMark}}</div>
          <div class="car-docs__car-number">{{cardData.carNumber}}</div>
        </div>
      </div>
      <hr />
      <div class="car-driver">
        <div class="car-driver__organisation">{{cardData.organisation}}</div>

        <div class="car-driver__name">{{cardData.driverName}}</div>
        <div class="car-driver__docs">{{cardData.driverDocs}}</div>
        <hr />
        <div class="car-driver__phone">
          <span>{{cardData.phone?'Тел.': '- - - -'}}</span>
          {{cardData.phone}}
        </div>
      </div>

      <div
        class="car-status"
        :class="cardData.onTer?'on-ter':'not-on-ter'"
        :title="cardData.onTer?'Не выехал':'Выехал'"
      ></div>
    </div>
    <div class="card-back" v-if="side" :class="side?'card-back__action':''">
      <div class="back_tittle">
        <div class="back_date__ticket-number">№ {{cardData.ticketNumber}}</div>
        <div class="back_car-tittle__operation">{{cardData.operation?'Приход':'Отгруз'}}</div>
      </div>
      <div class="car-docs__car-number">{{cardData.carNumber}}</div>
      <hr />
      <div class="car-driver__name">{{cardData.driverName}}</div>
      <hr />
      <div class="back_car-driver__organisation">{{cardData.organisation}}</div>
      <div class="price-docs" v-if="!cardData.operation">
        <div class="price-docs__tittle">Номера пропусков:</div>
        <div class="price-docs__list">
          <div
            class="price-docs__item"
            v-for="(num, index) of cardData.documents"
            :key="index"
          >{{num}}</div>
        </div>
      </div>
      <div class="fill" v-else>Документов на приход нет</div>
      <div
        class="car-status__back"
        :class="cardData.onTer?'on-ter__back':'not-on-ter__back'"
        :title="cardData.onTer?'Не выехал':'Выехал'"
      ></div>
    </div>
  </div>
</template>

<script>
import contextMenu from "./ContextMenu.vue";
export default {
  components: {
    contextMenu
  },
  data() {
    return {
      side: false,
      contextMenuOptions: {
        visibility: false,
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    rotateCard() {
      if (this.contextMenuOptions.visibility) {
        this.contextMenuOptions.visibility = false;
        return;
      }
      this.side = !this.side;
    },
    testContext(e) {
      this.contextMenuOptions.visibility = true;
      this.contextMenuOptions.x = e.layerX;
      this.contextMenuOptions.y = e.layerY;
      // console.log(e);
      // console.log(e.layerX, "x");
      // console.log(e.layerY, "y");

      console.log(this.contextMenuOptions, "test context");
    }
  },
  props: ["cardData"]
};
</script>

<style scoped>
.animation-wraper {
  cursor: default;
  user-select: none;
  position: relative;
  transform-style: preserve-3d;
  perspective: 700px;
}

.context-menu-component {
  position: absolute;
  z-index: 1000;
}

.card-front {
  transition: 0.8s cubic-bezier(0.83, -0.4, 0.38, 1.44);
  background: #e8e8e8;
  position: relative;
  width: 240px;
  height: 320px;
  padding: 5px 15px 8px 15px;
  border: 2px solid #3e3e3e;
  border-radius: 3px;
  box-shadow: 4px 4px 9px 1px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-items: baseline;
  backface-visibility: hidden;
  z-index: 2;
}

.card-back {
  transition: 0.8s cubic-bezier(0.83, -0.4, 0.38, 1.44);
  position: absolute;
  background: #e8e8e8;
  overflow: hidden;
  top: 0;
  width: 240px;
  height: 320px;
  padding: 5px 15px 8px 15px;
  border: 2px solid #3e3e3e;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  justify-items: baseline;
  transform: rotateY(180deg);
}
/* animation support classes */
.card-front__action {
  transform: rotateY(-180deg);
}

.card-back__action {
  transform: rotateY(0deg);
  z-index: 1;
  box-shadow: 4px 4px 9px 1px rgba(0, 0, 0, 0.7);
}
/* animation support classes end */

/* Front card */
.car-tittle {
  display: flex;
  flex-direction: column;
}

.car-tittle__date {
  display: flex;
  justify-content: space-between;
  height: 22px;
  padding-top: 5px;
}

.date__incoming-date {
  font-weight: bold;
}

.car-tittle__date2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 16px;
  font-weight: bold;
}

.date__incoming-time {
  justify-self: start;
}

.car-tittle__operation {
  justify-self: center;
  font-weight: normal;
}

.date__outgoing-time {
  justify-self: end;
}

.car-data {
  line-height: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.car-doc__main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.car-docs__car-number {
  align-self: center;
  font-size: 18px;
  font-weight: bold;
}

.car-driver {
  display: flex;
  flex-direction: column;
}

.car-driver__organisation {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 5px;
}

.car-driver__name {
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  margin-bottom: 5px;
}

.car-driver__docs {
  font-size: 18px;
  font-weight: bold;
  align-self: flex-end;
  margin-bottom: 5px;
  margin-top: 5px;
}

.car-driver__phone {
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  font-size: 18px;
  margin-top: 5px;
}

.car-driver__phone > span {
  font-weight: normal;
}

/* Front card end */

/* Back card  */
.back_tittle {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  height: 24px;
  margin-top: 6px;
}

.back_car-tittle__operation {
  font-weight: bold;
}

.back_car-driver__organisation {
  align-self: center;
  font-size: 18px;
  font-weight: bold;
}

.price-docs {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 10px;

  position: relative;
  overflow-y: auto;
}

.price-docs::-webkit-scrollbar-track {
  box-shadow: inset 0 0 7px #00000098;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.price-docs::-webkit-scrollbar {
  width: 4px;
  border-radius: 9px;
  background-color: #f5f5f5;
}

.price-docs::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #3e3e3e;
}

.price-docs__tittle {
  align-self: center;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.price-docs__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto, 22px);
}

.price-docs__item {
  font-size: 1rem;
  line-height: 1.4rem;
  justify-self: center;
  font-style: italic;
}

.fill {
  margin-top: 20px;
  text-align: center;
  color: #00000098;
}

/* Back card end */

/* Terr status */
.car-status {
  position: absolute;
  right: 26px;
  bottom: 0;
  width: 4px;
  height: 4px;
}

.on-ter::after {
  content: "";
  position: absolute;
  bottom: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid rgba(233, 8, 241, 0.5);
  border-top: 15px solid transparent;
  border-bottom: 15px solid rgba(233, 8, 241, 0.5);
}

.not-on-ter::after {
  content: "";
  position: absolute;
  bottom: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid #2ab6efb2;
  border-top: 15px solid transparent;
  border-bottom: 15px solid #2ab7efb2;
}

.car-status__back {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 4px;
  height: 4px;
}

.on-ter__back::after {
  content: "";
  position: absolute;
  bottom: 0;
  border-left: 15px solid rgba(233, 8, 241, 0.5);
  border-right: 15px solid transparent;
  border-top: 15px solid transparent;
  border-bottom: 15px solid rgba(233, 8, 241, 0.5);
}

.not-on-ter__back::after {
  content: "";
  position: absolute;
  bottom: 0;
  border-left: 15px solid #2ab6efb2;
  border-right: 15px solid transparent;
  border-top: 15px solid transparent;
  border-bottom: 15px solid #2ab7efb2;
}

/* Terr status end */
</style>