// 变量缓冲器，存储游戏需要长期保存的变量和需要定时销毁的变量

export class DataStore{
    constructor(){
      // console.log("变量缓冲器初始化");
      this.map = new Map();
    }

    //单例模式
    static getInstance(){
       if(!DataStore.instance)
       {
            DataStore.instance = new DataStore();
       }
       return DataStore.instance;
    }

    //创建
    put(key, value){
      if(typeof value === 'function')
      {
          value = new value();
      }
      this.map.set(key, value);
      return this;
    }

    //获取
    get(key){
      return this.map.get(key);
    }

    //销毁
    destroy(){
      for(let value of this.map.values())
      {
          value = null;
      }
    }
}