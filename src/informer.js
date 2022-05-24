
export default function info (type, data) {
  switch (type) {

    case 'empty-id-error':
      console.error(`Yandex Metrika - Init error \n💢 Can't recognition some ID's! Check options.`) 
      break;

    case 'hit-error':
      console.error(`Yandex Metrika - Hit error \n💢 Hit Run with some empty parameters: \nfrom: ${data.from} \nto: ${data.to} `
      ) 
      break;

    case 'hit':
      console.info(`Yandex Metrika - info \n🤜 Hit:\nfrom: ${data.from},\nto: ${data.to} `
      ) 
      break;

    case 'no-counters-error':
      console.error(`Yandex Metrika - Init error \n💢 Can't find any Counters!`) 
      break;

    case 'dev-mode':
      console.info(`Yandex Metrika - Init info \n🔮 Work in Dev mode without send any data`) 
      break;
  }
}
