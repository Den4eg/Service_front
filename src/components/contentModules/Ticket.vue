<template>
	<div class="app-ticket">
		<div class="ticket-body">
			<div class="ticket-title">
				<select v-model="ticketValues.operation" name="operation-type">
					<option v-for="operation in operationTypes" :key="operation">{{
						operation
					}}</option>
				</select>
				<div class="ticketNumber">
					Пропуск №
					<span>{{ ticketValues.ticketNumber }}</span>
				</div>
<<<<<<< HEAD
				<span class="ticket-date">{{ ticketValues.incomingDate }}</span>
=======
				<span class="ticket-date">{{ ticketValues.date }}</span>
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
			</div>
			<div class="ticket-data">
				<div class="ticket-documents-block" v-show="btnDocs.marker">
					<div class="docs-text-block">Номера материальных пропусков</div>
					<div class="docs-area-block">
						<textarea
							name="docs-textarea"
							v-model.lazy="arrayOfDocuments"
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
<<<<<<< HEAD
							v-model="ticketValues.incomingTime"
=======
							v-model.lazy="ticketValues.incoming"
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
							placeholder="Въезд"
						/>
					</div>
					<div class="input-wraper">
						<input
							spellcheck="false"
<<<<<<< HEAD
							class="input-bold"
							type="text"
							name="outgoing"
							v-model="ticketValues.outgoingTime"
=======
							disabled
							class="input-bold"
							type="text"
							name="outgoing"
							v-model.lazy="ticketValues.outgoing"
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
							placeholder="Выезд"
						/>
					</div>
					<div class="input-wraper">
						<input
							spellcheck="false"
							class="input-bold"
							type="text"
							name="car-number"
<<<<<<< HEAD
							v-model="ticketValues.carNumber"
							placeholder="Номер машины"
							@input="carNumberMask('$props', 'ticketValues', 'carNumber')"
=======
							v-model.lazy="ticketValues.carNumber"
							placeholder="Номер машины"
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
						/>
					</div>
					<div class="input-wraper">
						<input
							spellcheck="false"
							type="text"
							name="car-mark"
<<<<<<< HEAD
							@input="
								capitalize($event.target.value, 'ticketValues', 'carMark')
							"
=======
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
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
<<<<<<< HEAD
							@input="
								capitalize(
									$event.target.value,
									'ticketValues',
									'driverName',
									true,
								)
							"
=======
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
							v-model.lazy="ticketValues.driverName"
							placeholder="Ф.И.О."
						/>
					</div>
					<div class="input-wraper">
						<input
							spellcheck="false"
							type="text"
							name="driverDocs"
<<<<<<< HEAD
							@input="passportMask('$props', 'ticketValues', 'driverDocs')"
							v-model="ticketValues.driverDocs"
=======
							v-model.lazy="ticketValues.driverDocs"
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
							placeholder="Паспорт"
						/>
					</div>
					<div class="input-wraper">
						<input
							spellcheck="false"
							class="input-bold"
							type="text"
							name="organisation"
<<<<<<< HEAD
							@input="
								capitalize($event.target.value, 'ticketValues', 'organisation')
							"
							@change="transCom"
							v-model="ticketValues.organisation"
=======
							@change="transCom"
							v-model.lazy="ticketValues.organisation"
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
							placeholder="Организация"
						/>
						<span
							class="organisation-color"
							:style="'background-color:' + this.orgColor"
						></span>
					</div>
					<div class="input-wraper">
						<input
							spellcheck="false"
							type="text"
							name="docDivision"
<<<<<<< HEAD
							v-maska="'###-###'"
							v-model="ticketValues.divisionCode"
=======
							v-model.lazy="ticketValues.divisionCode"
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
							placeholder="Код подразделения"
						/>
					</div>
					<div class="input-wraper">
						<input
							spellcheck="false"
							type="text"
							name="driver-phone"
<<<<<<< HEAD
							v-maska="'8 (###) ###-##-##'"
							v-model="ticketValues.phone"
=======
							v-model.lazy="ticketValues.phone"
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
							placeholder="Контактный телефон"
						/>
					</div>
					<div class="input-wraper">
						<input
							spellcheck="false"
							type="text"
							name="trailer"
<<<<<<< HEAD
							v-maska="{
								mask: 'AA AAAA A**',
								tokens: {
									A: { pattern: /[0-9a-zA-Zа-яА-Я]/, uppercase: true },
								},
							}"
							v-model="ticketValues.trailerNumber"
