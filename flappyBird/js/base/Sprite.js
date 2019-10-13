// 游戏精灵的基类，负责初始化精灵加载的资源和大小以及位置背景。陆地，铅笔，小鸟等都是它的子类

import { DataStore } from "./DataStore.js";

export class Sprite{
  constructor(
              image = null,
              srcX = 0,
              srcY = 0,
              srcWidth = 0,
              srcHeight = 0,
              x = 0,
              y = 0,
              width = 0,
              height = 0){  
            this.context = DataStore.getInstance().context;
            this.image = image;
            this.srcX = srcX;
            this.srcY = srcY;
            this.srcWidth = srcWidth;
            this.srcHeight = srcHeight;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height
  }

  static getImage(key){
      return DataStore.getInstance().res.get(key);
  }

  draw(
      image = this.image,
      srcX = this.srcX,
      srcY = this.srcY,
      srcWidth = this.srcWidth,
      srcHeight = this.srcHeight,
      x = this.x,
      y = this.y,
      width = this.width,
      height = this.height
    )
  {
    this.context.drawImage(
        image,
        srcX, 
        srcY, 
        srcWidth, 
        srcHeight, 
        x, 
        y, 
        width, 
        height
    );
  }
}