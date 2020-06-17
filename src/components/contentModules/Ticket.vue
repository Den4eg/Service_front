<template>
  <div class="app-ticket">
    <div class="ticket-body">
      <div class="ticket-title">
        <div class="new-ticket-select" @click="changeOperation">
          <app-tooltip
            :visible="toolltipsStatus.operationBlocked"
            @hideTooltip="toolltipsStatus.operationBlocked = false"
            :timeout="1500"
            rightbottom
          >Имеются документы на отгрузку</app-tooltip>
          <transition name="change" mode="out-in">
            <div
              class="blue-text"
              v-if="ticketValues.operation&&ticketValues.documents.length===0"
              key="1"
            >приход</div>

            <div v-else key="2">отгруз</div>
          </transition>
        </div>
        <div class="ticketNumber">
          Пропуск №
          <span>{{ ticketValues.ticketNumber }}</span>
        </div>
        <span class="ticket-date">{{ ticketValues.incomingDate }}</span>
      </div>
      <div class="ticket-data">
        <div class="ticket-documents-block" v-show="btnDocs.marker">
          <div class="docs-text-block">Номера материальных пропусков</div>
          <div class="docs-area-block">
            <textarea
              :disabled="ticketValues.operation"
              :placeholder="ticketValues.operation
              ? 'Пропуск нельзя добавить для машины со статусом приход, смените статус на отгрузка'
              :'Номера материальных пропусков'"
              name="docs-textarea"
              v-model="documents"
              @keydown.enter="btnSaveDocs"
              class="textarea"
            ></textarea>
          </div>
        </div>

        <form v-show="!btnDocs.marker" class="ticket-new-form">
          <div class="input-wraper">
            <input
              spellcheck="false"
              class="input-bold"
              type="text"
              name="incoming"
              disabled
              v-model="ticketValues.incomingTime"
              placeholder="Въезд"
            />
          </div>
          <div class="input-wraper">
            <input
              spellcheck="false"
              class="input-bold"
              type="text"
              name="outgoing"
              disabled
              v-model="ticketValues.outgoingTime"
              placeholder="Выезд"
            />
          </div>
          <div class="input-wraper">
            <input
              spellcheck="false"
              class="input-bold"
              type="text"
              name="car-number"
              v-model="ticketValues.carNumber"
              placeholder="Номер машины"
              @input="carNumberMask('$props', 'ticketValues', 'carNumber')"
            />
          </div>
          <div class="input-wraper">
            <input
              spellcheck="false"
              type="text"
              name="car-mark"
              @input="
								capitalize($event.target.value, 'ticketValues', 'carMark')
							"
              v-model.lazy="ticketValues.carMark"
              placeholder="Марка машины"
            />
          </div>
          <div class="input-wraper">
            <input
              spellcheck="false"
              class="input-bold"
              type="text"
              name="driverName"
              @input="
								capitalize(
									$event.target.value,
									'ticketValues',
									'driverName',
									true,
								)
							"
              v-model="ticketValues.driverName"
              placeholder="Ф.И.О."
            />
          </div>
          <div class="input-wraper">
            <input
              spellcheck="false"
              type="text"
              name="driverDocs"
              @input="passportMask('$props', 'ticketValues', 'driverDocs')"
              v-model="ticketValues.driverDocs"
              placeholder="Паспорт"
            />
          </div>
          <div class="input-wraper">
            <input
              spellcheck="false"
              class="input-bold"
              type="text"
              name="organisation"
              @input="
								capitalize($event.target.value, 'ticketValues', 'organisation')
							"
              @change="transCom"
              v-model="ticketValues.organisation"
              placeholder="Организация"
            />
            <span class="organisation-color" :style="'background-color:' + this.orgColor"></span>
          </div>
          <div class="input-wraper">
            <input
              spellcheck="false"
              type="text"
              name="docDivision"
              v-maska="'###-###'"
              v-model="ticketValues.divisionCode"
              placeholder="Код подразделения"
            />
          </div>
          <div class="input-wraper">
            <input
              spellcheck="false"
              type="text"
              name="driver-phone"
              v-maska="'8 (###) ###-##-##'"
              v-model="ticketValues.phone"
              placeholder="Контактный телефон"
            />
          </div>
          <div class="input-wraper">
            <input
              spellcheck="false"
              type="text"
              name="trailer"
              v-maska="{
								mask: 'AA AAAA A**',
								tokens: {
									A: { pattern: /[0-9a-zA-Zа-яА-Я]/, uppercase: true },
								},
							}"
              v-model="ticketValues.trailerNumber"
              placeholder="Номер прицепа"
            />
          </div>
        </form>
      </div>
      <div class="ticket-buttons">
        <div class="btn-group">
          <div
            class="ticket-btn-docs btn"
            @click="changeTicketView"
          >{{ btnDocs.value[btnDocs.marker] }}</div>
        </div>
        <div v-show="btnDocs.marker" class="input-wraper input-notes">
          <input
            spellcheck="false"
            autocomplete="off"
            type="text"
            name="notes"
            v-model="ticketValues.note"
            class="notes"
            placeholder="Примечание"
          />
        </div>
        <div
          class="ticket-btn-succes btn"
          :class="{'disabled': ticketDisabled}"
          @click.self="ticketObjectLog"
        >
          <app-tooltip
            :visible="toolltipsStatus.outgoingBlocked"
            @hideTooltip="toolltipsStatus.outgoingBlocked = false"
            :timeout="2000"
            left
          >Заполните поле пропусков</app-tooltip>Выезд
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ticketMethods from "../../mixins/ticketMethods";
import Tooltip from "../minions/Tooltip.vue";
export default {
  components: {
    appTooltip: Tooltip
  },
  data() {
    return {
      btnDocs: { marker: 0, value: ["Документы", "Сохранить"] },
      orgColor: "",
      documents: "",
      toolltipsStatus: {
        outgoingBlocked: false,
        operationBlocked: false
      }
    };
  },
  methods: {
    changeOperation() {
      if (this.ticketValues.documents.length > 0) {
        this.toolltipsStatus.operationBlocked = true;
        return;
      }
      this.ticketValues.operation = !this.ticketValues.operation;
    },
    changeTicketView() {
      if (this.btnDocs.marker) {
        this.btnSaveDocs();
      }
      this.btnDocs.marker = +!this.btnDocs.marker;
    },
    btnSaveDocs: function() {
      this.ticketValues.documents = this.documents
        .split(/\s/g)
        .filter(el => el.length !== 0);
      this.docsReplace();
    },
    docsReplace: function() {
      this.documents = this.ticketValues.documents
        .filter(doc => doc.length >= 7)
        .join("  ");
    },
    transCom: function() {
      let company = this.$props.ticketValues.organisation.toLowerCase();
      for (let str in this.transportComps.value) {
        for (let val of this.transportComps.value[str]) {
          if (val == company) {
            this.orgColor = this.transportComps.colors[str];
            this.$props.ticketValues.organisation = this.transportComps.label[
              str
            ];
            return;
          } else this.orgColor = "#3e3e3e00";
        }
      }
    },
    ticketObjectLog: function() {
      this.btnSaveDocs();
      if (this.ticketDisabled) {
        this.toolltipsStatus.outgoingBlocked = true;
        this.btnDocs.marker = 1;
        return;
      }

      this.ticketValues.outgoingTime = ticketMethods.nowDate("time");
      this.ticketValues.outgoingDate = ticketMethods.nowDate("date");
      this.btnDocs.marker = 0;

      this.ticketValues.onTer = false;
      this.ticketValues.phone = this.ticketValues.phone
        ? this.ticketValues.phone.replace(/\D/g, "").slice(1)
        : "";

      console.log(this.ticketValues);
    }
  },
  computed: {
    operation() {
      return this.operationTypes[+this.ticketValues.operation];
    },
    transportComps: function() {
      return this.$store.getters.transComps;
    },
    ticketDisabled: function() {
      return (
        !this.ticketValues.operation &&
        !this.ticketValues.documents.length &&
        !this.ticketValues.note.length &&
        this.documents.length < 7
      );
    }
  },
  created: function() {
    this.transCom();
  },
  mounted: function() {
    if (this.ticketValues.documents.length !== 0) {
      this.documents = this.ticketValues.documents.join("  ");
    }
    this.passportMask("$props", "ticketValues", "driverDocs");
    this.capitalize(
      this.ticketValues.organisation,
      "ticketValues",
      "organisation"
    );
  },

  props: ["ticketValues"],
  mixins: [ticketMethods]
};
</script>

