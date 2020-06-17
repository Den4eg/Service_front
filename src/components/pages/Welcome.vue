<template>
  <div class="main">
    <div class="welcome-tittle">
      <h1>Добро пожаловать {{ userData.first }} {{ userData.middle }}</h1>
      <h3>
        Вы можете продолжить работу на сайте,выбрав один из пунктов меню,
        <br />или перейти по ссылкам ниже
      </h3>
    </div>
    <div class="link-block">
      <ul>
        <li>
          <a href="#">Корпоративный портал</a>
        </li>
        <li>
          <a href="#">Корпоративная почта</a>
        </li>
        <li>
          <a href="#">
            Сайт ТехСтройКонтракт
            tsc.ru
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    userData: function() {
      const { first, middle, last } = this.$store.getters.getUserName || "";
      return { first, middle, last };
    }
  },
  mounted() {}
};
</script>

<style scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 2rem;
}
.welcome-tittle {
  position: relative;
  max-width: 80%;
  text-align: center;
}
h1 {
  padding-bottom: 20px;
}
h2 {
  word-wrap: break-word;
}
.link-block {
  padding-top: 3rem;
  min-width: 60vw;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
ul {
  list-style: square;
}
li {
  margin: 1rem auto;
}
a {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
}
</style>
