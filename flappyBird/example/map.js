const Resources = [
  ['background', 'res/background.png'],
  ['land', 'res/land.png'],
  ['birds', 'res/birds.png'],
  ['startButton', 'res/start_button.png'],
  ['pencilUp', 'res/pie_up.png'],
  ['pencilDown', 'res/pie_down.png']
];

let map = new Map(Resources);

console.log(map);

for (let value of map.values()) 
{
  console.log(value);
}

for (let [key,value] of map)
{
  console.log(key,value);
}