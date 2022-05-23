
# ⚠️ Work in progress - stay tune!

## Modern-Yandex-Metrika
Yandex Metrika for modern frameworks like React, Vue, Svelte, etc.  

### Benefits
👨‍💻   Dev environment support<br>
🤖   SSR support<br>
🚀   3 Init strategy by delay options for better SEO metrics<br>
😎   Self hosted option for bypass blocks<br>
✨   Easy init:
```javascript
import { initMetrika } from 'Modern-Yandex-Metrika'
initMetrika(111222333);
```


[Official Guides from Yandex](https://yandex.ru/support/metrica/index.html)


## Init Metrika public function
### Optional

It's official recommendation by Yandex[^1] but not necessary.  
Create `ym` function inside `<head>` tag of your main `html` template.

```html
<script>
  window.ym=function(){(ym.a=ym.a||[]).push(arguments)};
  ym.l = 1 * new Date();
</script>
```
### Init counter
Init script in your `Main Layout`, default options are presented:

```javascript
import { initMetrika } from 'Modern-Yandex-Metrika'

let params = {
  counters: [{        // For more counters use an array: [{},{}] 
    id: ['string'],
    ['rest options']  // See more on ##Counter options section
  }],
  dev: false,         // Check for dev mode and prevent run if true
  scriptURL: ['url'], // You can use ##Self Hosting metrika script
  useCDN: false,      // Load metrika script from official CND 
  delay: true,        // Init strategy, see ##Init Strategy section 
}

initMetrika(params);
```

## Init options
*Default options are presented*  
- **counter**<br>
- **dev**<br>
- **useCDN: false**<br>
  - `true`<br>
  use the official CDN.
  - `url string`<br>
  It's better option for bypassing adBlock or Sanctions and Censors.<br>
  Download last Metrika JS Library, rename, host on your side and pass url to:
    ```javascript
    initMetrika({useCDN:'/static/metrika.js', counter:222333444});
    ```
- **useCDN**<br>
- **delay**<br>
## Counter options
Just pass counter id for default options:

```javascript
initMetrika(111222333);

// Or more id's for several counters:

initMetrika(111222333, 222333444);

// Or even pass additional options:
initMetrika(
  111222333,
  { 
    name: 'dev',
    id: 222333444,
    webvisor: true,
  }
);

// Or pass init options:
initMetrika(
  {
    dev: isDev(),
    delay: 3000,
    counters: [
      111111222,
      { 
        name: 'dev',
        id: 222333444,
        webvisor: true,
      }
    ]
  }
);
```

### Full list of available options
*Default options are presented*

- **id: number**<br>
Metrika counter id. You can find it [here in first column]('https://metrika.yandex.ru/list')  

- **name: number or string**<br>
Custom counter name. By this name you can call the counter in Methods of Yandex Metrika

- **accurateTrackBounce: true**<br>
    Register non-bounce event
    - `true`: non-bounce event registered after 15000 ms. 
    - `number`: non-bounce events are recorded after the ms. 
    - `false`: disable.

- **childIframe: false**<br>
[Record iframe contents]('https://yandex.ru/support/metrica/webvisor-v2/iframe-support.html#iframe-support') without a tag in a child window

- **clickmap: false**<br>
Collect data for a [Click map]('https://yandex.ru/support/metrica/behavior/click-map.html?lang=en')

- **defer: false**<br>
Disable automatically sending data to Metrika.  
⚠️ Danger zone: if is `true` you must trigger all events by yourself, or app metrics will be empty.

- **ecommerce: false**<br>
  Collect data for Ecommerce.
  - `true`: transmit data via global object: `window.dataLayer`.
  - `string`: custom name for global object.
  - `array`: transmit data in the array.
  - `false`: disable.

- `params: undefined`<br>
Transmit session params during initialization.  
To transmit session parameters at any other time, use the [Params method](#params)

- `userParams: undefined`<br>
Transmit user params during initialization.  
To transmit user parameters at any other time, use the [Params method](#params)


## Init Strategy



[^1]: By official guides we must init `ym` function on top level inside the `<head>` tag. You may have noticed the timestamp `ym.l`? They don't say how it used. Instead, they can use `perfomans.now()` for get page live time. I think it need for better time tracking 🤷‍♂️  Actually Metrika is a Black Box, and we don't know how they used it.
