<template>
  <div class="history-find" :class="!search.hiden?'search-visible': ''">
    <div
      class="find-module__mod"
      :class="search.hiden ? 'find-module__mod-hover' : ''"
      @click.prevent="visible"
    >
      <div>Поиск</div>
    </div>
    <p>Поиск</p>
    <div class="find-inputs">
      <div class="input-wraper">
        <input spellcheck="false" autocomplete="off" type="date" name="fromDate" class="find" />
      </div>
      <div class="input-wraper">
        <input
          spellcheck="false"
          autocomplete="off"
          type="text"
          name="fromDate"
          class="find"
          placeholder="По номеру машины"
        />
      </div>
      <div class="input-wraper">
        <input
          spellcheck="false"
          autocomplete="off"
          type="text"
          name="fromDate"
          class="find"
          placeholder="По ФИО водителя"
        />
      </div>
      <div class="input-wraper">
        <input
          spellcheck="false"
          autocomplete="off"
          type="text"
          name="fromDate"
          class="find"
          placeholder="По № паспорта"
        />
      </div>
      <div class="input-wraper">
        <input
          spellcheck="false"
          autocomplete="off"
          type="text"
          name="fromDate"
          class="find"
          placeholder="По организации"
        />
      </div>
      <div class="input-wraper">
        <input
          spellcheck="false"
          autocomplete="off"
          type="text"
          name="fromDate"
          class="find"
          placeholder="По № накладной"
        />
      </div>
    </div>
    <div class="btn-block">
      <div class="btn-reset btn" @click.self="formReset">Очистить</div>
      <div class="btn-succes btn" @click.self="sendTicket">Искать</div>
    </div>
    <hr />
    <p>Сортировка</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: { hiden: true }
    };
  },
  methods: {
    visible() {
      this.search.hiden = !this.search.hiden;
    }
  }
};
</script>

<style scoped>
.history-find {
  position: fixed;
  right: -242px;
  top: 70px;
  z-index: 10;
  padding: 0 10px;
  padding-top: 10px;
  background: #3e3e3e;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  border-radius: 6px;
  transition: all 0.4s;
  will-change: transform;
  color: #fff;
}

hr {
  width: 100%;
  margin-bottom: 4px;
}

.search-visible {
  transform: translateX(-244px);
}

.find-module__mod {
  position: absolute;
  width: 16px;
  left: -34px;
  top: 0;
  padding: 10px;
  padding-left: 12px;
  color: #08aef1;
  background: #3e3e3e;
  box-shadow: -2px 0 2px#08aef1;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
}

.find-module__mod > div {
  word-wrap: break-word;
  font-size: 16px;
  width: 8px;
}

.find-module__mod-hover:hover {
  transform: translateX(-2px);
}

.find-inputs {
  width: 99%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

/* 
=================== INPUTS ===================
 */

.input-wraper {
  position: relative;
  color: #08aef1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

input {
  margin-top: 5px;
  margin-bottom: 5px;
  box-sizing: content-box;
  width: fit-content;
  min-width: 220px;
  padding: 0;
  height: 30px;
  font-size: 1rem;
  font-family: "Roboto-mono", sans-serif;
  font-weight: 600;
  text-align: center;
  border-style: none;
  line-break: initial;
  outline: none;
  background-color: #d6d5d5 !important;
  border-right: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
  border-radius: 2px;
  box-shadow: 3px 3px 3px rgba(7, 7, 7, 0.6);
}
input:focus {
  box-shadow: 0 0 5px 2px #08aef1;
}

input::placeholder {
  color: #5f5f5f;
  font-family: "Roboto-mono", sans-serif;
  font-weight: 600;
  font-size: 15px;
}
input:disabled {
  color: black;
}

/* ============== Buttons ============== */
.btn-block {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  user-select: none;
  padding: 8px 6px 10px 6px;
}

.btn {
  border: 2px solid #08aef1;
  color: #08aef1;
  border-radius: 14px;
  padding: 5px;
  cursor: pointer;
  transition: 0.1s;
}
.btn:hover {
  color: #e908f1;
  border: 2px solid #e908f1;
}
.btn:active {
  transform: translateY(-1px);
  text-shadow: 0 0 3px #b3b1b1 !important;
}
.btn-reset {
  align-self: center;
  justify-self: start;
}
.btn-succes {
  align-self: center;
  justify-self: end;
}
</style>