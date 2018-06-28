window.onload = () => {
  const wg = document.querySelector('#wg');
  const yg = document.querySelector('#yg');
  window.guess = new YouGuess();

  wg.addEventListener('click', () => {
    window.guess = new WeGuess();

    yg.classList.add('btn-outline-success');
    yg.classList.remove('btn-success');
    wg.classList.add('btn-info');
    wg.classList.remove('btn-outline-info');

    wg.blur();
  })

  yg.addEventListener('click', () => {
    window.guess = new YouGuess();

    wg.classList.add('btn-outline-info');
    wg.classList.remove('btn-info');
    yg.classList.add('btn-success');
    yg.classList.remove('btn-outline-success');

    yg.blur();
  })

};