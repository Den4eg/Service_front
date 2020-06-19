<template>
  <div class="animation-wraper" @click="side = !side">
    <transition name="card-rotate">
      <div class="card-fasad" v-if="side">
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
            <span>Тел.</span>
            {{cardData.phone}}
          </div>
        </div>

        <div
          class="car-status"
          :class="cardData.onTer?'on-ter':'not-on-ter'"
          :title="cardData.onTer?'Не выехал':'Выехал'"
        ></div>
      </div>
    </transition>
    <transition name="card-rotate">
      <div class="card-back" v-if="!side">
        <h3>hello</h3>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return { side: true };
  },
  props: ["cardData"]
};
</script>

<style scoped>
.animation-wraper {
  position: relative;
}

.card-fasad {
  position: relative;
  width: 220px;
  height: 270px;
  padding: 5px 15px 8px 15px;
  border: 2px solid #3e3e3e;
  border-radius: 3px;
  box-shadow: 4px 4px 9px 1px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-items: baseline;
}

.card-back {
  position: absolute;
  top: 0;
  width: 220px;
  height: 270px;
  padding: 5px 15px 8px 15px;
  border: 2px solid #3e3e3e;
  border-radius: 3px;
  box-shadow: 4px 4px 9px 1px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-items: baseline;
}

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
  overflow: hidden;
}

.car-driver__organisation {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 5px;
  /* align-self: center; */
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

.card-rotate-enter-active {
  animation: rotate;
  animation-duration: 1.7s;
}

/* .card-rotate-leave-active {
  animation: rotate;
  animation-duration: 1.7s;
} */

@keyframes rotate {
  0% {
    transform: rotateY(180deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>