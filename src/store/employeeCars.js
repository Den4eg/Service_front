export default {
    state: {
        cars: [
            {
                id: 'aaa0',
                carMark: 'Хендай',
                carNumber: 'А 155 НА 50',
                carOwner: 'Петров П.П..',
                carOwnerDuty: 'Зав.Складом'
            },
            {
                id: 'aaa1',
                carMark: 'Тойота',
                carNumber: 'В 123 ОР 799',
                carOwner: 'Иванов И.И.',
                carOwnerDuty: 'Зам.зав. складом'
            },

            {
                id: 'aaa2',
                carMark: 'Мерседес',
                carNumber: 'Е 345 КХ 999',
                carOwner: 'Смирнов С.С.',
                carOwnerDuty: 'Водитель погрузчика'
            },
            {
                id: 'aaa3',
                carMark: 'Лада Ларгус',
                carNumber: 'А 001 АА 177',
                carOwner: 'Николаев Н.Н.',
                carOwnerDuty: 'Логист'
            },
            {
                id: 'aaa4',
                carMark: 'Опель',
                carNumber: 'Х 777 ХХ 777',
                carOwner: 'Бобровская Г.Н.',
                carOwnerDuty: 'Финансовый диспетчер'
            },
            {
                id: 'aaa5',
                carMark: 'Киа',
                carNumber: 'Х 482 СС 750',
                carOwner: 'Жожевникова В.Х.',
                carOwnerDuty: 'Бухгалтер-кассир'
            },
            {
                id: 'aaa6',
                carMark: 'Лексус',
                carNumber: 'Р 395 СН 750',
                carOwner: 'Глушкевич Г.Г.',
                carOwnerDuty: 'Кладовщик'
            },
            {
                id: 'aaa7',
                carMark: 'Тойота',
                carNumber: 'Х 234 АЕ 150',
                carOwner: 'Федоров Ф.Ф.',
                carOwnerDuty: 'Кладовщик'
            },
            {
                id: 'aaa8',
                carMark: 'Майбах',
                carNumber: 'У 728 НА 799',
                carOwner: 'Арсеньев А.А.',
                carOwnerDuty: 'Кладовщик'
            },
            {
                id: 'aaa9',
                carMark: 'Инфинити',
                carNumber: 'Т 219 ОР 99',
                carOwner: 'Аннина А.А.',
                carOwnerDuty: 'Менеджер по продажам'
            },
            {
                is: 'aaa10',
                carMark: 'Лексус',
                carNumber: 'В 100 ОР 99',
                carOwner: 'Хачатурян А.Г.',
                carOwnerDuty: 'Таможенный декларант'
            },
            {
                id: 'aaa11',
                carMark: 'Шанс',
                carNumber: 'А 150 МР 150',
                carOwner: 'Рафиков Р.Р.',
                carOwnerDuty: 'Водитель штабелера'
            },
            {
                id: 'aaa12',
                carMark: 'Лада Приора',
                carNumber: 'В 263 ВВ 799',
                carOwner: 'Семенов З.У.',
                carOwnerDuty: 'Нач. департамента'
            }
        ]
    },
    actions: {},
    mutations: {},
    getters: {
        employeeCars(state) {
            return state.cars;
        }
    }
};
