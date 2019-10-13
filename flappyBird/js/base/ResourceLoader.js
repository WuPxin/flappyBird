//资源加载器，保证游戏是在图片加载完成后开始主循环

import {Resources} from "./Resources.js";

export class ResourceLoader{
    constructor(){
        this.map = new Map(Resources);
        // console.log(this.map);
        for(let [key,value] of this.map)
        {
            //创建图像对象
            const Image = wx.createImage();
            //给图像设置src
            Image.src = value;
            this.map.set(key, Image);
        }

        // console.log(this.map);
    }

    //当所有的图像加载完成之后才将map属性返回
    onLoaded(callback){
        let loadCount = 0;
        for(let value of this.map.values())
        {
            value.onload = () => {
                loadCount++;
                if(loadCount >= this.map.size)
                {
                    callback(this.map);
                }
            }
        }
    }

    static create(){
      return new ResourceLoader();
    }
}