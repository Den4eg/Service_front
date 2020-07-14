<template>
  <div id="head-menu">
    <ul class="menu-list">
      <router-link
        tag="li"
        class="menu-item"
        v-for="item in menuItems"
        :key="item.url"
        :to="item.url"
        active-class="active-header-link"
        exact
      >{{ item.title }}</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    menuItems() {
      return [
        { title: "Главная", url: "/", viewLevel: 3 },
        { title: "Журнал", url: "/journal", viewLevel: 5 },
        { title: "История", url: "/history", viewLevel: 3 },
        { title: "Посетители", url: "/visitors", viewLevel: 3 },
        { title: "Админка", url: "/admin", viewLevel: 9 }
      ].filter(el => el.viewLevel <= this.$store.getters.getUserProperties);
    }
  }
};
</script>

<style scoped>
#head-menu {
  font-family: "Roboto-mono", sans-serif;
  font-size: 18px;
  justify-items: end;
  color: #08aef1;
  letter-spacing: 2px;
  height: 100%;
}

/*  Animation link  */

.menu-list {
  list-style: none;
  display: flex;

  height: 100%;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 0 7px;
  justify-items: center;
  height: 100%;
  user-select: none;
  font-family: "Comfortaa", cursive;
  letter-spacing: 0.02rem;
  font-size: 1rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.menu-item:hover {
  transition: all 0.1s ease-in-out;
  background-color: #0000002c;
}

.menu-item:active {
  top: -1px;
}
.active-header-link {
  color: #e908f1;
  background-color: #0000002c;
}

.menu-item span {
  z-index: 20;
}
.menu-item:after {
  background: #fff;
  content: "";
  height: 155px;
  left: -75px;
  opacity: 0.2;
  position: absolute;
  top: -50px;
  width: 50px;
  transition: left 550ms cubic-bezier(0.19, 1, 0.22, 1);
  transform: rotate(35deg);
  z-index: -10;
  opacity: 0.1;
}

.menu-item:active:after {
  animation: shake 550ms cubic-bezier(0.19, 1, 0.22, 1);
  opacity: 0.3;
}

@keyframes shake {
  0% {
    left: -75px;
  }
  100% {
    left: 130%;
    opacity: 0;
  }
}
</style>
