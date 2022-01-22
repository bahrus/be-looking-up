import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeLookingUpActions, BeLookingUpVirtualProps, BeLookingUpProps} from './types';


export class BeLookingUpController implements BeLookingUpActions{
    onUrl({url, proxy}: this): void{
        switch(typeof url){
            case 'string':
                proxy.urlVal = url;
                break;
        }
    }
    async onUrlVal({urlVal, as, proxy}: this): Promise<void>{
        const resp = await fetch(urlVal);
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
            virtualProps: ['url', 'urlVal', 'as'],
            primaryProp: 'url',
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
