//导演类，用来控制游戏的逻辑和精灵的创建与销毁，控制游戏主循环

import { DataStore } from "./base/DataStore.js";
import { UpPencil } from "./runtime/UpPencil.js";
import { DownPencil } from "./runtime/DownPencil.js";

export class Director{
    
    constructor(){
       this.dataStore = DataStore.getInstance();
       this.moveSpeed = 2;
       this.timer = null;
    }

    //单例模式
    static getInstance(){
       if(!Director.instance)
       {
            Director.instance = new Director();
       }

       return Director.instance;
    }
    
    createPencil(){

      let minTop = this.dataStore.canvas.height / 8;

      let maxTop = this.dataStore.canvas.height / 2;

      let top = minTop + Math.random() * ( maxTop - minTop);
      
      this.dataStore.get("pencils").push(new UpPencil(top));

      this.dataStore.get("pencils").push(new DownPencil(top));

    }

    //让小鸟飞起来
    birdsEvent(){
      console.log("小鸟飞起来啦");
      const birds = this.dataStore.get("birds");
      for(let i = 0; i <= 2; i++)
      {
        //  console.log(birds);
        birds.y[i] = birds.birdsY[i];
      }

      birds.time = 0;  //下落时间重置为0
      // console.log(birds);
    }

    //判断小鸟是否撞击到铅笔，如果撞击了返回false
    isStrikePencil(birds, pencil){
       if(birds.top > pencil.bottom || birds.bottom < pencil.top || birds.left > pencil.right || birds.right < pencil.left)
       {
          return true;
       }
       else
       {
          return false;
       }
    }

    //判断小鸟是否和陆地和铅笔发生碰撞
    check(){
        
        const birds = this.dataStore.get("birds");
        const land = this.dataStore.get("land");
        const pencils = this.dataStore.get("pencils");
        const score = this.dataStore.get("score");

        //如果小鸟和陆地发生碰撞，就GameOver
        if(birds.birdsY[0] + birds.birdsHeight[0] >= land.y)
        {
            console.log("撞到陆地啦");
            this.isGameOver = true;
            return;
        }

        //创建小鸟的边框模型
        const birdsBorder = {
          top: birds.y[0],
          bottom: birds.birdsY[0] + birds.birdsHeight[0],
          left: birds.birdsX[0],
          right: birds.birdsX[0] + birds.birdsWidth[0]
        }

        for(let i = 0; i < pencils.length; i++)
        {
            const pencil = pencils[i];
            // console.log(pencil);

            //创建当前这支铅笔的边框模型
            const pencilBorder = {
                top: pencil.y,
                bottom : pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            }

            if(!this.isStrikePencil(birdsBorder, pencilBorder)){
                console.log("撞到铅笔啦");
                this.isGameOver = true;
                return;
            }

        }

        //加分
        if(birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore)
        {
            console.log("加分啦");

            // 使手机发生较短时间的振动（15 ms）
            wx.vibrateLong();
            score.scoreNumber++;
            score.isScore = false;
        }

    }

    //运行
    run(){

        this.check();
        
        if(!this.isGameOver)
        {
            const pencils = this.dataStore.get("pencils");

            if(pencils[0].x + pencils[0].width <=0 && pencils.length == 4)
            {
                pencils.shift();
                pencils.shift();
                this.dataStore.get("score").isScore = true;
            }

            if(pencils[0].x < (this.dataStore.canvas.width - pencils[0].width)/2 && pencils.length == 2)
            {
                this.createPencil();
            }

            this.dataStore.get("background").draw();

            pencils.forEach((pencil)=>{
                pencil.draw();
            })

            this.dataStore.get("land").draw();

            this.dataStore.get("score").draw();

            this.dataStore.get("birds").draw();

            this.timer = requestAnimationFrame(() => {
              this.run();
            })
        
        }
        else
        {
            console.log("游戏停止");
            //取消由 requestAnimationFrame 添加到计划中的动画帧请求
            cancelAnimationFrame(this.timer);
            this.dataStore.get("startButton").draw();
            //销毁各个精灵对象
            this.dataStore.destroy();
            //垃圾回收
            wx.triggerGC();
        }

    }

}