class Calculator {
  constructor(previousElem, currentElem) {
    this.previousElem = previousElem; // Reference to the element that displays the previous calculation
    this.currentElem = currentElem; // Reference to the element that displays the current input
    this.clearScreen();
  }

  clearScreen() {
    this.currentText = "";
    this.previousText = "";
    this.operation = undefined;
  }

  delete() {
    if (this.currentText) {
      this.currentText = this.currentText.slice(0, -1); // Remove the last character from the current input
    }
    if (this.previousText) {
      this.previousText = this.previousText.slice(0, -1); // Remove the last character from the previous calculation

      this.currentText = this.previousText; // Update the current input with the modified previous calculation
      this.previousText = "";
    }
  }

  appendNumber(number) {
    if (number === "." && this.currentText.includes(".")) return; // Check if the current input already contains a decimal point
    this.currentText = this.currentText.toString() + number.toString(); // Append the number to the current input
  }

  selectOperation(operation) {
    if (!this.currentText) return; // If no current input, exit the function
    if (this.previousText) {
      this.evaluate(); // Evaluate the previous calculation if there is one
    }
    this.operation = operation; // Set the operation to perform
    this.previousText = this.currentText + operation; // Store the previous calculation as current input with the selected operation
    this.currentText = ""; // Clear the current input for the next number entry
  }

  evaluate() {
    let result;
    const prev = parseFloat(this.previousText);
    const current = parseFloat(this.currentText);
    if (!prev || !current) return; // If either previous or current input is not a valid number, exit the function
    switch (this.operation) {
      case "+":
        result = prev + current;
        break;

      case "-":
        result = prev - current;
        break;

      case "*":
        result = prev * current;
        break;

      case "÷":
        result = prev / current;
        break;

      default:
        return;
    }
    this.currentText = result; // Update the current input with the calculated result
    this.previousText = ""; // Clear the previous calculation
    this.operation = undefined; // Reset the operation
  }

  updateScreen() {
    this.currentElem.innerText = this.currentText; // Update the current input display
    this.previousElem.innerText = this.previousText; // Update the previous calculation display
  }
}

// selecting HTML elements
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const currentTextElement = document.querySelector("[data-current]");
const previousTextElement = document.querySelector("[data-previous]");

// calling an instance of the Calculator class
const calculator = new Calculator(previousTextElement, currentTextElement);


// adding event listeners to buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateScreen();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.selectOperation(button.innerText);
    calculator.updateScreen();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.evaluate();
  calculator.updateScreen();
});

clearButton.addEventListener("click", () => {
  calculator.clearScreen();
  calculator.updateScreen();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateScreen();
});
