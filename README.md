# be-looking-up [TODO]

```html
<select be-looking-up=https://mydomain.com/api/path-to-html></select>
```

If api returns html for options, sets innerHTML.  

If JSON array, uses value or id or first field for value.  Uses name or label or text or second field for inner text.


## Options

```html
<label for=target>Target</label>
<select id=target be-looking-up='{
    "url": "https://mydomain.com/api/path-to-json",
    "as": "json",
    "cache": true,
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

## XSLT

```html
<label for=object>Object</label>
<select id=object be-looking-up='{
    "url": "https://mydomain.com/api/path-to-json",
    "as": "html",
    "xslt": "https://mydomain.com/api/path-to-xslt",
    "params": {
        "id": ".id"
    },
    "mapping": {
        "value": "id",
        "text": "name"
    }
}'></select>
```

xslt is optional

