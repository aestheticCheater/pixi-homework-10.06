import * as PIXI from 'pixi.js'
import { GameObject } from "./GameObject";
import { GameObjectBehavior } from "./GameObjectBehavior";
import { GameApplication } from './GameApplication';
import { EventDispatcher } from './EventDispatcher';
export class SquareBehavior extends GameObjectBehavior {
    private square: PIXI.Sprite;
    private velocity: number = 10;
    public ballObjRef: GameObject;
    /*
     not the best way because we are passing references around
     this creates dependacies which can make mess if new thing is added
     a better way is to make a collision system with collision manager
     who is checking is there anybody colliding with anybody
    */
    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    public destroy() {
        this.square.destroy({ texture: true, baseTexture: true });
        this.gameObjRef.removeChild(this.square);
    }

    public setBallObjRef(gameObj: GameObject) {
        this.ballObjRef = gameObj;

    }

    protected init()  {
        this.createSquare();
    }
   


    private createSquare() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xff0000);
        gfx.drawRect(0, 0, 100, 100);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.square = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.square);
    }
 
    
    
    private move() {
        // this.gameObjRef.x = GameApplication.getApp().view.width - this.gameObjRef.width;
        
        // this.ballObjRef.x = GameApplication.getApp().view.width - this.gameObjRef.x + this.gameObjRef.width + 40;
        
    }
    
    
    
    
 
    public update(delta: number) {
        let wasHit: boolean = false;
        if (!wasHit && this.ballObjRef.x + this.ballObjRef.width >= this.gameObjRef.x
            && this.ballObjRef.x < this.gameObjRef.x + this.gameObjRef.width
            && this.ballObjRef.y + this.ballObjRef.height >= this.gameObjRef.y
            && this.ballObjRef.y < this.gameObjRef.y + this.gameObjRef.height) {
            wasHit = true;
            if (this.gameObjRef.y = GameApplication.getApp().view.height - this.gameObjRef.height) {
                let gameLoop =  setInterval(() => {
                    this.gameObjRef.y += this.velocity * delta;
                    if (this.gameObjRef.y >= GameApplication.getApp().view.height - this.gameObjRef.height)
                    {
                        clearInterval(gameLoop);

                    }
                }, 10)
             
              
            }        
             
     EventDispatcher.getInstance().getDispatcher().emit('updatescore');
            
            
            }
          
            if (wasHit) {
                this.move();
                
            }
            
            
        }
        // this.gameObjRef.width *= 0.9; // this will reduce the width by 90%
        // this.destroy(); // our square is destroyed when the ball intersects with it
 
    }
    
        // if (this.gameObjRef.x + this.gameObjRef.width + this.velocity * delta < GameApplication.getApp().view.width) {
                    
        //     this.gameObjRef.x += this.velocity * delta;
        // }
        // else {
        //     this.gameObjRef.x = GameApplication.getApp().view.width - this.gameObjRef.width;
        // }

    