<style scoped>
.app-ticket {
  background-color: #3e3e3e;
  padding: 10px;
  border-radius: 2px;
  box-shadow: 4px 4px 5px #22222299;
  margin-bottom: 10px;
  position: relative;
  width: 97.3%;
  will-change: transform;
}

.ticket-title {
  display: grid;
  grid-template-rows: 23px;
  justify-items: start;
  color: white;
  user-select: none;
}
.ticketNumber {
  justify-self: center;
  font-size: 16px;
  font-weight: 400;
  text-indent: 30px;
  text-shadow: 1px 1px 3px black;
  user-select: none;
}
.ticketNumber span {
  margin-left: 7px;
  user-select: none;
}

.ticket-date {
  position: absolute;
  right: 10px;
  text-shadow: 1px 1px 3px black;
  user-select: none;
}

.ticket-body {
  position: relative;
  display: grid;
  grid-template-rows: auto 3fr auto;
  grid-gap: 8px;
}

.ticket-documents-block {
  display: grid;
  grid-auto-flow: column;
  position: relative;
  grid-template-columns: 127px 5fr;
  grid-gap: 8px;
  height: 70px;
}

.docs-text-block {
  max-width: 120px;
  align-self: center;
  text-align: center;
  color: #cfcfcf;
}
/* \\\\\\\\\\\\\\\\\\\\\  TEXTAREA  ////////////////// */
.textarea {
  position: relative;
  box-sizing: border-box;
  resize: none;
  width: 100%;
  height: 100%;
  padding: 5px;
  font-size: 1rem;
  font-weight: 600;
  font-family: Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  line-height: 20px;
  word-spacing: 10px;
  scrollbar-highlight-color: #cfcfcf;
  border-radius: 2px;
  box-shadow: 3px 3px 3px rgba(7, 7, 7, 0.6);
  background-color: #d6d5d5;
  overflow-x: hidden;
}

