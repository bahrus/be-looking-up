import {BeDecoratedProps, EventHandler} from 'be-decorated/types';
import {IObserve} from 'be-observant/types';

export interface BeLookingUpVirtualProps{
    url: string | string[] | IObserve;
    urlVal: string;
    as: 'html' | 'json';
}

export interface BeLookingUpProps extends BeLookingUpVirtualProps{
    proxy: Element & BeLookingUpVirtualProps;
}

export interface BeLookingUpActions{
    onUrl(self: this): void;
    onUrlVal(self: this): Promise<void>;
}