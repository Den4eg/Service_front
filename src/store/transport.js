export default {
    state: {
        transportToday: [
            {
                ticketNumber: 1,
                onTer: true,
                incomingTime: '08 : 30',
                incomingDate: '10.10.19',
                outgoingTime: '',
                outgoingDate: '',
                carNumber: 'Е 156 ВВ 798',
                carMark: 'Ман',
                trailerNumber: '',
                driverName: 'Фет А.А.',
                driverDocs: '12 32 543654',
                divisionCode: '234-543',
                organisation: 'Мажор',
                phone: '(234) 523-42-34',
                documents: '2314312,2314533,2316677',
                note: '',
                operation: 'отгруз'
            },
            {
                ticketNumber: 2,
                onTer: true,
                incomingTime: '10 : 50',
                incomingDate: '10.10.19',
                outgoingTime: '',
                outgoingDate: '',
                carNumber: 'В 345 АА 788',
                carMark: 'Вольво',
                trailerNumber: '',
                driverName: 'Писец Н.А.',
                driverDocs: '21 23 456234',
                divisionCode: '214-342',
                organisation: 'пек',
                phone: '(364) 564-56-34',
                documents: '2345511,2331122,2356611',
                note: '',
                operation: 'отгруз'
            },
            {
                ticketNumber: 3,
                onTer: true,
                incomingTime: '12 : 20',
                incomingDate: '10.10.19',
                outgoingTime: '',
                outgoingDate: '',
                carNumber: 'Е 001 КХ 737',
                carMark: 'Форд',
                trailerNumber: '',
                driverName: 'Абдалбилбеков А.А.',
                driverDocs: '21 23 456234',
                divisionCode: '341-311',
                organisation: 'DHL',
                phone: '(905) 005-55-55',
                documents: '',
                note: '',
                operation: 'приход'
            },
            {
                ticketNumber: 4,
                onTer: true,
                incomingTime: '15 : 32',
                incomingDate: '10.10.19',
                outgoingTime: '',
                outgoingDate: '',
                carNumber: 'А 111 АА 758 ',
                carMark: 'Лада Ларгус',
                trailerNumber: '',
                driverName: 'Прокурорских П.П.',
                driverDocs: '43 12 436666',
                divisionCode: '326-221',
                organisation: 'ЭксТракЭкспедишенТрейд',
                phone: '(988) 111-11-11',
                documents: '',
                note: '',
                operation: 'отгруз'
            }
        ],
        transportComps: {
            value: [
                ['dl', 'дл', 'дел', 'деловые', 'линии', 'деловые линии'],
                [
                    'м',
                    'мажор',
                    'маж',
                    'мейджер',
                    'мейжер',
                    'мейжор',
                    'мейджор',
                    'мейжор',
                    'major'
                ],
                ['дчл', 'дичел', 'дхл', 'диейчел', 'диейчэл', 'dhl', 'd', 'д'],
                ['пэк', 'пек', 'п'],
                [
                    'ж',
                    'жд',
                    'желдор',
                    'жилдор',
                    'жел',
                    'желдорекспедиция',
                    'желдорэкспедиция',
                    'желдорекспидиция',
                    'желдорэкспидиция'
                ],
                [
                    'эйртранс',
                    'ейртранс',
                    'ейр',
                    'эйр',
                    'айр',
                    'Эайртранс',
                    'э',
                    'а'
                ]
            ],
            colors: [
                '#8f8f8f',
                '#f78317',
                '#df3030',
                '#5630df',
                '#4db64d',
                '#3ecfb7',
                '#3e3e3e00'
            ],
            label: [
                'Деловые Линии',
                'Major',
                'DHL',
                'ПЭК',
                'Желдор',
                'Эйртранс'
            ]
        }
    },
    actions: {
        CREATE_TICKET: ({ state }, payload) => {
            state.transportToday.push(payload);
        }
    },
    mutations: {},
    getters: {
        allTransportToday: function(state) {
            return state.transportToday;
        },
        nextTicketNumber: function(state) {
            return state.transportToday.length + 1;
        },
        transComps: function(state) {
            return state.transportComps;
        }
    }
};
