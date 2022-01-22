import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/be-decorated.js';
import { hookUp } from 'be-observant/hookUp.js';
export class BeLookingUpController {
    #beDecorProps;
    #abortController;
    intro(proxy, target, beDecorProps) {
        this.#beDecorProps = beDecorProps;
    }
    onUrl({ url, proxy }) {
        hookUp(url, proxy, 'urlVal');
    }
    onInProgressClass({ inProgressClass, proxy }) {
        hookUp(inProgressClass, proxy, 'inProgressClassVal');
    }
    async onUrlValPre({ urlVal, proxy, debounceDuration }) {
        setTimeout(() => {
            proxy.urlValEcho = urlVal;
        }, debounceDuration);
    }
    async onUrlVal({ urlVal, urlValEcho, as, proxy, fetchInProgress, baseLink, inProgressClassVal }) {
        if (urlVal !== urlValEcho) {
            return;
        }
        if (this.#abortController !== undefined) {
            if (fetchInProgress) {
                this.#abortController.abort();
            }
        }
        else {
            this.#abortController = new AbortController();
        }
        if (inProgressClassVal) {
            proxy.fetchInProgress = true;
            proxy.classList.add(inProgressClassVal);
        }
        const resp = await fetch(urlVal);
        switch (as) {
            case 'html':
                proxy.innerHTML = await resp.text();
                break;
            case 'json':
                {
                    let templ = proxy.querySelector(`template[be-${this.#beDecorProps.ifWantsToBe}-template]`);
                    if (templ === null) {
                        templ = document.createElement('template');
                        templ.setAttribute(`be-${this.#beDecorProps.ifWantsToBe}-template`, '');
                        proxy.prepend(templ);
                    }
                    templ.value = await resp.json();
                    templ.dispatchEvent(new CustomEvent('value-changed', {
                        detail: {
                            value: templ.value,
                        }
                    }));
                }
                break;
        }
        if (inProgressClassVal) {
            proxy.classList.remove(inProgressClassVal);
            proxy.fetchInProgress = false;
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
            virtualProps: [
                'url', 'urlVal', 'urlValEcho', 'as', 'baseLink', 'inProgressClass', 'inProgressClassVal',
                'method', 'methodVal', 'mode', 'credentials', 'cache', 'redirect',
                'referrerPolicy', 'fetchInProgress', 'debounceDuration'
            ],
            primaryProp: 'urlVal',
            proxyPropDefaults: {
                as: 'html',
                fetchInProgress: false,
                debounceDuration: 20,
            },
            intro: 'intro',
            //finale
        },
        actions: {
            onUrl: 'url',
            onUrlValPre: 'urlVal',
            onUrlVal: 'urlValEcho',
        }
    },
    complexPropDefaults: {
        controller: BeLookingUpController
    }
});
register(ifWantsToBe, upgrade, tagName);
