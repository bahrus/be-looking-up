import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeLookingUpActions, BeLookingUpVirtualProps, BeLookingUpProps} from './types';
import {hookUp} from 'be-observant/hookUp.js';

export class BeLookingUpController implements BeLookingUpActions{
    #beDecorProps!: BeDecoratedProps;
    intro(proxy: Element & BeLookingUpVirtualProps, target: Element, beDecorProps: BeDecoratedProps){
        this.#beDecorProps = beDecorProps;
    }
    onUrl({url, proxy}: this): void{
        hookUp(url, proxy, 'urlVal');
    }
    onInProgressClass({inProgressClass, proxy}: this): void {
        hookUp(inProgressClass, proxy, 'inProgressClassVal');
    }
    async onUrlVal({urlVal, as, proxy, baseLink, inProgressClassVal}: this): Promise<void>{
        if(inProgressClassVal){
            proxy.classList.add(inProgressClassVal);
        }
        const resp = await fetch(urlVal!);
        switch(as){
            case 'html':
                proxy.innerHTML = await resp.text();
                break;
            case 'json':
                {
                    let templ = proxy.querySelector(`template[${this.#beDecorProps.ifWantsToBe + '-template'}]`);
                    if(templ === null){
                        templ = document.createElement('template');
                        templ.setAttribute(this.#beDecorProps.ifWantsToBe + '-template', '');
                        proxy.prepend(templ);
                    }
                    (<any>templ).value = await resp.json();
                    templ.dispatchEvent(new CustomEvent('value-changed', {
                        detail: {
                            value: (<any>templ).value,
                        }
                    }));
                }

                break;
        }
        if(inProgressClassVal){
            proxy.classList.remove(inProgressClassVal);
        }
    }
}

export interface BeLookingUpController extends BeLookingUpProps{}

const tagName = 'be-looking-up';

const ifWantsToBe = 'looking-up';

const upgrade = '*';

define<BeLookingUpProps & BeDecoratedProps<BeLookingUpProps, BeLookingUpActions>, BeLookingUpActions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            forceVisible: [upgrade],
            virtualProps: ['url', 'urlVal', 'as', 'baseLink', 'inProgressClass', 'inProgressClassVal', 'method', 'methodVal', 'mode', 'credentials', 'cache', 'redirect', 'referrerPolicy'],
            primaryProp: 'urlVal',
            proxyPropDefaults: {
                as: 'html',
            },
            intro: 'intro',
            //finale
        },
        actions:{
            onUrl: 'url',
            onUrlVal: 'urlVal',
        }
    },
    complexPropDefaults:{
        controller: BeLookingUpController
    }
});

register(ifWantsToBe, upgrade, tagName);