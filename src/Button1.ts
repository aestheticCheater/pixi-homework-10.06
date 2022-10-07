

import { Button } from "./Button";
import { Game } from "./Game";
import { EventDispatcher } from "./EventDispatcher";

// import { GameApplication } from "./GameApplication";
// RESEARCH ABOUT SINGLETON
//SINGLETON IS A CLASS THAT YOU DONT EXTEND, THEY CAN ONLY EXIST ONCE IN THE STRUCTURE AND IS A GLOBAL ACCESS FOR EVERYBODY

export class Button1 extends Button {
    constructor(label: string) {
        super(label)
    }
    protected init() {
        super.init()
    }


    protected onPointerUp() {
        super.onPointerUp

        EventDispatcher.getInstance().getDispatcher().emit('changebtnup');
    }

    protected onPointerDown() {
        super.onPointerDown()
        EventDispatcher.getInstance().getDispatcher().emit('changebtndown');

    }


}
