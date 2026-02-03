/**
 * Simple Quiz - App logic
 * Depends on quiz-data.js (quizzes array).
 */
(function () {
  let user = null;
  let currentQuiz = null;
  let currentQ = 0;
  let answers = {};
  let timerId = null;
  let timeLeft = 0;

  const $ = function (id) {
    return document.getElementById(id);
  };

  const show = function (id) {
    ['screen-login', 'screen-list', 'screen-quiz', 'screen-results'].forEach(function (s) {
      var el = $(s);
      if (el) el.classList.add('hidden');
    });
    var target = $(id);
    if (target) target.classList.remove('hidden');
  };

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function startQuiz(quiz) {
    currentQuiz = {
      id: quiz.id,
      title: quiz.title,
      duration: quiz.duration,
      questions: shuffle(quiz.questions).map(function (q) {
        return { text: q.text, options: shuffle(q.options), correct: q.correct, marks: q.marks };
      }),
    };
    currentQ = 0;
    answers = {};
    timeLeft = currentQuiz.duration * 60;
    show('screen-quiz');
    $('quiz-title').textContent = currentQuiz.title;
    renderQuestion();
    startTimer();
  }

  function startTimer() {
    if (timerId) clearInterval(timerId);
    function tick() {
      var m = Math.floor(timeLeft / 60);
      var s = timeLeft % 60;
      $('quiz-timer').textContent = m + ':' + (s < 10 ? '0' : '') + s;
      $('quiz-timer').className = timeLeft <= 60 ? 'timer low' : 'timer';
      if (timeLeft <= 0) {
        clearInterval(timerId);
        timerId = null;
        submitQuiz();
        return;
      }
      timeLeft--;
    }
    tick();
    timerId = setInterval(tick, 1000);
  }

  function renderQuestion() {
    var q = currentQuiz.questions[currentQ];
    $('q-num').textContent = currentQ + 1;
    $('q-total').textContent = currentQuiz.questions.length;
    $('quiz-progress').style.width = ((currentQ + 1) / currentQuiz.questions.length * 100) + '%';
    $('question-text').textContent = q.text;
    var opts = q.options
      .map(function (opt) {
        var safe = opt.replace(/"/g, '&quot;');
        var checked = answers[q.text] === opt ? ' checked' : '';
        return '<label><input type="radio" name="q" value="' + safe + '"' + checked + '> ' + opt + '</label>';
      })
      .join('');
    $('question-options').innerHTML = opts;
    $('question-options').querySelectorAll('input').forEach(function (inp) {
      inp.addEventListener('change', function () {
        answers[q.text] = inp.value;
      });
    });
    $('btn-prev').style.visibility = currentQ === 0 ? 'hidden' : 'visible';
    $('btn-next').textContent = currentQ === currentQuiz.questions.length - 1 ? 'Submit' : 'Next';
  }

  function submitQuiz() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    var score = 0;
    var total = 0;
    currentQuiz.questions.forEach(function (q) {
      total += q.marks;
      if (answers[q.text] === q.correct) score += q.marks;
    });
    var correct = currentQuiz.questions.filter(function (q) {
      return answers[q.text] === q.correct;
    }).length;
    var wrong = currentQuiz.questions.filter(function (q) {
      return answers[q.text] && answers[q.text] !== q.correct;
    }).length;
    show('screen-results');
    $('result-quiz-name').textContent = currentQuiz.title;
    $('result-score').textContent = score;
    $('result-total').textContent = total;
    $('result-summary').textContent = correct + ' correct, ' + wrong + ' wrong.';
  }

  function renderQuizList() {
    var html = quizzes
      .map(function (q) {
        return (
          '<div class="card">' +
          '<h3 style="margin-top:0">' +
          q.title +
          '</h3>' +
          '<p class="small">' +
          q.questions.length +
          ' questions, ' +
          q.duration +
          ' min</p>' +
          '<button type="button" data-id="' +
          q.id +
          '">Start</button></div>'
        );
      })
      .join('');
    $('quiz-list').innerHTML = html;
    $('quiz-list').querySelectorAll('button').forEach(function (btn) {
      btn.onclick = function () {
        var id = parseInt(btn.getAttribute('data-id'), 10);
        var quiz = quizzes.filter(function (z) {
          return z.id === id;
        })[0];
        if (quiz) startQuiz(quiz);
      };
    });
  }

  $('btn-login').onclick = function () {
    var name = $('login-name').value.trim();
    if (!name) {
      alert('Enter your name');
      return;
    }
    user = { name: name };
    $('user-name').textContent = name;
    show('screen-list');
    renderQuizList();
  };

  $('btn-logout').onclick = function () {
    user = null;
    show('screen-login');
  };

  $('btn-prev').onclick = function () {
    var q = currentQuiz.questions[currentQ];
    var r = $('question-options').querySelector('input:checked');
    if (r) answers[q.text] = r.value;
    currentQ--;
    renderQuestion();
  };

  $('btn-next').onclick = function () {
    var q = currentQuiz.questions[currentQ];
    var r = $('question-options').querySelector('input:checked');
    if (r) answers[q.text] = r.value;
    if (currentQ === currentQuiz.questions.length - 1) {
      submitQuiz();
    } else {
      currentQ++;
      renderQuestion();
    }
  };

  $('btn-back-list').onclick = function () {
    show('screen-list');
  };
})();
