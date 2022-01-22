import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeLookingUpActions, BeLookingUpVirtualProps, BeLookingUpProps} from './types';
import {hookUp} from 'be-observant/hookUp.js';

export class BeLookingUpController implements BeLookingUpActions{
    onUrl({url, proxy}: this): void{
        hookUp(url, proxy, 'urlVal');
    }
    onInProgressClass({inProgressClass, proxy}: this): void {
        hookUp(inProgressClass, proxy, 'inProgressClassVal');
    }
    async onUrlVal({urlVal, as, proxy, baseLink, inProgressClassVal}: this): Promise<void>{
        const resp = await fetch(urlVal!);
        switch(as){
            case 'html':
                proxy.insertAdjacentHTML('beforeend', await resp.text());
                break;
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
            //intro,
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
