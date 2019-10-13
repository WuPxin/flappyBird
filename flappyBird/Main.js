//游戏主文件，主要用来初始化canvas和一些全局对象，各个精灵和事件，作为游戏开始的入口

import { ResourceLoader } from "./js/base/ResourceLoader.js";

import { DataStore } from "./js/base/DataStore.js";

import { Background } from "./js/runtime/Background.js";

import { Land } from "./js/runtime/Land.js";

import { Director } from "./js/Director.js";

import { Birds } from "./js/player/Birds.js";

import { StartButton } from "./js/player/StartButton.js";

import { Score } from "./js/player/Score.js";

export class Main{
   constructor(){

      this.dataStore = DataStore.getInstance();

      this.director = Director.getInstance();

      // console.log(this.dataStore);

      //创建画布
      this.canvas = wx.createCanvas();

      //创建一个2d context 对象
      this.context = this.canvas.getContext("2d");

      const Loader = ResourceLoader.create();

      Loader.onLoaded(map => this.resourceFirstLoader(map))
   }

   resourceFirstLoader(map){
     //  console.log(map);
     //  console.log(this.dataStore);
     this.dataStore.canvas = this.canvas;
     this.dataStore.context = this.context;
     this.dataStore.res = map;
     this.createBackgroundMusic();
     this.init();
   }

   createBackgroundMusic(){
     const bgm = wx.createInnerAudioContext();
     bgm.autoplay = true;
     bgm.loop = true;
     bgm.src = "audios/bgm.mp3";
   }

   init(){
 
     this.director.isGameOver = false; //假设游戏没有停止
 
     this.dataStore.put('background', Background)
                   .put('land', Land)
                   .put('pencils', [])
                   .put('birds', Birds)
                   .put('startButton', StartButton)
                   .put('score', Score);

     this.registerEvent();

     //创建铅笔要在游戏逻辑运行之前
     this.director.createPencil();

     this.director.run();

  }

 
  registerEvent(){
      wx.onTouchStart( () => {
          console.log("触摸事件开始");
          if(this.director.isGameOver)
          {
            console.log("游戏开始");

            // console.log(this.dataStore)
            this.init();
          }
          else
          {
            this.director.birdsEvent();
          }  
      });
  }

}