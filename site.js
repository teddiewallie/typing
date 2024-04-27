window.onload = async () => {
  await addCaret();
  await pause(2500);
  await crunch();
};

const template = `hello
I'm Ted.
I like computers :D`;

const time = (ms, max) => (Math.floor(Math.random() * max) + ms);

const crunch = async () => {
  const rows = template.split('\n');

  while (rows.length) {
    const row = rows.shift();
    const rowArray = row.split('');

    while (rowArray.length) {
      removeCaret();
      await pushChar(rowArray.shift());
      addCaret();
      await pause(time(40, 160));
    }

    await pause(time(2000, 1000));
    await clearText(40);
  }
};

const getElement = () => document.querySelector('.text');

const pause = async (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const pushChar = async (text) => new Promise((resolve) => {
  const element = getElement();
  element.textContent = element.textContent += text;
  resolve();
});

const popChar = async () => new Promise((resolve) => {
  const element = getElement();
  const text = element.textContent.split('');
  text.pop().join('');
  resolve();
});

const addCaret = async () => new Promise((resolve) => {
  const caret = document.createElement('span');
  caret.classList.add('caret');
  caret.textContent = '█';
  getElement().appendChild(caret);
  resolve();
});

const removeCaret = () => new Promise((resolve) => {
  document.querySelector('.caret')?.remove();
});

const typeText = async (text, ms) => new Promise(async (resolve) => {
  const textArray = text.split('');

  while (textArray.length) {
    removeCaret();
    await pushChar(textArray.shift());
    addCaret();
    await pause(ms);
  }

  resolve();
});

const clearText = async (ms) => new Promise(async (resolve) => {
  const element = getElement();
  const textArray = element.textContent.split('');

  while (textArray.length) {
    removeCaret();
    textArray.pop();
    element.textContent = textArray.join('');
    addCaret();
    await pause(ms);
  }

  resolve();
});

