<template>
  <div class="new-ticket-main" :class="!ticketPosition.hiden?'new-ticket-main__hiden':''">
    <div
      @click.prevent="toggleTicket"
      class="support-view-modifier"
      :class="ticketPosition.hiden ? 'support-view-modifier-hover' : ''"
    ></div>
    <div class="wraper">
      <div class="new-ticket-select" @click="selectValues=!selectValues">
        <transition name="change" mode="out-in">
          <div class="blue-text" v-if="selectValues" key="1">приход</div>

          <div v-else key="2">отгруз</div>
        </transition>
      </div>

      <div class="ticket-title">
        Пропуск №
        <span>{{ propTicketNumber }}</span>
      </div>
      <form class="new-ticket-form">
        <div class="input-wraper">
          <appTooltip
            color="#f54c4c"
            timeout="1700"
            right
            inline
            :visible="$v.ticketLabels.carNumber.$error&&!$v.ticketLabels.carNumber.minLength"
          >Слишком короткий номер</appTooltip>
          <input
            spellcheck="false"
            autocomplete="off"
            type="text"
            class="input-spacing"
            :class="{
							'input-error': $v.ticketLabels.carNumber.$error
						}"
            id="input-carnumber"
            @input="carNumberMask('$data', 'ticketLabels', 'carNumber')"
            @blur="$v.ticketLabels.carNumber.$touch()"
            v-model="ticketLabels.carNumber"
            placeholder="Номер авто"
          />
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="text"
            @input="capitalize($event.target.value, 'ticketLabels', 'carMark')"
            v-model="ticketLabels.carMark"
            placeholder="Марка авто"
          />
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="text"
            :class="{
							'input-error': $v.ticketLabels.driverName.$error,
						}"
            @input="
							capitalize(
								$event.target.value,
								'ticketLabels',
								'driverName',
								true,
							)
						"
            @blur="$v.ticketLabels.driverName.$touch()"
            v-model="ticketLabels.driverName"
            placeholder="Ф.И.О."
          />
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="text"
            class="input-spacing"
            :class="{
							'input-error': $v.ticketLabels.driverDocs.$error,
						}"
            @input="passportMask('$data', 'ticketLabels', 'driverDocs')"
            @blur="$v.ticketLabels.driverDocs.$touch()"
            v-model="ticketLabels.driverDocs"
            placeholder="Паспорт"
          />
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="text"
            :class="{
							'input-error': $v.ticketLabels.organisation.$error,
						}"
            @input="
							capitalize($event.target.value, 'ticketLabels', 'organisation')
						"
            @change="transCom"
            @blur="$v.ticketLabels.organisation.$touch()"
            v-model="ticketLabels.organisation"
            placeholder="Организация"
          />
          <span class="organisation-color" :style="'background-color:' + this.orgColor"></span>
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="text"
            class="input-spacing"
            v-maska="'###-###'"
            v-model="ticketLabels.divisionCode"
            placeholder="Код подразделения"
          />
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="tel"
            class="phone-mod-input input-spacing"
            v-model="ticketLabels.phone"
            placeholder="Номер телефона"
            v-maska="'8 (###) ###-##-##'"
          />
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="text"
            v-maska="trailerMaska"
            v-model="ticketLabels.trailerNumber"
            placeholder="Номер прицепа"
          />
        </div>
      </form>
      <div class="btn-block">
        <div class="btn-reset btn" @click.self="formReset">Очистить</div>
        <div class="btn-succes btn" @click.self="sendTicket">
          Отправить
          <appTooltip
            timeout="2200"
            right
            :visible="$v.ticketLabels.organisation.$error&&!$v.ticketLabels.organisation.required"
          >Заполните обязательные поля</appTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import ticketMethods from "../../mixins/ticketMethods";
import Tooltip from "../minions/Tooltip";

