const slice = (first, second, array) => [].slice.call(array, first, second);

const splitEvery = (num, array) => {
  const result = [];
  let idx = 0;

  while (idx < array.length) {
    result.push(slice(idx, (idx += num), array));
  }

  return result;
};

const data = [...document.querySelectorAll(".chapter")].map((chapter) => {
  const [title, subtitle] = [
    ...chapter.querySelectorAll("header > div:nth-child(2) > *"),
  ].map((el) => el.innerText);

  const quizzes = splitEvery(
    2,
    [...chapter.querySelectorAll(".text > *")].map((el) => el.innerText)
  ).map(([title, description]) => ({ title, description }));

  return { title, subtitle, quizzes };
});

// To markdown title
data
  .map(({ title }) => title)
  .map((title) => `Brilliant **Probability** *${title}*`);

// .map(({ title, subtitle, quizzes }) => {
// });
