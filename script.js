const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

const randomFunc = {
  lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
  symbol: () => '!@#$%^&*(){}[]=<>/,.'.charAt(Math.floor(Math.random() * 20))
};

function generatePassword() {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  let generatedPassword = '';
  const typesCount = hasLower + hasUpper + hasNumber + hasSymbol;
  const typesArr = [{ lower: hasLower }, { upper: hasUpper }, { number: hasNumber }, { symbol: hasSymbol }].filter(item => Object.values(item)[0]);

  if (typesCount === 0) {
    resultEl.value = '';
    return;
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  resultEl.value = finalPassword;
  updateStrength(finalPassword);
}

function updateStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];
  const texts = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const widths = ['20%', '40%', '60%', '80%', '100%'];

  const index = Math.min(score, 4);
  strengthBar.style.width = widths[index];
  strengthBar.style.background = colors[index];
  strengthText.textContent = texts[index];
}

generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', () => {
  if (!resultEl.value) return;
  navigator.clipboard.writeText(resultEl.value);
  copyBtn.textContent = '✅';
  setTimeout(() => (copyBtn.textContent = '📋'), 1500);
});

generatePassword();