/*  Scroll */
.textarea::-webkit-scrollbar-track {
  box-shadow: inset 0 0 7px #00000098;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.textarea::-webkit-scrollbar {
  width: 4px;
  border-radius: 9px;
  background-color: #f5f5f5;
}

.textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #3e3e3e;
}

.textarea:focus {
  box-shadow: 0 -2px 3px #08aef1;
}

.textarea::placeholder {
  padding-top: 0.3rem;
  font-size: 18px;
  line-height: 1.2;
  font-weight: normal;
  text-align: center;
}
/* \\\\\\\\\\\\\\\\\\\\\  TEXTAREA  ////////////////// */

.notes {
  background-color: #d6d5d5;
  box-sizing: border-box;
  justify-self: start;
}

.ticket-new-form {
  display: grid;
  grid-template-columns: 55px repeat(4, minmax(150px, auto));
  grid-gap: 8px;
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: column;
}

/* *********************** INPUT ********************* */
input {
  box-sizing: content-box;
  width: 100%;
  padding: 0;
  height: 30px;
  font-size: 0.9rem;
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
  color: #858585;
  font-family: "Roboto-mono", sans-serif;
  font-weight: 400;
}
input:disabled {
  color: black;
}

.input-bold {
  font-weight: 600;
}

.input-wraper {
  position: relative;
}
/* *********************** INPUT ********************* */

/* ___________________ ORGANISATION COLOR ___________________*/
.organisation-color {
  font-weight: 500;
  position: absolute;
  right: -1px;
  top: 0;
  width: 22px;
  height: 24px;
  color: black;
  opacity: 0.7;
  text-align: center;
  padding-top: 7px;
}
/* ___________________ ORGANISATION COLOR ___________________*/

/* -------------------- SELECT ------------------ */

.new-ticket-select {
  position: absolute;
  top: -4px;
  color: #e908f1;
  padding: 3px;
  font-size: 18px;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
}
.blue-text {
  color: #08aef1;
}

.change-enter-to,
.change-leave {
  opacity: 1;
}
.change-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.change-enter {
  transform: translateX(-20px);
  opacity: 0;
}
.change-enter-active,
.change-leave-active {
  transition: all 0.3s ease-in-out;
}
/* -------------------- SELECT ------------------ */
/* ==================== BUTTONS ======================*/
.ticket-buttons {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: minmax(80px, 125px) 2.48fr minmax(65px, 0.5fr);
  grid-gap: 10px;
  color: #08aef1;
  position: relative;
  z-index: 999;
}
.btn {
  border: 2px solid #0088aa;
  border-radius: 14px;
  padding: 5px;
  cursor: pointer;
  transition: 0.1s;
  user-select: none;
  z-index: 999;
}
.btn:hover {
  color: #e908f1;
  border: 2px solid #e908f1;
}
.btn:active {
  transform: translateY(-1px);
}

.disabled {
  border-color: #a8a8a8;
  cursor: help;
  color: #a8a8a8;
}
.disabled:hover {
  color: #a8a8a8;
  border: 2px solid #a8a8a8;
}

.ticket-btn-docs {
  position: relative;
  max-width: 100px;
  text-emphasis: none;
  text-align: center;
}
.ticket-btn-succes {
  grid-column: 3/4;
  padding: 5px;
  text-align: center;
  justify-self: stretch;
  position: relative;
}

/* ==================== BUTTONS ======================*/

.phone-modifier {
  position: absolute;
  background-color: #7ec499;
  padding: 5px 5px 6px 2px;
  color: black;
  font-weight: 600;
  font-size: 17px;
  opacity: 0.7;
}

/* media query */
@media (min-width: 910px) and (max-width: 1020px) {
  .ticket-date {
    display: none;
  }
}

@media (min-width: 661px) and (max-width: 910px) {
  .ticket-new-form {
    grid-template-columns: auto !important;
    grid-template-rows: repeat(10, 1fr) !important;
  }
  /* .ticket-documents-block {
    height: 100%;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr 17.22fr;
  } */

  /* .ticket-buttons {
    grid-auto-flow: row;
    grid-template-rows: auto;
    grid-template-columns: 1fr;
    grid-row: end;
  } */
  /* .input-notes {
    grid-row: 1;
  }
  .ticket-btn-succes {
    grid-column: 1;
  }
  .ticket-date {
    display: none;
  }
  .docs-text-block {
    white-space: nowrap;
  } */
}
</style>
