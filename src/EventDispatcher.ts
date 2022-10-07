// SINGLETON IS A DESIGN PATTERN 
import * as PIXI from 'pixi.js';

export class EventDispatcher{

    private dispatcher: PIXI.utils.EventEmitter;
    private static instance: EventDispatcher;

    private constructor() {
        this.init();
    }
 
    private init() {
        this.dispatcher = new PIXI.utils.EventEmitter();
    }

    public static getInstance(): EventDispatcher {
            if(!this.instance) {
                this.instance = new EventDispatcher();
            }
            
            return this.instance;

}

    public getDispatcher(): PIXI.utils.EventEmitter {
        return this.dispatcher;
 }
    
}