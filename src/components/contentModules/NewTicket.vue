<template>
  <div
    class="new-ticket-main"
    :style="
            ticketPosition.hiden
                ? {
                      left: ticketPosition.value + 'px',
                      'box-shadow': '0 0 0 white'
                  }
                : ''
        "
  >
    <div
      @click="toggleTicket"
      class="support-view-modifier"
      :class="ticketPosition.hiden ? 'support-view-modifier-hover' : ''"
    ></div>
    <div class="wraper">
      <select v-model="selectValues.selected" class="new-ticket-select">
        <option v-for="val in selectValues.values" :key="val">
          {{
          val
          }}
        </option>
      </select>
      <div class="ticket-title">
        Пропуск №
        <span>{{ propTicketNumber }}</span>
      </div>
      <form class="new-ticket-form">
        <div class="input-wraper">
          <input
            spellcheck="false"
            autocomplete="off"
            type="text"
            class="input-spacing"
            :class="{
                            'input-error': $v.ticketLabels.carNumber.$error
                        }"
            id="input-carnumber"
            @input="carNumberMask"
            v-model="$v.ticketLabels.carNumber.$model"
            placeholder="Номер авто"
          />
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="text"
            @input="
                            capitalize(
                                $event.target.value,
                                'ticketLabels',
                                'carMark'
                            )
                        "
            v-model="ticketLabels.carMark"
            placeholder="Марка авто"
          />
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="text"
            :class="{
                            'input-error': $v.ticketLabels.driverName.$error
                        }"
            @input="
                            capitalize(
                                $event.target.value,
                                'ticketLabels',
                                'driverName',
                                true
                            )
                        "
            v-model="$v.ticketLabels.driverName.$model"
            placeholder="Ф.И.О."
          />
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="text"
            class="input-spacing"
            :class="{
                            'input-error': $v.ticketLabels.driverDocs.$error
                        }"
            @input="passportMask"
            v-model="$v.ticketLabels.driverDocs.$model"
            placeholder="Паспорт"
          />
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="text"
            :class="{
                            'input-error': $v.ticketLabels.organisation.$error
                        }"
            @input="
                            capitalize(
                                $event.target.value,
                                'ticketLabels',
                                'organisation'
                            )
                        "
            v-model="ticketLabels.organisation"
            placeholder="Организация"
          />
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="text"
            class="input-spacing"
            @input="passportCodeMask"
            v-model="ticketLabels.divisionCode"
            placeholder="Код подразделения"
          />
        </div>
        <div class="input-wraper">
          <span class="phone-modifier" v-if="this.ticketLabels.phone">+7</span>
          <input
            spellcheck="false"
            type="tel"
            class="phone-mod-input input-spacing"
            @input="phoneMask"
            v-model="ticketLabels.phone"
            placeholder="Номер телефона"
          />
        </div>
        <div class="input-wraper">
          <input
            spellcheck="false"
            type="text"
            @input="trailerMask"
            v-model="ticketLabels.trailerNumber"
            placeholder="Номер прицепа"
          />
        </div>
      </form>
      <div class="btn-block">
        <div class="btn-reset btn" @click="formReset">Очистить</div>
        <div class="btn-succes btn" @click="sendTicket">Отправить</div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      ticketPosition: {
        hiden: true,
        value: -280
      },

      selectValues: { values: ["отгруз", "приход"], selected: "отгруз" },
      ticketLabels: {
        carNumber: "",
        carMark: "",
        trailerNumber: "",
        driverName: "",
        driverDocs: "",
        divisionCode: "",
        organisation: "",
        phone: ""
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
        minLength: minLength(5)
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
  /*!~~!~!~!~!~!~!~!~!~!~!~!~!!~!~!~!~!~!!~~!~!!~!~!~!~!!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!!~!

  !!!!!!!!!!!!!!!!!!!!!            Methods                          !!!!!!!!!!!!!!!!!!!!!

            !~~!~!~!~!~!~!~!~!~!~!~!~!!~!~!~!~!~!!~~!~!!~!~!~!~!!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!!~!*/
  methods: {
    capitalize(val, target, field, mode) {
      let test = val.match(/([а-яА-я]+)(\s?)([а-яА-Я]?)([а-яА-Я]?)/);
      if (mode) {
        if (val.length !== 0 && test) {
          for (let index = 1; index < test.length; index++) {
            test[index].length > 1
              ? (test[index] =
                  test[index].charAt(0).toUpperCase() + test[index].slice(1))
              : test[index].toUpperCase() + ".";
          }
          val = !test[2]
            ? test[1].charAt(0).toUpperCase() + test[1].slice(1)
            : !test[4]
            ? test[1].charAt(0).toUpperCase() +
              test[1].slice(1) +
              test[2] +
              test[3].toUpperCase()
            : test[1].charAt(0).toUpperCase() +
              test[1].slice(1) +
              test[2] +
              test[3].toUpperCase() +
              "." +
              test[4].toUpperCase() +
              ".";
        }
      } else {
        val = val.charAt(0).toUpperCase() + val.slice(1);
      }
      this[target][field] = val;
    },
    /*
===========================================================================================

                      Reset new ticket form function

===========================================================================================


*/
    formReset() {
      for (let item in this.ticketLabels) {
        if (this.ticketLabels.hasOwnProperty(item)) {
          this.ticketLabels[item] = "";
        }
      }
      this.$v.$reset();
    },
    /*===========================================================================================

                      Toggle new ticket form function

===========================================================================================*/

    toggleTicket() {
      this.ticketPosition.hiden = !this.ticketPosition.hiden;
    },

    /*===========================================================================================

                      Sending new ticket form function

===========================================================================================*/
    sendTicket() {
      this.$v.ticketLabels.$touch();
      if (!this.$v.$invalid) {
        this.toggleTicket();
        // console.log(this.$v.ticketLabels);
        this.$store.dispatch("CREATE_NEW_TICKET", this.sendingData);
        this.formReset();
      }
    },
    nowDate(arg) {
      let d = new Date();
      let year = d.getFullYear() % 2000;
      let month =
        d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      let h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      let m = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      return (function() {
        if (arg === "time") return `${h} : ${m}`;
        else if (arg === "date") return `${date}.${month}.${year}`;
      })();
    },
    carNumberMask() {
      this.ticketLabels.carNumber = this.ticketLabels.carNumber.toUpperCase();
      let value = this.ticketLabels.carNumber.split(" ").join("");
      if (value.length === 0) this.ticketLabels.carNumber = "";
      if (value.length > 0 && value.length <= 5) {
        let reg = /([а-я]+)([0-9]+)/i;
        this.ticketLabels.carNumber = value.replace(reg, "$1 $2");
      }
      if (value.length >= 5 && value.length <= 7) {
        let reg = /([а-я]+)([0-9]+)([а-я])/i;
        this.ticketLabels.carNumber = value.replace(reg, "$1 $2 $3");
      }
      if (value.length >= 7) {
        let reg = /([а-я]+)([0-9]+)([а-я]+)([0-9]+)/i;
        this.ticketLabels.carNumber = value.replace(reg, "$1 $2 $3 $4");
      }
    },

    trailerMask() {
      this.ticketLabels.trailerNumber = this.ticketLabels.trailerNumber.toUpperCase();
      let value = this.ticketLabels.trailerNumber.split(" ").join("");
      if (value.length === 0) this.ticketLabels.trailerNumber = "";
      if (value.length > 0 && value.length <= 7) {
        let reg = /([а-я]+)([0-9]{1,4})/i;
        this.ticketLabels.trailerNumber = value.replace(reg, "$1 $2");
      }
      if (value.length >= 7 && value.length <= 12) {
        let reg = /([а-я]+)([0-9]{4})([0-9]+)/i;
        this.ticketLabels.trailerNumber = value.replace(reg, "$1 $2 $3");
      }
    },
    passportMask() {
      let passport = this.ticketLabels.driverDocs;
      if (passport.length > 0)
        this.ticketLabels.driverDocs = passport.toUpperCase();
      if (passport.length > 4) {
        let reg = /^([0-9]{2})([0-9]{2})(\d{0,6})$/i;
        this.ticketLabels.driverDocs = passport.replace(reg, "$1 $2 $3");
      }
    },
    passportCodeMask() {
      let code = this.ticketLabels.divisionCode;
      if (code) {
        let reCode = code.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})/i);
        if (reCode) {
          code = !reCode[2] ? reCode[1] : reCode[1] + "-" + reCode[2];
        }
        this.ticketLabels.divisionCode = code;
      }
    },
    phoneMask() {
      let value = this.ticketLabels.phone;

      let x = value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      this.ticketLabels.phone = !x[2]
        ? x[1]
        : "(" +
          x[1] +
          ") " +
          x[2] +
          (x[3] ? "-" + x[3] : "") +
          (x[4] ? "-" + x[4] : "");
    }
  },
  /*!~~!~!~!~!~!~!~!~!~!~!~!~!!~!~!~!~!~!!~~!~!!~!~!~!~!!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!!~!

  !!!!!!!!!!!!!!!!!!!!!            Computed                          !!!!!!!!!!!!!!!!!!!!!

            !~~!~!~!~!~!~!~!~!~!~!~!~!!~!~!~!~!~!!~~!~!!~!~!~!~!!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!!~!*/
  computed: {
    sendingData() {
      return {
        ticketNumber: this.propTicketNumber,
        onTer: true,
        incoming: this.nowDate("time"),
        date: this.nowDate("date"),
        outgoing: "",
        carNumber: this.ticketLabels.carNumber,
        carMark: this.ticketLabels.carMark,
        trailerNumber: this.ticketLabels.trailerNumber,
        driverName: this.ticketLabels.driverName,
        driverDocs: this.ticketLabels.driverDocs,
        divisionCode: this.ticketLabels.divisionCode,
        organisation: this.ticketLabels.organisation,
        phone: this.ticketLabels.phone ? "+7 " + this.ticketLabels.phone : "",
        documents: "",
        note: "",
        operation: this.selectValues.selected
      };
    },
    propTicketNumber() {
      return this.$store.getters.nextTicketNumber;
    }
  },
  created() {}
};
</script>

<style scoped>
.new-ticket-main {
  position: fixed;
  top: 70px;
  left: 10px;
  width: 280px;
  box-shadow: 4px 4px 7px #3d3d3d;
  border-radius: 3px;
  z-index: 15;
  transition: all ease-in-out 0.4s;
}

.wraper {
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
  position: absolute;
  top: 8px;
  left: 10px;
  background-color: #333333;
  color: #08aef1;
  outline: none;
  border: none;
  padding: 3px;
  font-size: 18px;
  appearance: none;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
}

.ticket-title {
  padding-left: 10px;
  align-self: center;
  justify-self: center;
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
  overflow: hidden;
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  transition: all 0.2s;
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
.input-error {
  /* border: 2px solid red; */
  box-shadow: 0 0 5px 2px #f72323;
}

.input-wraper {
  position: relative;
}
.phone-modifier {
  position: absolute;
  background-color: #797979;
  padding: 6px 10px 6px 12px;
  height: auto;
  color: black;
  font-weight: 600;
  font-size: 17px;
  opacity: 0.7;
}
/*  buttons block  */
.btn-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
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
