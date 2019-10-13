//计分器类

import { DataStore } from "../base/DataStore.js";

export class Score{
  constructor(){
     this.context = DataStore.getInstance().context;
     this.scoreNumber = 0;
     this.isScore = true; //由于canvas刷新很快，所以设置一个变量来控制加分，只加一次
  }

  draw(){
    this.context.fillStyle = "#FF3A01";
    this.context.font = "30px Arial";
    this.context.fillText(
      this.scoreNumber,
      DataStore.getInstance().canvas.width / 2,
      DataStore.getInstance().canvas.height / 18
    );
  }
}