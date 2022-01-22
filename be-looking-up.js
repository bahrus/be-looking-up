import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/be-decorated.js';
import { hookUp } from 'be-observant/hookUp.js';
export class BeLookingUpController {
    onUrl({ url, proxy }) {
        hookUp(url, proxy, 'urlVal');
    }
    onInProgressClass({ inProgressClass, proxy }) {
        hookUp(inProgressClass, proxy, 'inProgressClassVal');
    }
    async onUrlVal({ urlVal, as, proxy, baseLink, inProgressClassVal }) {
        const resp = await fetch(urlVal);
        switch (as) {
            case 'html':
                proxy.innerHTML = await resp.text();
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
            virtualProps: ['url', 'urlVal', 'as', 'baseLink', 'inProgressClass', 'inProgressClassVal', 'method', 'methodVal', 'mode', 'credentials', 'cache', 'redirect', 'referrerPolicy'],
            primaryProp: 'urlVal',
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
