//@ts-check

class Vehicle {
  public status: "stopped" | "started" = "stopped";
  public make;
  public model;
  public wheels;

  constructor(make: string, model: string, wheels: number) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }
  start() {
    this.status = "started";
  }
  stop() {
    this.status = "stopped";
  }
}

class Car extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model, 4);
  }
}

class MotorCycle extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model, 2);
  }
}

function printStatus(vehicle: Vehicle) {
  if (vehicle.status === "started") {
    console.log("The vehicle is running.");
  } else {
    console.log("The vehicle is stopped.");
  }
}

const myHarley = new MotorCycle("Harley-Davidson", "Low Rider S");
myHarley.start();
printStatus(myHarley);
console.log(myHarley.make.toUpperCase());

const myBuick = new Car("Buick", "Regal");
myBuick.wheels = myBuick.wheels - 1;
console.log(myBuick.wheels);
console.log(myBuick.model);

/*
PART 3: CREATING A GENERIC CLASS
*/
class NCycle<T> {
  public status: "stopped" | "started" = "stopped";
  public make;
  public model;
  public wheels;

  constructor(make: T | T[], model: T | T[], wheels: number) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }
  start() {
    this.status = "started";
  }
  stop() {
    this.status = "stopped";
  }

  print(numIndex: number = 0): void {
    if (!Array.isArray(this.make) && !Array.isArray(this.model)) {
      console.log(`This is a <${this.make}><${this.model}>.`);
    } else if (
      Array.isArray(this.make) &&
      Array.isArray(this.model) &&
      this.make[numIndex] &&
      this.model[numIndex]
    ) {
      console.log(
        `This has a <${this.make[numIndex]}><${this.model[numIndex]}> at <${numIndex}>.`
      );
    } else {
      console.log(`This NCycle was not created properly.`);
    }
  }

  printAll(): void {
    if (Array.isArray(this.make) && Array.isArray(this.model)) {
      for (let i = 0; i < Math.min(this.make.length, this.model.length); i++) {
        this.print(i);
      }
    } else {
      this.print();
    }
  }
}

// Rudimentary testing Code, not part of the assignment
const testCycle1 = new NCycle<number>(1, 2, 3);
testCycle1.print();
testCycle1.printAll(); //WORKS FINE

const testCycle2 = new NCycle<string>("This", "That", 4);
testCycle2.print();
testCycle2.printAll(); //WORKS FINE

const testCycle3 = new NCycle<string>("Make", 10, 4);
testCycle3.print(4); //error expect NCycle<string> and the declaration says make/model must then also be string
testCycle3.printAll(); //or string[]

const makes4 = ["Volkswagon", "Tesla", "Audi"];
const models4 = ["Passat", "Model X", "A4"];
const testCycle4 = new NCycle<string[]>(makes4, models4, 4);
testCycle4.print(2); //WORKS FINE
testCycle4.printAll(); //WORKS FINE

const makes5 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const models5 = [1, 1, 2, 3, 5];
const testCycle5 = new NCycle<number[]>(makes5, models5, 0);
testCycle5.print(7); //WORKS FINE. NCycle not created properly
testCycle5.printAll(); //WORKS FINE. Prints first 5 elements of each array as models5.length = 5;

function add(x: number, y: number): number {
  return x + y;
}
add(testCycle1.make, testCycle5.model[1]);
// Error expected here
// We can't have it be number | number[] as add can only take number parameters not possibly number[] parameters
add(testCycle2.make, testCycle4.model[1]);
