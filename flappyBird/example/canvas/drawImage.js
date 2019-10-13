// 小程序 canvas drawImage() 方法详解

//创建画布
const Canvas = wx.createCanvas();

//创建 2d context对象
const Context = Canvas.getContext("2d");

//创建图像
let image = wx.createImage();
image.src = "canvas/eg.jpg";

image.onload = () => {
  //写法一
  Context.drawImage(image, 0, 0);

  //写法二
  Context.drawImage(image, 0, 300, 200, 133);

  //写法三
  Context.drawImage(image, 0, 133, 200, 133, 0, 500, 200, 133);


}