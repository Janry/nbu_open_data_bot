export const mainKeyboard = [
    [
        {
            text: 'Офіційний курс гривні до іноземних валют та банківських металів',
            callback_data: 'exchange'
        }
    ]
]

export const exchangeKeyboard = [
  [
    {
      text: 'Отримати курс гривні',
      callback_data: 'exchange_all'
    }
  ],
  [
    {
      text: 'Підписатись на отримання змін курсу гривні',
      callback_data: 'exchange_subscribe'
    },
    {
      text: 'Відписатись від отримання змін курсу гривні',
      callback_data: 'exchange_unsubscribe'
    }
  ],
  [
    {
      text: 'Додати валюту до списку обранних',
      callback_data: 'exchange_add'
    },
    {
      text: 'Прибрати валюту з списку обранних',
      callback_data: 'exchange_delete'
    }
  ],
  [
    {
      text: 'Очистити список обранних валют',
      callback_data: 'exchange_reset'
    }
  ],
  [
    {
      text: 'Назад',
      callback_data: 'exchange_back'
    }
  ]
]