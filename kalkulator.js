let currentOperand = "0";
let prevOperand = "";
let operator = null;
let shouldResetScreen = false;

const currentEl = document.getElementById("currentOperand");
const prevEl = document.getElementById("prevOperand");

function formatNumber(numStr) {
  if (numStr === "" || numStr === "-") return numStr;
  const parts = numStr.split(".");
  const intPart = parseFloat(parts[0]).toLocaleString("id-ID", { maximumFractionDigits: 0 });
  if (parts.length > 1) {
    return intPart + "," + parts[1];
  }
  return numStr.endsWith(".") ? intPart + "," : intPart;
}

function updateDisplay() {
  currentEl.textContent = formatNumber(currentOperand);
  if (operator != null) {
    const opSymbol = { "+": "+", "-": "−", "*": "×", "/": "÷", "%": "%" }[operator];
    prevEl.textContent = `${formatNumber(prevOperand)} ${opSymbol}`;
  } else {
    prevEl.textContent = "";
  }
}

function inputNumber(digit) {
  if (currentOperand === "0" || shouldResetScreen) {
    currentOperand = "";
    shouldResetScreen = false;
  }
  if (digit === "." && currentOperand.includes(".")) return;
  currentOperand += digit;
}

function chooseOperator(op) {
  if (currentOperand === "" && prevOperand === "") return;
  if (prevOperand !== "" && !shouldResetScreen) {
    compute();
  }
  operator = op;
  prevOperand = currentOperand;
  shouldResetScreen = true;
}

function compute() {
  let result;
  const prev = parseFloat(prevOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        currentOperand = "Error";
        prevOperand = "";
        operator = null;
        shouldResetScreen = true;
        updateDisplay();
        return;
      }
      result = prev / current;
      break;
    case "%":
      result = prev % current;
      break;
    default:
      return;
  }

  result = Math.round((result + Number.EPSILON) * 1e10) / 1e10;
  currentOperand = result.toString();
  operator = null;
  prevOperand = "";
  shouldResetScreen = true;
}

function clearAll() {
  currentOperand = "0";
  prevOperand = "";
  operator = null;
  shouldResetScreen = false;
}

function deleteLast() {
  if (shouldResetScreen) return;
  currentOperand = currentOperand.slice(0, -1);
  if (currentOperand === "" || currentOperand === "-") currentOperand = "0";
}

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    if (action === "number") inputNumber(btn.textContent.trim());
    else if (action === "decimal") inputNumber(".");
    else if (action === "operator") chooseOperator(btn.dataset.op);
    else if (action === "equals") compute();
    else if (action === "clear") clearAll();
    else if (action === "delete") deleteLast();
    updateDisplay();
  });
});

// Dukungan keyboard
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") inputNumber(e.key);
  else if (e.key === ".") inputNumber(".");
  else if (["+", "-", "*", "/"].includes(e.key)) chooseOperator(e.key);
  else if (e.key === "Enter" || e.key === "=") compute();
  else if (e.key === "Backspace") deleteLast();
  else if (e.key.toLowerCase() === "c") clearAll();
  updateDisplay();
});

updateDisplay();
