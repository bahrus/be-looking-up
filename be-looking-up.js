import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/be-decorated.js';
export class BeLookingUpController {
    onUrl({ url, proxy }) {
        switch (typeof url) {
            case 'string':
                proxy.urlVal = url;
                break;
        }
    }
    async onUrlVal({ urlVal, as, proxy }) {
        const resp = await fetch(urlVal);
        switch (as) {
            case 'html':
                proxy.insertAdjacentHTML('beforeend', await resp.text());
                break;
        }
    }
}
const tagName = 'be-looking-up';
const ifWantsToBe = 'looking-up';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            forceVisible: [upgrade],
            virtualProps: ['url', 'urlVal', 'as'],
            primaryProp: 'url',
            proxyPropDefaults: {
                as: 'html',
            },
            //intro,
            //finale
        },
        actions: {
            onUrl: 'url',
            onUrlVal: 'urlVal',
        }
    },
    complexPropDefaults: {
        controller: BeLookingUpController
    }
});
register(ifWantsToBe, upgrade, tagName);
