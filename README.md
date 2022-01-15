# be-looking-up [TODO]

```html
<select be-looking-up=https://mydomain.com/api/path-to-html></select>
```

If api returns html for options, sets innerHTML.  

If JSON array, uses value or id or first field for value.  Uses name or label or text or second field for inner text.


## Options

```html
<select be-lookup-up='{
    "url": "https://mydomain.com/api/path-to-json",
    "as": "json",
    "params": {
        "id": ".id"
    },
    "mapping": {
        "value": "id",
        "text": "name"
    }
}'></select>
```

params uses be-observant syntax.
