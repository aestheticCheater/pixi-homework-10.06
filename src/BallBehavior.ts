import * as PIXI from 'pixi.js'
import { GameObjectBehavior } from "./GameObjectBehavior";
import { GameObject } from "./GameObject";
import {GameApplication} from './GameApplication'
export class BallBehavior extends GameObjectBehavior {
    private ball: PIXI.Sprite;
    private velocity:number = 10;
    private keyPressed: boolean = false;
    private squareObjRef: GameObject;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    
    public destroy() {
        this.ball.destroy({ texture:true, baseTexture:true});
        this.gameObjRef.removeChild(this.ball); // good practice to remove it after destroy function to be sure
    }


    

    /* All the display type in pixi  have their own destroy function 
      You need to set baseTexture and texture to true in the destroy function, to be sure that the memory will be cleaned.
      There can be only one original baseTexture and many textures. Texture is a viewport to the baseTexture.
      baseTexture is the original that stays in the memory.
    */

    protected init() {
        this.createBall();
        this.setKeyCallbackEvent();
   
    }
    
    private setKeyCallbackEvent() {
        this.onKeyUp = this.onKeyUp.bind(this);
        window.addEventListener('keyup', this.onKeyUp)
    }

    private createBall() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xffffff);
        gfx.drawCircle(0, 0, 20);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.ball = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.ball);
    }

    public BallRef() {
        const ballObjRef = this.gameObjRef;
        return ballObjRef;
    }
    
    public update(delta: number) {

        if (!this.keyPressed) {
            return;
        }
        if (this.gameObjRef.x + this.gameObjRef.width + this.velocity * delta < 503) {
            console.log(this.squareObjRef);
            this.gameObjRef.x += this.velocity * delta;
                     
        } 
    }
    
    private onKeyUp(e: KeyboardEvent) {
        if (e.code === 'Space') {
            this.keyPressed = true;


        }
    }
}