# be-looking-up [TODO]

Attribute-based DOM decorator/behavior equivalent of xtal-fetch.

```html
<select>
    <template be-looking-up=https://images-api.nasa.gov/search?debiaski></template>
</select>
```

If api returns html for options, replace template with HTML.  

However, JSON also supported, but requires more work:

## Options

```html
<label for=target>Target</label>
<select id=target>
    <template be-looking-up='{
        "url": "https://images-api.nasa.gov/search",
        "reqInit": {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": "Bearer <token>"
            }
        },
        "as": "json",
        "hostAdjuster": "myHostMethod",
        "cache": true,
        "path":[

        ],
        "params": {
            "search": ["debiaski"],
        },
        "templateTransform": {
            "option": [{"textContent": "name", "value": "id"}]
        }
    }'>
        <option></option>
    </template>
</select>
```

params uses be-observant syntax.

consistent syntax with be-reformable.

## Dependencies, support for html and json

```html
<label for=target>Target</label>
<select id=target>
    <template be-looking-up='{
        "url": "https://images-api.nasa.gov/search",
        "reqInit": {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": "Bearer <token>"
            }
        },
        "as": "json",
        "cache": true,
        "path":[

        ],
        "params": {
            "search": ["debiaski"],
        },
        "transform": {
            "option": [{"textContent": "name", "value": "id"}]
        }
    }'>
        <option></option>
    </template>
</select>

<label for=object>Object</label>
<select id=object>
    <template be-looking-up='{
        "url": "https://images-api.nasa.gov/",
        "reqInit": {
            "method": "GET",
            "headers": {
                "Accept": "text/html",
                "Authorization": "Bearer <token>"
            }
        },
        "as": "html",
        "xslt": "https://mydomain.com/api/path-to-xslt",
        "path": [
            "asset",
            {
                "observe": "target",
            }
        ],
        "mapping": {
            "value": "id",
            "text": "name"
        }
    }'>
        
    </template>
</select>
```

xslt is optional.  If not provided, then the content inside the template can provide the xslt.  If no xslt provided inside the template, then just paste the html inside as is.

