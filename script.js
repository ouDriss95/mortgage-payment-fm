document.addEventListener("DOMContentLoaded", function () {
  // Get form and inputs
  const form = document.querySelector("form");
  const amountInput = document.getElementById("mortgage-amount");
  const termInput = document.getElementById("mortgage-term");
  const rateInput = document.getElementById("interest-rate");
  const clearBtn = document.querySelector(".clear-all");

  // Get result elements
  const monthlyResult = document.querySelector(".amount-wrapper h3");
  const totalResult = document.querySelector(".amount-wrapper h4");

  // Calculate button click handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    calculate();
  });

  // Clear button click handler - SETS ALL VALUES TO ZERO AND DISPLAYS £0.00
  clearBtn.addEventListener("click", function (e) {
    e.preventDefault();
    amountInput.value = "0";
    termInput.value = "0";
    rateInput.value = "0";
    document.querySelector('input[value="repayment"]').checked = true;

    // Directly set the results to £0.00 without calculation
    monthlyResult.innerHTML = "£0.00";
    totalResult.innerHTML = "£0.00";
  });

  // Main calculation function
  function calculate() {
    // Get input values
    const amount = parseFloat(amountInput.value.replace(/,/g, "")) || 0;
    const termYears = parseFloat(termInput.value) || 0;
    const rate = parseFloat(rateInput.value) || 0;
    const isRepayment = document.querySelector(
      'input[value="repayment"]'
    ).checked;

    // Convert to months
    const termMonths = termYears * 12;
    const monthlyRate = rate / 100 / 12;

    let monthly, total;

    if (isRepayment) {
      // Repayment calculation
      if (rate === 0) {
        monthly = amount / termMonths;
      } else {
        const x = Math.pow(1 + monthlyRate, termMonths);
        monthly = (amount * monthlyRate * x) / (x - 1);
      }
      total = monthly * termMonths;
    } else {
      // Interest-only calculation
      monthly = amount * monthlyRate;
      total = monthly * termMonths + amount;
    }

    // Display results
    monthlyResult.textContent =
      "£" + monthly.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    totalResult.textContent =
      "£" + total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Format amount input with commas
  amountInput.addEventListener("input", function () {
    this.value = this.value
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });

  // Initial calculation
  calculate();
});
