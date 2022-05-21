
# ⚠️ Work in progress - stay tune!

## Modern-Yandex-Metrika
Yandex Metrika for modern frameworks like React, Vue, Svelte, etc.  

### Benefits
👨‍💻   Prevent run on Dev Environment  
🤖   Prevent run on server during SSR render  
🚀   [3 Init strategy](#init-strategy) for better SEO metrics  
😎   [Self hosted option](#init-strategy) for bypass blocks  
✨   Easy init:

```javascript
import { initMetrika } from 'Modern-Yandex-Metrika'
initMetrika({counter: 000111222});
```


[Official Guides from Yandex](https://yandex.ru/support/metrica/index.html)


## Init Metrika Public function
### Optional

It's official recommendation by Yandex[^1] but not necessary.  
Create `ym` function inside `<head>` tag of your main `html` template.

```html
<script>
  window.ym=function(){(ym.a=ym.a||[]).push(arguments)};
  ym.l = 1 * new Date();
</script>
```
### init Metrika Counter
Init script in your `Main Layout`, default options are presented:

```javascript
import { initMetrika } from 'Modern-Yandex-Metrika'

let params = {
  counter: {          // For more counters use an array: [{},{}] 
    id: ['string'],
    ['rest options']  // See more on ##Counter options section
  },
  dev: false,         // Check for dev mode and prevent run if true
  scriptURL: ['url'], // You can use ##Self Hosting metrika script
  useCDN: false,      // Load metrika script from official CND 
  delay: true,        // Init strategy, see ##Init Strategy section 
}

initMetrika(params);
```

## Metrika Options
*Default options are presented*  

`counter`  
`dev`  
### Hosting: `useCDN: false`
- `true`: use official CDN.  
- `url string`: It's better option for bypassing adBlock or Sanctions and Censors.
Download last Metrika JS Library, rename, host on your side and pass url to 

```javascript
initMetrika({useCDN:'/static/metrika.js', counter:222333444});
```
`useCDN`  
`delay`  
## Counter options
Just pass counter id for default options:
```javascript
initMetrika({ counter: 000111222 });
```

Or more id's for several counters:
```javascript
initMetrika({
  counter: [ 000111222, 333444555 ]
});
```

Or even pass additional options for 3 different counters:
```javascript
initMetrika({
  counter: [
    000111222,
    { 
      name: 1,
      id: 333444555,
      webvisor: true,
    },
    { 
      name: 2,
      id: 666777888,
      defer: false,
    },
  ]
});
```

### Full list of available options 
*Default options are presented*  

`id: number`  
Metrika counter id. You can find it [here in first column]('https://metrika.yandex.ru/list')  

`name: number or string`  
Custom counter name. By this name you can call the counter in Methods of Yandex Metrika

`accurateTrackBounce: true`  
Register non-bounce event
- `true`: non-bounce event registered after 15000 ms. 
- `number`: non-bounce events are recorded after the ms. 
- `false`: disable.

`childIframe: false`  
[Record iframe contents]('https://yandex.ru/support/metrica/webvisor-v2/iframe-support.html#iframe-support') without a tag in a child window

`clickmap: false`  
Collect data for a [Click map]('https://yandex.ru/support/metrica/behavior/click-map.html?lang=en')

`defer: false`  
Disable automatically sending data.  
⚠️ Danger zone: if is `true` you must trigger all events by yourself, or data will be empty

`ecommerce: false`  

Collect data for Ecommerce.

- `true`: transmit data via global object: `window.dataLayer`.
- `string`: custom name for global object.
- `array`: transmit data in the array.
- `false`: disable.

`params: undefined`  
Transmit session params during initialization.  
To transmit session parameters at any other time, use the [Params method](#params)

`userParams: undefined`  
Transmit user params during initialization.  
To transmit user parameters at any other time, use the [Params method](#params)


## Init Strategy



[^1]: By official guides we must init `ym` function on top level inside the `<head>` tag. You may have noticed the timestamp `ym.l`? They don't say how it used. Instead, they can use `perfomans.now()` for get page live time. I think it need for better time tracking 🤷‍♂️  Actually Metrika is a Black Box, and we don't know how they used it.