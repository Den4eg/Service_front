<template>
  <div id="app-sidebar">
    <div class="sidebar-title">Заявки на пропуск</div>
    <div class="scroll-wraper">
      <div class="content-wraper">
        <div class="message" v-for="a in 3" :key="a">
          <div class="message-wraper">
            <div class="message message-title">
              Hetfield J.A.
              <span class="message message-time">16:00</span>
              <span class="message message-date">11.09</span>
            </div>
            <p class="message message-body">Тут будут заявки на пропуск в офис</p>
            <div class="message message-modifires">
              <div class="message message-modifires-deleting">
                Удалить {{ a }}
                <!-- <span class="message message-status">Удалено</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app-sidebar {
  padding: 0 5px 7px;
  margin: 0 0 0 10px;
  border-radius: 2px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.message {
  margin-bottom: 10px;
}

.message:first-of-type {
  margin-bottom: 0;
}

.scroll-wraper {
  height: inherit;
  position: relative;
  overflow-y: auto;
}

.scroll-wraper::-webkit-scrollbar {
  width: 4px;
  border-radius: 5px;
  background-color: #3e3e3e;
}

.scroll-wraper::-webkit-scrollbar-thumb {
  border-radius: 25px;
  background: #c5c5c5;
}
.content-wraper {
  position: absolute;
  display: flex;
  flex-flow: column-reverse;
}

.sidebar-title {
  margin-top: 9px;
  margin-bottom: 10px;
  font-size: 18px;
  color: #f0eeee;
  text-align: center;
  font-family: "Roboto", sans-serif;
}

.message-wraper {
  border-radius: 2px;
  padding: 7px;
  background-color: #d6d5d5;
  box-shadow: 3px 3px 3px rgba(7, 7, 7, 0.6);
  display: grid;
  grid-auto-flow: row;
  margin: 0 5px;
}

.message-title {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: darkblue;
  display: inline-block;
  margin: 0;
}

.message-time {
  font-family: "Roboto-mono", sans-serif;
  font-size: 14px;
  float: right;
}

.message-date {
  float: right;
  margin-right: 7px;
}
.message-body {
  font-family: "Roboto", sans-serif;
  min-height: 60px;
  padding: 4px;
  margin: 0;
}
.message-modifires {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  margin: 0;
}
.message-modifires-asking {
  color: #0388bd;
}
.message-modifires-deleting {
  color: #d616ac;
  float: right;
}
</style>
