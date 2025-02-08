//How would you implement a calculator class with methods for addition,
//subtraction, and multiplication, supporting method chaining?
//calculator.add(3).multiply(4).subtract(5).getValue()

interface ICalculator {
  add: (digit: number) => this;
  substract: (digit: number) => this;
  multiply: (digit: number) => this;
  divide: (digit: number) => this;
  getValue: () => number;
}

class ChainCalculator implements ICalculator {
  private value: number;

  constructor(initialValue: number) {
    this.value = initialValue;
  }

  add(digit: number): this {
    this.value += digit;
    return this;
  }

  substract(digit: number): this {
    this.value -= digit;
    return this;
  }

  multiply(digit: number): this {
    this.value *= digit;
    return this;
  }

  divide(digit: number): this {
    if (digit === 0) {
      throw new Error("Cant divide by zero");
    }
    this.value /= digit;
    return this;
  }

  getValue(): number {
    return this.value;
  }
}

const calc: ICalculator = new ChainCalculator(5);
console.log(calc.add(4).multiply(8).substract(3).divide(2).getValue());
