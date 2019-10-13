//陆地类
import { Sprite } from "../base/Sprite.js";

import { DataStore } from "../base/DataStore.js";

import { Director } from "../Director.js";

export class Land extends Sprite{
    constructor(){
      const image = Sprite.getImage("land");
      super(
          image,
          0, 
          0,
          image.width, 
          image.height,
          0, 
          DataStore.getInstance().canvas.height - image.height,
          image.width, 
          image.height)
      
      this.landX = 0;  //陆地在水平方向的移动x坐标
      this.landXMoveSpend = Director.getInstance().moveSpeed;  //陆地在水平方向的移动速度
    }

    draw(){

      this.landX = this.landX + this.landXMoveSpend;

      if(this.landX > this.image.width - DataStore.getInstance().canvas.width)
      {
        this.landX = 0;
      }

      super.draw(
              this.image,
              this.srcX, 
              this.srcY,
              this.srcWidth,
              this.srcHeight,
              -this.landX,
              this.y,
              this.width,
              this.height
          );
    }
}