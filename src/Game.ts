/* homework : The ball hit the red square, the red square become blue and start moving down to the bottom of the screen. And we add score. */
import * as PIXI from 'pixi.js';
import { GameObject } from './GameObject';
import { BallBehavior } from './BallBehavior';
import { SquareBehavior} from './SquareBehavior';
import { Button1 } from './Button1';
import { Button2 } from './Button2';
import { GameApplication } from './GameApplication';
import { EventDispatcher } from './EventDispatcher';
import {ScoreView } from './ScoreView'
import { Model } from './Model'
import { SquareBehavior2 } from './SquareBehavior2';
export class Game extends PIXI.Container {

    private gameObjects: Map<string, GameObject>;
    private ticker: PIXI.Ticker;

    private gameObjectContainer: PIXI.Container;
    private uiContainer: PIXI.Container;   

    private changeBehaviorBtn: Button1;
    private initialBehaviorBtn: Button2;
    private scoreView: ScoreView; 

    constructor() {
        super();
        this.init();
       
    }
   


    private init() {
        this.createGameObjContainer();
        // this.createMask();
        this.createTicker();
        this.createGameObjList();
        this.createUIContainer();
        this.createButton();
        this.createGameObj();
        this.createScoreView();
    }

    private createMask() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xff0000);
        gfx.drawRect(0, 0, 400, 400);
        gfx.endFill();

        const texture1: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        const square: PIXI.Sprite = new PIXI.Sprite(texture1);

        gfx.clear();
        gfx.beginFill(0x0000ff);
        gfx.drawCircle(100, 100, 100);
        gfx.endFill();

        const texture2: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        const circle: PIXI.Sprite = new PIXI.Sprite(texture2);
        square.mask = gfx;
        this.gameObjectContainer.addChild(square);
        // this.gameObjectContainer.addChild(circle);
        // this.gameObjectContainer.mask = circle;

    }
     

    private createScoreView() {
        this.scoreView = new ScoreView(0)
        this.scoreView.x = 50;
        this.scoreView.y = 10;
        
        this.uiContainer.addChild(this.scoreView);
    }
    

    private createGameObjList() {
        this.gameObjects = new Map<string, GameObject>();
    }

    private createGameObjContainer() {
    
        this.gameObjectContainer = new PIXI.Container();
        this.addChild(this.gameObjectContainer);
    }
    
    private createUIContainer() {
        this.uiContainer = new PIXI.Container();
        this.addChild(this.uiContainer);
    }

    private createButton() {
        this.changeBehaviorBtn = new Button1('Change behavior');
    
        this.changeBehaviorBtn.x = 400;
        this.changeBehaviorBtn.y = GameApplication.getApp().view.height - this.changeBehaviorBtn.height - 50;
        EventDispatcher.getInstance().getDispatcher().addListener('changeBtnUp',this.onChangeBtnUp, this);
 
        this.uiContainer.addChild(this.changeBehaviorBtn);
 

        this.initialBehaviorBtn = new Button2('Initial behavior');

        this.initialBehaviorBtn.x = 100;
        this.initialBehaviorBtn.y = GameApplication.getApp().view.height - this.initialBehaviorBtn.height - 50;
        EventDispatcher.getInstance().getDispatcher().addListener('initBtnUp',this.onChangeBtnUp, this);
      

        this.uiContainer.addChild(this.initialBehaviorBtn);
    }

    private createTicker() {
        this.ticker = new PIXI.Ticker();
        this.ticker.add(this.update, this);
        this.ticker.start();
    }

    private createGameObj() {
        this.createBallGameObj();
        this.createSquareGameObj();
    }
    
    private createBallGameObj() {
        const ballGameObj: GameObject = new GameObject('gameObj1'); 
        // const ballBehavior: BallBehavior = new BallBehavior(ballGameObj);
        // ballGameObj.addBehavior(ballBehavior);

        ballGameObj.x = 100;
        ballGameObj.y = 100;
          
    
        this.addGameObject(ballGameObj);
        
        const ballBehavior: BallBehavior = new BallBehavior(ballGameObj);
        ballGameObj.addBehavior('ballBehavior', ballBehavior);
    }

 
    private createSquareGameObj() {
        
        const squareGameObj: GameObject = new GameObject('gameObj2'); 

            squareGameObj.x = 500;
            squareGameObj.y = 100;
            

      
        
        this.addGameObject(squareGameObj);
        
        const squareBehavior: SquareBehavior = new SquareBehavior(squareGameObj);
        
        
        squareBehavior.setBallObjRef(this.getGameObjById('gameObj1'));
        squareGameObj.addBehavior('squareBehavior', squareBehavior);
        
        EventDispatcher.getInstance().getDispatcher().addListener('updatescore', this.onScoreUpdate, this); // SINGLETON RULE IS TO ALWAYS CALL THE getInstance(); :D
    } 
    

    private addGameObject(gameObj: GameObject) {
       
        this.gameObjectContainer.addChild(gameObj);
        this.gameObjects.set(gameObj.getId(), gameObj);

    }

    // private createSquareGameObj() {
    //     const squareGameObj: GameObject = new GameObject('gameObj2');
    //     const squareBehavior: SquareBehavior = new SquareBehavior(squareGameObj);
    //     squareGameObj.addBehavior(squareBehavior);
    //     this.gameObjectContainer.addChild(squareGameObj);
    //     this.gameObjects.push(squareGameObj);
    // }

  private update(delta:number) {
        this.gameObjects.forEach(gameObj => {
            gameObj.update(delta);
        });
    }


    

    private getGameObjById(id: string) {
        if (!this.gameObjects.has(id)) {
            return null;
        }
        return this.gameObjects.get(id);
    }

    private onInitBtnUp() {
        console.log('onInitBtnUp');
        // const gameObj: GameObject = this.getGameObjById('gameObj1');
   
        // if(!gameObj) {
        //     return;
        // }
        // const squareBehavior: SquareBehavior = new SquareBehavior(gameObj);
        //     gameObj.addBehavior('squareBehavior',squareBehavior);

    }

    private onChangeBtnUp() {
        console.log('onChangeBtnUp' );

        const gameObj: GameObject = this.getGameObjById('gameObj1');
   
        if(!gameObj) {
            return;
        }

    
    }
 
    private onScoreUpdate() {
        let currentScore: number = Model.getInstance().getScore() + 1;
        Model.getInstance().setScore(currentScore);
        this.scoreView.setScore(Model.getInstance().getScore());
        

        this.getGameObjById('gameObj2').removeBehavior('squareBehavior');
        this.getGameObjById('gameObj2').addBehavior('ballBehavior', new SquareBehavior2(this.getGameObjById('gameObj2')));
    // let gameLoop = setInterval(() => {
    //         gameObj.y += 10;
            
    //     }, 100)
        // if (currentScore == 1) {
        //     gameObj.y = GameApplication.getApp().view.height - gameObj.height;
        // }
       
    }
 
}
/*The ball hit the red square, the red square become blue and start moving down to the bottom of the screen. And we add score. */