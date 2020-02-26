export default {
    methods: {
        capitalize: function (val, target, field, mode) {
            let test = val.match(/([а-яА-я]+)(\s?)([а-яА-Я]?)([а-яА-Я]?)/);
            if (mode) {
                if (val.length !== 0 && test) {
                    for (let index = 1; index < test.length; index++) {
                        test[index].length > 1 ?
                            (test[index] =
                                test[index].charAt(0).toUpperCase() +
                                test[index].slice(1)) :
                            test[index].toUpperCase() + '.';
                    }
                    val = !test[2] ?
                        test[1].charAt(0).toUpperCase() + test[1].slice(1) :
                        !test[4] ?
                        test[1].charAt(0).toUpperCase() +
                        test[1].slice(1) +
                        test[2] +
                        test[3].toUpperCase() :
                        test[1].charAt(0).toUpperCase() +
                        test[1].slice(1) +
                        test[2] +
                        test[3].toUpperCase() +
                        '.' +
                        test[4].toUpperCase() +
                        '.';
                }
            } else {
                val = val.charAt(0).toUpperCase() + val.slice(1);
            }
            this[target][field] = val;
        },
        carNumberMask: function (v, target, field) {
            this[v][target][field] = this[v][target][field].toUpperCase();
            let value = this[v][target][field].replace(/\s?/g, '');
            if (value.length === 0) this[v][target][field] = '';
            if (value.length > 0 && value.length <= 5) {
                let reg = /([а-я]+)([0-9]+)/i;
                this[v][target][field] = value.replace(reg, '$1 $2');
            }
            if (value.length >= 5 && value.length <= 7) {
                let reg = /([а-я]+)([0-9]+)([а-я])/i;
                this[v][target][field] = value.replace(reg, '$1 $2 $3');
            }
            if (value.length >= 7) {
                let reg = /([а-я]+)([0-9]+)([а-я]+)([0-9]+)/i;
                this[v][target][field] = value.replace(reg, '$1 $2 $3 $4');
            }
        },
        trailerMask: function (v, target, field) {
            this[v][target][field] = this[v][target][field].toUpperCase();
            let value = this[v][target][field].replace(/\s?/g, '');
            if (value.length === 0) this[v][target][field] = '';
            if (value.length > 0 && value.length <= 7) {
                let reg = /([а-я]+)([0-9]{1,4})/i;
                this[v][target][field] = value.replace(reg, '$1 $2');
            }
            if (value.length >= 7 && value.length <= 12) {
                let reg = /([а-я]+)([0-9]{4})([0-9]+)/i;
                this[v][target][field] = value.replace(reg, '$1 $2 $3');
            }
        },
        passportMask: function (v, target, field) {
            let passport = this[v][target][field].toUpperCase();
            let reg = /^([0-9]{2})([0-9]{2})(\d{0,6})$/i;
            this[v][target][field] = passport.replace(reg, '$1 $2 $3');
        },
        passportCodeMask: function (v, target, field) {
            let code = this[v][target][field];
            if (code) {
                let reCode = code
                    .replace(/\D/g, '')
                    .match(/(\d{0,3})(\d{0,3})/i);
                if (reCode) {
                    code = !reCode[2] ? reCode[1] : reCode[1] + '-' + reCode[2];
                }
                this[v][target][field] = code;
            }
        },
        phoneMask: function (v, target, field) {
            let value = this[v][target][field];

            let x = value
                .replace(/\D/g, '')
                .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            this[v][target][field] = !x[2] ?
                x[1] :
                '(' +
                x[1] +
                ') ' +
                x[2] +
                (x[3] ? '-' + x[3] : '') +
                (x[4] ? '-' + x[4] : '');
        }
    },
    nowDate: function (arg) {
        let d = new Date();
        let year = d.getFullYear() % 2000;
        let month =
            d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
        let date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        let h = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
        let m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        return (function () {
            if (arg === 'time') return `${h} : ${m}`;
            else if (arg === 'date') return `${date}.${month}.${year}`;
        })();
    }
};