export default {
  components: {
    appTooltip: Tooltip
  },
  data() {
    return {
      trailerMaska: {
        mask: "AA AAAA A**",
        tokens: {
          A: { pattern: /[0-9a-zA-Zа-яА-Я]/, uppercase: true }
        }
      },
      ticketPosition: {
        hiden: true
      },
      orgColor: "",
      selectValues: false,
      ticketLabels: {
        carNumber: "",
        carMark: "",
        trailerNumber: "",
        driverName: "",
        driverDocs: "",
        divisionCode: "",
        organisation: "",
        phone: ""
      },
      toolltipsStatus: {
        globalError: false
      }
    };
  },
  /*==============================================================================
              New ticket form Validation settings
  ==============================================================================*/
  validations: {
    ticketLabels: {
      carNumber: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(18)
      },
      driverName: {
        required
      },
      driverDocs: {
        required
      },
      organisation: {
        required
      }
    }
  },
  mixins: [ticketMethods],
  methods: {
    transCom: function() {
      let company = this.ticketLabels.organisation.toLowerCase();
      for (let str in this.transportComps.value) {
        for (let val of this.transportComps.value[str]) {
          if (val == company) {
            this.orgColor = this.transportComps.colors[str];
            this.ticketLabels.organisation = this.transportComps.label[str];
            return;
          } else this.orgColor = "#3e3e3e00";
        }
      }
    },
    formReset: function() {
      for (let item in this.ticketLabels) {
        if (this.ticketLabels.hasOwnProperty(item)) {
          this.ticketLabels[item] = "";
        }
      }
      this.$v.$reset();
      this.transCom();
    },
    toggleTicket() {
      this.ticketPosition.hiden = !this.ticketPosition.hiden;
      setTimeout(() => {
        this.formReset();
        if (this.selectValues) this.selectValues = false;
      }, 500);
    },
    sendTicket: function() {
      console.log(this.$v);

      this.$v.$reset();
      setTimeout(() => {
        this.$v.ticketLabels.$touch();
        if (!this.$v.$invalid) {
          this.toggleTicket();
          this.$store.dispatch("CREATE_TICKET", this.sendingData);
          this.formReset();
          this.selectValues = false;
        }
      }, 10);
    }
  },

  computed: {
    transportComps: function() {
      return this.$store.getters.transComps;
    },
    sendingData: function() {
      return {
        ticketNumber: this.propTicketNumber,
        onTer: true,
        incomingTime: ticketMethods.nowDate("time"),
        incomingDate: ticketMethods.nowDate("date"),
        outgoingTime: "",
        outgoingDate: "",
        carNumber: this.ticketLabels.carNumber,
        carMark: this.ticketLabels.carMark,
        trailerNumber: this.ticketLabels.trailerNumber,
        driverName: this.ticketLabels.driverName,
        driverDocs: this.ticketLabels.driverDocs,
        divisionCode: this.ticketLabels.divisionCode,
        organisation: this.ticketLabels.organisation,
        phone: this.ticketLabels.phone,
        documents: "",
        note: "",
        operation: this.selectValues
      };
    },
    propTicketNumber: function() {
      return this.$store.getters.nextTicketNumber;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.new-ticket-main {
  position: fixed;
  top: 70px;
  left: -280px;
  width: 280px;
  box-shadow: 4px 4px 7px #3d3d3d;
  border-radius: 3px;
  z-index: 15;
  transition: all ease-in-out 0.4s;
  transform: translateX(0px);
  will-change: transform;
}

.new-ticket-main__hiden {
  transform: translateX(285px);
}

.wraper {
  color: rgba(62, 62, 62, 0);
  position: relative;
  display: grid;
  grid-gap: 8px;
  justify-content: stretch;
  align-content: center;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  background-color: #333333;
  color: #fff;
  border-radius: 3px;
  z-index: 12;
  padding: 10px;
}

.new-ticket-select {
  overflow: hidden;
  position: absolute;
  top: 8px;
  left: 10px;
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

.ticket-title {
  padding-left: 10px;
  align-self: center;
  justify-self: center;
  user-select: none;
}
.ticket-title span {
  font-size: 18px;
  margin-left: 8px;
}

.support-view-modifier {
  position: absolute;
  background-color: #333333;
  width: 120px;
  height: 150px;
  box-shadow: 1px 1px 4px #08aef1;
  right: -35px;
  border-radius: 0 12% 12% 0;
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  transition: all 0.2s;
  user-select: none;
  will-change: transform;
}

.support-view-modifier-hover:hover {
  transform: translateX(2px);
}

.support-view-modifier::after {
  content: "Пропуск";
  color: #08aef1;
  position: absolute;
  font-size: 15px;
  width: 10px;
  padding: 13px 15px 13px 0;
  word-wrap: break-word;
}

/*  inputs  */
.new-ticket-form {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: center;
  grid-gap: 15px;
}
input {
  max-width: 100%;
  min-width: 100%;
  height: 30px;
  font-size: 0.9rem;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  text-align: center;
  border-style: none;
  line-break: initial;
  outline: none;
  background-color: #d6d5d5 !important;
  border-right: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
  border-radius: 2px;
  box-shadow: 3px 3px 3px #07070799;
}
input:focus {
  background-color: #0f0f0f;
  box-shadow: 0 0 5px 2px #08aef1;
}

input::placeholder {
  color: #797979;
  font-family: "Roboto-mono", sans-serif;
  font-weight: 400;
}
input:disabled {
  color: black;
}

input {
  color: transparent;
  text-shadow: 0 0 0 black;
}

/* =========  Input Errors ============ */

.input-error {
  animation: errors 0.5s linear;
  box-shadow: 0 0 5px 2px #f72323;
}

@keyframes errors {
  0% {
    transform: translate3d(0, 0, 0);
  }

  15% {
    transform: translate3d(-5px, 0, 0);
  }

  30% {
    transform: translate3d(5px, 0, 0);
  }

  45% {
    transform: translate3d(-5px, 0, 0);
  }

  60% {
    transform: translate3d(5px, 0, 0);
  }

  75% {
    transform: translate3d(-5px, 0, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
}
/* =========  Input Errors ============ */
.input-wraper {
  position: relative;
}

.phone-mod-input {
  text-align: start;
  text-indent: 70px;
}

.phone-modifier {
  position: absolute;
  /* background-color: #58bd7f; */
  left: 50px;
  padding: 6px 10px 5px 9px;
  color: black;
  font-weight: 600;
  font-size: 16px;
  /* opacity: 0.7; */
}
/*  buttons block  */
.btn-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  user-select: none;
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

.organisation-color {
  font-weight: 500;
  position: absolute;
  right: -1px;
  top: 0;
  width: 20px;
  height: 24px;
  color: black;
  opacity: 0.7;

  text-align: center;
  padding-top: 7px;
}
</style>
