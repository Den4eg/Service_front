export default {
    state: {
        transportToday: [{
                ticketNumber: 1,
                onTer: true,
                incoming: '08 : 30',
                date: '10.10.19',
                outgoing: '',
                carNumber: 'Е 156 ВВ 798',
                carMark: 'Ман',
                trailerNumber: '',
                driverName: 'Фет А.А.',
                driverDocs: '12 32 543654',
                divisionCode: '234-543',
                organisation: 'Мажор',
                phone: '+7 (234) 523-42-34',
                documents: '2314312,2314533,2316677',
                note: '',
                operation: 'отгруз'
            },
            {
                ticketNumber: 2,
                onTer: true,
                incoming: '10 : 50',
                date: '10.10.19',
                outgoing: '',
                carNumber: 'В 345 АА 788',
                carMark: 'Вольво',
                trailerNumber: '',
                driverName: 'Писец Н.А.',
                driverDocs: '21 23 456234',
                divisionCode: '214-342',
                organisation: 'пек',
                phone: '+7 (364) 564-56-34',
                documents: '2345511,2331122,2356611',
                note: '',
                operation: 'отгруз'
            },
            {
                ticketNumber: 3,
                onTer: true,
                incoming: '12 : 20',
                date: '10.10.19',
                outgoing: '',
                carNumber: 'Е 001 КХ 737',
                carMark: 'Форд',
                trailerNumber: '',
                driverName: 'Абдалбилбеков А.А.',
                driverDocs: '21 23 456234',
                divisionCode: '341-311',
                organisation: 'DHL',
                phone: '+7 (905) 005-55-55',
                documents: '',
                note: '',
                operation: 'приход'
            },
            {
                ticketNumber: 4,
                onTer: true,
                incoming: '15 : 32',
                date: '10.10.19',
                outgoing: '',
                carNumber: 'А 111 АА 758 ',
                carMark: 'Лада Ларгус',
                trailerNumber: '',
                driverName: 'Прокурорских П.П.',
                driverDocs: '43 12 436666',
                divisionCode: '326-221',
                organisation: 'ЭксТракЭкспедишенТрейд',
                phone: '+7 (988) 111-11-11',
                documents: '',
                note: '',
                operation: 'отгруз'
            }
        ]
    },
    actions: {
        SAVE_TICKET: function ({
            state
        }, data) {
            for (let i in state.transportToday.find(item => item.ticketNumber === data.ticketNumber)) {
                state.transportToday.find(item => item.ticketNumber === data.ticketNumber)[i] = data[i]
            }
        },
        CREATE_NEW_TICKET: function ({
            state
        }, payload) {
            state.transportToday.push(payload);
        },
    },
    mutations: {
        test_mutations: function (state) {
            console.log(state.transportToday);

        }

    },
    getters: {
        allTransportToday(state) {
            return state.transportToday;
        },
        transportOnTer(state) {
            return state.transportToday.filter(item => item.onTer).reverse();
        },
        nextTicketNumber(state) {
            return state.transportToday.length + 1;
        }
    }
};