=======
							v-model.lazy="ticketValues.trailerNumber"
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
							placeholder="Номер прицепа"
						/>
					</div>
				</form>
			</div>
			<div class="ticket-buttons">
				<div class="btn-group">
					<div class="ticket-btn-docs btn" @click="btnSaveDocs">
						{{ btnDocs.value[btnDocs.marker] }}
					</div>
				</div>
				<div v-show="btnDocs.marker" class="input-wraper input-notes">
					<input
						spellcheck="false"
						autocomplete="off"
						type="text"
						name="notes"
						v-model.lazy="ticketValues.note"
						class="notes"
						placeholder="Примечание"
					/>
				</div>
				<div @click="ticketObjectLog" class="ticket-btn-succes btn">Выезд</div>
			</div>
		</div>
	</div>
</template>
<script>
import ticketMethods from "../../mixins/ticketMethods";
export default {
	data() {
		return {
			btnDocs: { marker: 0, value: ["Документы", "Сохранить"] },
<<<<<<< HEAD

=======
			transportComps: {
				value: [
					["dl", "дл", "дел", "деловые", "линии", "деловые линии"],
					[
						"м",
						"мажор",
						"маж",
						"мейджер",
						"мейжер",
						"мейжор",
						"мейджор",
						"мейжор",
						"major",
					],
					["дчл", "дичел", "дхл", "диейчел", "диейчэл", "dhl", "d", "д"],
					["пэк", "пек", "п"],
					[
						"ж",
						"жд",
						"желдор",
						"жилдор",
						"жел",
						"желдорекспедиция",
						"желдорэкспедиция",
						"желдорекспидиция",
						"желдорэкспидиция",
					],
					["эйртранс", "ейртранс", "ейр", "эйр", "айр", "Эайртранс", "э", "а"],
				],
				colors: [
					"#8f8f8f",
					"#f78317",
					"#df3030",
					"#5630df",
					"#4db64d",
					"#3ecfb7",
					"#3e3e3e00",
				],
				label: ["Деловые Линии", "Major", "DHL", "ПЭК", "Желдор", "Эйртранс"],
			},
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
			operationTypes: ["отгруз", "приход"],
			orgColor: "",
			arrayOfDocuments: "",
		};
	},
	methods: {
		btnSaveDocs: function() {
			if (this.btnDocs.marker) {
				this.arrayOfDocuments = this.arrayOfDocuments
					.split(/\D/g)
					.filter(el => {
<<<<<<< HEAD
						if (el && el.length > 0) return true;
					})
					.join("  /  ");
				// TO DO !!!!!!!!!!!!!!!!
				// Обработка события для сохранения в сторе
=======
						if (el) return true;
					})
					.join("  /  ");
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
			}
			this.btnDocs.marker = +!this.btnDocs.marker;
		},
		btnToggle: function(o) {
			o.marker = +!o.marker;
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
			this.$props.ticketValues.documents = this.arrayOfDocuments.split("  /  ");
<<<<<<< HEAD
			this.$props.ticketValues.outgoingTime = ticketMethods.nowDate("time");
			this.$props.ticketValues.outgoingDate = ticketMethods.nowDate("date");
			this.btnDocs.marker = 0;

			this.$props.ticketValues.onTer = false;
			this.$props.ticketValues.phone = this.$props.ticketValues.phone
				? this.$props.ticketValues.phone.replace(/\D/g, "").slice(1)
				: "";

			console.log(this.$props.ticketValues);
		},
	},
	computed: {
		transportComps: function() {
			return this.$store.getters.transComps;
=======
			this.$props.ticketValues.outgoing = this.nowTime;

			this.$props.ticketValues.onTer = false;
			this.$props.ticketValues.phone = this.$props.ticketValues.phone
				? this.$props.ticketValues.phone.replace(/\D/g, "").slice(1)
				: "";
			this.$store.dispatch("SAVE_TICKET", this.$props.ticketValues);
			this.btnDocs.marker = 0;
			this.$store.commit("test_mutations");
		},
	},
	computed: {
		nowTime: function() {
			let d = new Date();
			let h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
			let m = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
			return `${h} : ${m}`;
		},
		ticketValuesReverse: function() {
			return this.$props.ticketValues;
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
		},
	},
	created: function() {
		this.transCom();
	},
	props: ["ticketValues"],
