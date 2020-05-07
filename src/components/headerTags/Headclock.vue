<template>
  <div id="head-clock">
    <div id="date">
      <span id="day" key="headClock1">{{ nowDate.day }}</span>
      <span id="dateNum" key="headClock2">{{ nowDate.dateNum }}</span>
      <span id="month" key="headClock3">{{ nowDate.month }}</span>
    </div>
    <div id="clock" key="headClock4">{{ nowTime }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowTime: "",
      nowDate: ""
    };
  },
  methods: {
    getTime() {
      let d = new Date();
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();
      let arrDay = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота"
      ];
      let day = arrDay[d.getDay()];
      let dateNum = d.getDate();
      let arrMonth = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря"
      ];
      let month = arrMonth[d.getMonth()];
      let resultDate = {
        dateNum,
        month,
        day
      };
      let resultTime =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);
      this.nowTime = resultTime;
      this.nowDate = resultDate;
      setTimeout(this.getTime, 1000);
    }
  },
  mounted() {
    this.getTime();
  }
};
</script>

<style scoped>
#head-clock {
  margin-top: 3px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  white-space: nowrap;
  font-size: 16px;
  color: #08aef1;
}
#date {
  font-family: "Comfortaa", cursive;
  transition: 0.4s;
  white-space: nowrap;
}
#date span {
  text-align: center;
  padding: 4px;
}
#clock {
  transition: 0.4s;
  white-space: nowrap;
  font-size: 17px;
}
</style>
