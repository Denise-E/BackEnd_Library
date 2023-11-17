import { faker } from "@faker-js/faker/locale/en";

const get_book = (_) => ({
  title: generate_book_title(),
  author: faker.person.fullName(),
  stock: faker.number.int({ min: 0, max: 50 }),
});

const get_incorrect_book = (_) => ({
  title: "",
  author: faker.person.fullName(),
  stock: faker.number.int({ max: 0 }),
});

const generate_book_title = (_) => {
  const title = faker.word.words({ count: { min: 2, max: 5 } });
  let titile_formatted = title.charAt(0).toUpperCase() + title.slice(1);
  return titile_formatted;
};

//console.log(get_book())

export default {
  get_book,
  get_incorrect_book,
};
