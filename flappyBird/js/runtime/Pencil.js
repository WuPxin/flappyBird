//铅笔类

import { Sprite } from "../base/Sprite.js";

import { DataStore } from "../base/DataStore.js";

import { Director } from "../Director.js";

export class Pencil extends Sprite{
   constructor(image, top){
     super(
            image,
            0,
            0,
            image.width,
            image.height,
            DataStore.getInstance().canvas.width,
            0,
            image.width,
            image.height);
     this.top = top;
     this.speedMove = Director.getInstance().moveSpeed;
   }

    draw(){
      this.x = this.x - this.speedMove;
      super.draw(
            this.image,
            this.srcX,
            this.srcY,
            this.width,
            this.height,
            this.x, 
            this.y,
            this.width,
            this.height
      );
    }
}