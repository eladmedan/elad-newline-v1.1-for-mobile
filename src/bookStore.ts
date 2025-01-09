import { derived, Readable, readable, Writable, writable } from "svelte/store";
import { t } from "./lib/1.1/helpers/i18n";

export const isProduction = import.meta.env.MODE === "production";

if (!isProduction) {
  console.log("Developement Mode");
} else {
  console.log("Production Mode");
}
export let debugMode = writable(isProduction ? false : true);

interface Chapter {
  number: string;
  title: string;
  paragraphs: any[];
  totalWords: number;
}

interface Book {
  chapters?: Chapter[];
}

export const book: Readable<Book> = derived(t, ($t) => {
  const chapters = [1, 2, 3, 4, 5];

  const _book = {
    chapters: chapters.map((key) => {
      // number
      const chapterNumber = $t(`book.chapter${key}.subtitle`);

      // title
      const chapterTitle = $t(`book.chapter${key}.title`);

      // paragraphs & total words
      const chapterText = $t(`book.chapter${key}.text`).replace(/\r/gi, "");
      const lines = chapterText.trim().split("\n\n");
      const paragraphs = lines.map((line) => line.trim().split("\n"));

      const chapter: Chapter = {
        number: chapterNumber,
        title: chapterTitle,
        paragraphs,
        totalWords: paragraphs.join(" ").trim().split(" ").length,
      };
      return chapter;
    }),
  };
  
  console.log("_book", _book);

  return _book;
});

// export const book: Writable<Book> = writable({});

// function convertTextToBook(text): Book {
//   const chapters = text.split("---");

//   const _book = {
//     chapters: chapters.map((chapter) => {
//       chapter = chapter.replace(/\r/gi, "");
//       const lines = chapter.trim().split("\n\n");
//       const [chapterNumber, chapterTitle] = lines[0].split(" | ");
//       lines.shift();
//       const paragraphs = lines.map((line) => line.trim().split("\n"));
//       return {
//         number: chapterNumber,
//         title: chapterTitle,
//         paragraphs,
//         totalWords: paragraphs.join(" ").trim().split(" ").length,
//       };
//     }),
//   };

//   console.log("_book", _book);

//   return _book;
// }

// fetch(isProduction ? "/book.txt" : "/testBook.txt")
//   .then((response) => {
//     //   console.dir(response);
//     return response.text();
//   })
//   .then((text) => {
//     // console.log("text", text);
//     book.set(convertTextToBook(text));
//   });

export const totalWordsInBook: Readable<number> = derived(
  book,
  ($book, set) => {
    set(
      $book.chapters
        ? $book.chapters.reduce((acc, chapter) => acc + chapter.totalWords, 0)
        : 0
    );
  }
);
