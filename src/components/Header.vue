<template>
  <div id="app-header">
    <head-clock class="clock"></head-clock>
    <head-division></head-division>
    <head-menu class="menu"></head-menu>
  </div>
</template>

<script>
import headMenu from "./headerTags/Headmenu.vue";
import headClock from "./headerTags/Headclock.vue";
import headDivision from "./headerTags/HeadDivision.vue";

export default {
  components: {
    headMenu: headMenu,
    headClock: headClock,
    headDivision: headDivision
  }
};
</script>

<style scoped>
#app-header {
  display: grid;
  grid-template-columns: 2.1fr 3fr 3.3fr 0.2fr;
  align-items: center;
  background-color: rgba(51, 51, 51, 0.94);
}
.clock {
  grid-column: 1/2;
  align-self: center;
  align-items: center;
}
.menu {
  grid-column: 3/4;
  justify-self: end;
}

/*   division window   */

/* media queries */
/* 
@media (min-width: 910px) and (max-width: 1150px) {
    .menu {
        display: block;
    }
    .clock {
        padding-left: 10px;
    }
}

@media (min-width: 661px) and (max-width: 910px) {
    #app-header {
        grid-template-columns: 2.1fr 3fr 2.2fr;
    }
    .menu {
        display: none;
    }
}
@media (max-width: 660px) {
    .menu {
        display: none;
    }
    #app-header {
        grid-template-columns: 0.0001fr 1fr;
    }
} */
</style>
