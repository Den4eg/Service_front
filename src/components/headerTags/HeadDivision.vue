<template>
  <div class="division-container">
    <div
      @click="divisionStatus = !divisionStatus"
      v-if="divisionViewRight"
      class="depart"
    >{{ division }}</div>
    <div v-if="!divisionStatus" class="division-list">
      <div class="division-wraper">
        <div class="division-title">Сменить филиал</div>
        <div class="division-menu">
          <ul class="div-menu-list">
            <li class="menu-list-item" v-for="item in divisionList" :key="item.title">
              <a href="#" @click.stop="division = item.title" class="div-anchor">{{ item.title }}</a>
            </li>
          </ul>
          <div class="back-btn">
            <button
              class="btnh btnh-outline-success"
              @click.stop="divisionStatus = !divisionStatus"
            >Back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      division: "Фурманов",
      divisionStatus: true,

      divisionList: [
        { title: "Фурманов" },
        { title: "Родники" },
        { title: "Вичуга" }
      ]
    };
  },
  computed: {
    divisionViewRight() {
      return this.$store.getters.getUserProperties >= 5 ? true : false;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.division-container {
  display: flex;
  justify-content: center;
  grid-column: 2/3;
  align-self: center;
}

.depart {
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-size: 25px;
  letter-spacing: 4px;
  cursor: pointer;
  user-select: none;
  text-align: center;
  width: max-content;
}

.division-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  background-color: #333333f0;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 4px black;
  border-bottom: 1px solid #08aef1;
  padding: 10px;
}

.division-list {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  display: grid;
  justify-content: center;
  grid-template-columns: 1;
  grid-auto-rows: 1;
  align-content: start;
  justify-content: center;
  background-color: #000000eb;
}
.division-wraper {
  position: relative;
  margin: 70px;
  box-shadow: 0 0 10px #08aef1;
  border-radius: 2px;
  min-width: 320px;
  min-height: 350px;
  align-self: center;
  background-color: #f1f1f1;
}
.div-menu-list {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: repeat(10, auto);
  grid-column-gap: 10px;
  grid-auto-flow: column;
  margin: 10px;
}
.div-menu-list li {
  list-style: none;
}

.div-menu-list li a {
  /* line-height: 30px; */
  color: #303030;
  text-decoration: none;
}
.div-menu-list li a:hover {
  color: #08aef1;
}

.div-menu-list li a:active {
  color: blue;
}

/* =============  btn classes ============ */

.btnh {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.275rem 0.55rem;
  font-size: 16px;
  line-height: 1;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btnh-outline-success {
  color: #08aef1;
  border-color: #08aef1;
}

.btnh-outline-success:hover {
  color: #fff;
  background-color: #08aef1;
  border-color: #08aef1;
}

.btnh-outline-success:focus,
.btnh-outline-success.focus {
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
}

.btnh-outline-success.disabled,
.btnh-outline-success:disabled {
  color: #08aef1;
  background-color: transparent;
}
</style>