<<<<<<< HEAD
	mixins: [ticketMethods],
=======
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
};
</script>

<style scoped>
.app-ticket {
<<<<<<< HEAD
=======
	/* min-width: 98%; */
	max-width: inherit;
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
	background-color: #3e3e3e;
	padding: 10px;
	border-radius: 2px;
	box-shadow: 4px 4px 5px #22222299;
	margin-bottom: 10px;
	position: relative;
<<<<<<< HEAD
	width: 97.3%;
=======
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
}

.ticket-title {
	display: grid;
	grid-template-rows: 23px;
<<<<<<< HEAD
	/* grid-template-columns: 20fr 1fr; */
=======
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
	justify-items: start;
	color: white;
}
.ticketNumber {
	justify-self: center;
	font-size: 16px;
	font-weight: 400;
<<<<<<< HEAD
	text-indent: 30px;
=======
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
	text-shadow: 1px 1px 3px black;
}
.ticketNumber span {
	margin-left: 7px;
}

.ticket-date {
	position: absolute;
	right: 10px;
	text-shadow: 1px 1px 3px black;
}

.ticket-body {
<<<<<<< HEAD
	position: relative;
	display: grid;
	grid-template-rows: auto 3fr auto;
=======
	display: grid;
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
	grid-gap: 8px;
}

.ticket-documents-block {
	display: grid;
	grid-auto-flow: column;
<<<<<<< HEAD
	position: relative;
=======
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
	grid-template-columns: 1fr 3fr;
	grid-gap: 8px;
	height: 70px;
}

.docs-text-block {
	align-self: center;
	text-align: center;
	color: #cfcfcf;
}

.textarea {
	word-wrap: normal;
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
}

.textarea:focus {
	box-shadow: 0 -2px 3px #08aef1;
}

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
input {
<<<<<<< HEAD
	box-sizing: content-box;
	width: 100%;
=======
	max-width: 100%;
	min-width: 100%;
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
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

.organisation-color {
	font-weight: 500;
	position: absolute;
	right: -1px;
	top: 0;
<<<<<<< HEAD
	width: 22px;
=======
	width: 20px;
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
	height: 24px;
	color: black;
	opacity: 0.7;

	text-align: center;
	padding-top: 7px;
}

select[name="operation-type"] {
	position: absolute;
	background-color: #3e3e3e;
	color: #08aef1;
	outline: none;
	border: none;
	padding: 3px;
	margin-bottom: 7px;
	font-size: 16px;
	appearance: none;
	box-sizing: border-box;
	cursor: pointer;
	text-align: center;
}

.ticket-buttons {
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: minmax(80px, 1fr) 2.48fr minmax(65px, 0.5fr);
	grid-gap: 10px;
	color: #08aef1;
}
.btn {
	border: 2px solid #0088aa;
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

.ticket-btn-docs {
	text-align: center;
}
.ticket-btn-succes {
	grid-column: 3/4;
	padding: 5px;
	text-align: center;
	justify-self: stretch;
<<<<<<< HEAD
}

.phone-modifier {
	position: absolute;
	background-color: #7ec499;
	padding: 5px 5px 6px 2px;
	color: black;
	font-weight: 600;
	font-size: 17px;
	opacity: 0.7;
=======
>>>>>>> 9d58bb2c1ded36d1147fce3180cb75a64f34b682
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
	.ticket-documents-block {
		height: 100%;
		grid-auto-flow: row;
		grid-template-columns: 1fr;
		grid-auto-rows: 1fr 17.22fr;
	}

	.ticket-buttons {
		grid-auto-flow: row;
		grid-template-rows: auto;
		grid-template-columns: 1fr;
		grid-row: end;
	}
	.input-notes {
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
	}
}

@media (max-width: 660px) {
	textarea {
		min-height: 338px;
	}
	.ticketNumber {
		justify-self: end;
	}
	.ticket-documents-block {
		height: inherit;
		grid-auto-flow: row;
		grid-template-columns: 1fr;
	}

	.docs-text-block {
		display: none;
	}

	.ticket-buttons {
		grid-auto-flow: row;
		grid-template-rows: auto;
		grid-template-columns: 1fr;
		grid-row: end;
	}
	.input-notes {
		grid-row: 1;
	}
	.ticket-btn-succes {
		grid-column: 1;
	}
	.ticket-date {
		display: none;
	}
}
</style>
