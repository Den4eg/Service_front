<template>
  <div v-if="viewLoader" class="load-wrapp">
    <div class="load-6">
      <div class="letter-holder">
        <div class="l-1 letter">L</div>
        <div class="l-2 letter">o</div>
        <div class="l-3 letter">a</div>
        <div class="l-4 letter">d</div>
        <div class="l-5 letter">i</div>
        <div class="l-6 letter">n</div>
        <div class="l-7 letter">g</div>
        <div class="l-8 letter">.</div>
        <div class="l-9 letter">.</div>
        <div class="l-10 letter">.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    viewLoader: function() {
      return this.$store.getters.fetch_status == "loading" ? true : false;
    }
  }
};
</script>

<style>
.load-wrapp {
  position: fixed;
  top: 5px;
  right: 1px;
  border-radius: 5px;
  text-align: center;
  z-index: 999;
}
.letter-holder {
  padding: 16px;
}

.letter {
  float: left;
  font-size: 16px;
  color: rgb(255, 255, 255);
}
.load-wrapp:last-child {
  margin-right: 0;
}
/* =Animate the stuff
------------------------ */
.load-6 .letter {
  animation-name: loadingF;
  animation-duration: 1.6s;
  animation-iteration-count: infinite;
  animation-direction: linear;
}

.l-1 {
  animation-delay: 0.08s;
}
.l-2 {
  animation-delay: 0.2s;
}
.l-3 {
  animation-delay: 0.32s;
}
.l-4 {
  animation-delay: 0.44s;
}
.l-5 {
  animation-delay: 0.56s;
}
.l-6 {
  animation-delay: 0.68s;
}
.l-7 {
  animation-delay: 0.8s;
}
.l-8 {
  animation-delay: 0.92s;
}
.l-9 {
  animation-delay: 1.04s;
}
.l-10 {
  animation-delay: 1.16s;
}

@keyframes loadingF {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>