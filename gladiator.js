'use strict';

class Gladiator {
  constructor() {
    this.name = faker.name.findName();
    this.initial_health = faker.random.number({min: 80, max: 100});
    this.currentHhealth = this.initial_health;

    let randPow = faker.random.number({min: 2, max: 5, precision: 0.1});
    this.initial_power = randPow.toFixed(1);
    let randSp = faker.random.number({min: 2, max: 5, precision: 0.001});
    this.initial_speed = randSp.toFixed(3);
    this.hitPeriodicity = (5/this.initial_speed) * 1000
  }
  hit(opponent) {
      let timerHit =  setInterval(()=>{
        opponent.currentHhealth = (opponent.currentHhealth - this.initial_power).toFixed(1);
          clearInterval(timerHit)
      }, this.hitPeriodicity)
  }
  speedDecrease() {
    let k = (this.currentHhealth/this.initial_health);
    this.initial_speed = (this.initial_speed * k).toFixed(3)
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

const start = (arena)=> {
  let raund = setInterval(()=>{
  let randIndex;
  let opponentsArr;
    for (let i = 0; i < arena.length; i++) {
      opponentsArr = arena.filter( (item, index)=>  index !== i  );
      randIndex = faker.random.number(opponentsArr.length-1);

      if(opponentsArr[randIndex]) {
        arena[i].hit(opponentsArr[randIndex]);
        opponentsArr[randIndex].getAngry();
        opponentsArr[randIndex].speedDecrease();

        console.log(
          `[${arena[i].name} x ${arena[i].currentHhealth}]
            hits ${opponentsArr[randIndex].name} x ${opponentsArr[randIndex].currentHhealth}
            with power ${arena[i].initial_power}`
        );
        if(i==arena.length-1) console.log('vvvvvvvvvvvvvvvvv');

        if (opponentsArr[randIndex].currentHhealth<=0) {
            clearInterval(raund);
            let dicision = caesarMakeDicision();

            if(dicision=='Live') {
              console.log('Live');
              opponentsArr[randIndex].currentHhealth=50;
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
    }
  },1000)
}

const dying = (gladiator, arena)=> {
  let indexGlad = arena.indexOf(gladiator);
  arena.splice(indexGlad, 1)
}

start(arena);
