'use strict';

class Gladiator {
  constructor() {
    this.name = faker.name.findName();
    this.initial_health = faker.random.number({min: 80, max: 100});
    let randPow = faker.random.number({min: 2, max: 5, precision: 0.1});
    this.initial_power = randPow.toFixed(1);
    let randSp = faker.random.number({min: 2, max: 5, precision: 0.001});
    this.initial_speed = randSp.toFixed(3);
    this.hitPeriodicity = 5/this.initial_speed * 1000
  }
  hit(opponent) {
      opponent.initial_health = (opponent.initial_health - this.initial_power).toFixed(1);
  }
  speedDecrease() {
    let k = (this.initial_speed/this.initial_health).toFixed(3);
    this.initial_speed *= k
  }
  getAngry() {
    if(this.initial_health >= 15 && this.initial_health <= 30) this.initial_speed *=3
  }
}

const createGladiators = (count)=> {
  let gladiator;
  let arr = [];
  for (let i = 0; i < count; i++) {
    gladiator = new Gladiator();
    arr.push(gladiator)
  }
  return arr;
}
let arena = createGladiators(3);

const caesarMakeDicision = (num, arena)=> {
  let arr = ["Finish him", "Live"];
  let temp = faker.random.number(1);
  return arr[temp]
}
console.log(caesarMakeDicision()+ 'hellllllllllllll');
const start = (arena)=> {
  let raund = setInterval(()=>{
  let randIndex;
  let opponentsArr;
    for (let i = 0; i < arena.length; i++) {
      opponentsArr = arena.filter( (item, index)=>  index !== i  );
      randIndex = faker.random.number(opponentsArr.length-1);

      arena[i].hit(opponentsArr[randIndex]);
      opponentsArr[randIndex].getAngry();
      opponentsArr[randIndex].speedDecrease();

      console.log(
        `[${arena[i].name} x ${arena[i].initial_health}]
          hits ${opponentsArr[randIndex].name} x ${opponentsArr[randIndex].initial_health}
          with power ${arena[i].initial_power}`
      );
      if(i==arena.length-1) console.log('vvvvvvvvvvvvvvvvv');

      if (opponentsArr[randIndex].initial_health<=0) {
          clearInterval(raund);
          let dicision = caesarMakeDicision();

          if(dicision=='Live') {
            console.log('Live');
            opponentsArr[randIndex].initial_health+=50;
          } else {
            dying(opponentsArr[randIndex], arena);
            console.log("Finish him");
          }

          if(arena.length>1) {
            start(arena)
          } else {
            console.log(`winner is ${arena[0].name}`);
            console.log(arena);
            return
          }
      }
    }
  },1000)
}

const dying = (gladiator, arena)=> {
  let indexGlad = arena.indexOf(gladiator);
  arena.splice(indexGlad, 1)
}

start(arena);
