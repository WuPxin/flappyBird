//小鸟类
//三只小鸟代表了三种状态

import { Sprite } from "../base/Sprite.js";

import { DataStore } from "../base/DataStore.js";

export class Birds extends Sprite{
  constructor(){
    const image = Sprite.getImage("birds");
    super(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      image.width,
      image.height
    );

    //小鸟的宽34，高24，上下边距是10，左右的边距是9

    this.clippingX = [
        9,
        9 + 34 + 18,
        9 + 34 + 18 + 34 + 18];
    this.clippingY = [10, 10, 10];
    this.clippingWidth = [34, 34, 34];
    this.clippingHieght = [24, 24, 24];
    const birdsX = DataStore.getInstance().canvas.width / 4;
    this.birdsX = [birdsX, birdsX, birdsX];
    const birdsY = DataStore.getInstance().canvas.height / 2;
    this.birdsY = [birdsY, birdsY, birdsY];
    this.birdsWidth = [34, 34, 34];
    this.birdsHeight = [24, 24, 24];

    this.y = [birdsY, birdsY, birdsY];
    
    this.index = 0; //默认是第1小鸟的索引位置
    this.count = 0;  //循环小鸟的个数
    this.time = 0;  //下落时间
  }

  draw()
  {
    const speed = 0.2;

    this.count = this.count + speed;

    // 0 1 2
    if(this.index >= 2 )
    {
        this.count = 0;
    } 

    this.index = Math.floor(this.count);

    // 自由落体公式 h = 1 / 2gt²

    //模拟重力加速度
    const g = 9.8 / 24;

    //设置小鸟向上移动一丢丢的偏移量
    const offsetUp = 30;

    //自由落体的高度
    const offsetHight = g * this.time * (this.time - offsetUp ) / 2;

    for(let i = 0 ; i <= 2; i++)
    {
      this.birdsY[i] = this.y[i] + offsetHight;

      if(this.birdsY[i] < 0)
      {
          this.birdsY[i] = 0;
      }

    }

    this.time++;

    super.draw(
       this.image,
       this.clippingX[this.index],
       this.clippingY[this.index],
       this.clippingWidth[this.index],
       this.clippingHieght[this.index],
       this.birdsX[this.index],
       this.birdsY[this.index],
       this.birdsWidth[this.index],
       this.birdsHeight[this.index]
     )
  }

}