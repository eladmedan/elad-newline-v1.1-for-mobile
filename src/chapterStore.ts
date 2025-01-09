import { get, writable } from "svelte/store";
import { book } from "./bookStore";
import { chapterScrolledPixels } from "./tempStore";

export const currentChapterIndex = writable(0);
export const isGoingForward = writable(true);
export const isMovingChapters = writable(false);
export const restartTimes = writable(0);

function handleChapterMovement() {
  isMovingChapters.set(true);
  setTimeout(() => {
    isMovingChapters.set(false);
  }, 2300);
}

export function nextChapter() {
  handleChapterMovement();
  isGoingForward.set(true);
  requestAnimationFrame(() => {
    const _currentChapterIndex = get(currentChapterIndex);
    if (get(book).chapters.length > _currentChapterIndex + 1) {
      currentChapterIndex.set(_currentChapterIndex + 1);
    } else {
      currentChapterIndex.set(0);
    }
  });
}
export function prevChapter() {
  const _currentChapterIndex = get(currentChapterIndex);
  if (_currentChapterIndex === 0) {
    isGoingForward.set(false);
    chapterScrolledPixels.update($chapterScrolledPixels => {
      console.log('$chapterScrolledPixels', $chapterScrolledPixels);
      if($chapterScrolledPixels === 0) {
        restartTimes.set(Math.random());
      }
      return $chapterScrolledPixels;
    });
    restart();
    return;
  }

  handleChapterMovement();
  isGoingForward.set(false);
  requestAnimationFrame(() => {
    const _currentChapterIndex = get(currentChapterIndex);
    if (0 === _currentChapterIndex) {
      currentChapterIndex.set(get(book).chapters.length - 1);
    } else {
      currentChapterIndex.set(_currentChapterIndex - 1);
    }
  });
}

export function goToChapter(chapterIndex) {
  const _currentChapterIndex = get(currentChapterIndex);
  if (chapterIndex === _currentChapterIndex) {
    return; // do nothing
  }
  handleChapterMovement();
  isGoingForward.set(chapterIndex > _currentChapterIndex);
  requestAnimationFrame(() => {
    currentChapterIndex.set(chapterIndex);
  });
}

export function restart() {
  handleChapterMovement();
  isGoingForward.set(false);
  chapterScrolledPixels.set(0);
  requestAnimationFrame(() => {
    currentChapterIndex.set(0);
  });
}
