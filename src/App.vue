/* eslint-disable */
<template>
  <div id="app">
    <span id="bgimg"></span>
    <app-header class="app-header"></app-header>
    <appLoader></appLoader>
    <div class="container">
      <app-ticket class="app-ticket" v-if="ticketRights"></app-ticket>
      <app-transport v-if="transportList"></app-transport>
      <transition :name="transitionName" mode="out-in">
        <router-view class="child-view" />
      </transition>

      <app-footer class="app-footer"></app-footer>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import AppTicket from "./components/contentModules/NewTicket";
import AppTransport from "./components/contentModules/RegisterTransport";
import Footer from "./components/Footer.vue";
import AppLoader from "./components/minions/AppLoader";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
    appTicket: AppTicket,
    appTransport: AppTransport,
    appLoader: AppLoader
  },
  data() {
    return {
      transitionName: "slide-left",
      routesPriorityList: []
    };
  },
  watch: {
    $route(to, from) {
      if (from) {
        if (
          this.routesPriorityList.indexOf(to.name) >
          this.routesPriorityList.indexOf(from.name)
        ) {
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
      } else {
        this.transitionName = "";
      }
    }
  },
  methods: {},
  computed: {
    ticketRights() {
      return this.$store.getters.getUserProperties >= 7;
    },
    transportList() {
      return this.$store.getters.getUserProperties >= 7;
    }
  },
  created() {
    this.$router.options.routes.forEach(r =>
      this.routesPriorityList.push(r.name)
    );
  }
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #e8e8e8;
  color: #2c3e50;
}

#bgimg {
  position: absolute;
  z-index: -2;
}

.app-ticket {
  z-index: 4;
}

.container {
  display: grid;
  min-height: 100vh;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas: "header" "main" "footer";
}

.app-header {
  box-shadow: 0 2px 5px #2c3e50;
  z-index: 99;
  position: fixed;
  width: 100vw;
  height: 60px;
  grid-area: header;
  line-height: 1.45;
}

.main {
  grid-area: main;
  justify-self: center;
  margin-top: 10px;
  overflow: visible;
}

.app-sidebar {
  background-color: #3e3e3e;
}

.app-footer {
  border: 1px solid silver;
  background-color: silver;
  grid-area: footer;
}

@media (min-width: 1441px) {
  .main {
    display: grid;
    grid-template-columns: 7fr 2fr;
    width: 1300px;
  }
}

@media (min-width: 1300px) and (max-width: 1440px) {
  .main {
    display: grid;
    grid-template-columns: 7fr 2fr;
    width: 1150px;
  }
}

@media (min-width: 1150px) and (max-width: 1300px) {
  .main {
    display: grid;
    grid-template-columns: 7fr 2.2fr;
    grid-template-rows: 1fr;
    width: 1050px;
  }
}

@media (min-width: 910px) and (max-width: 1150px) {
  .main {
    display: grid;
    grid-template-columns: 1fr;
    width: 85%;
  }

  .app-sidebar {
    display: none !important;
  }
}

/* transitions */

.child-view {
  /* position: absolute; */
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
  /* top: 90px;
    left: 30px;
    right: 30px; */
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100px, 0);
  transform: translate(100px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100px, 0);
  transform: translate(-100px, 0);
}
</style>
