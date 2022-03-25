import { Result } from "postcss";
import wordBank from "./word-bank.json";

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordBank.length);
  return wordBank[randomIndex];
}

export enum LetterState {
  Miss = "Miss",
  Present = "Present",
  Match = "Match",
}

export function computeGuess(
  guess: string,
  answerString: string
): LetterState[] {
  const result: LetterState[] = [];

  if (guess.length !== answerString.length) {
    return result;
  }
  const guessArray = guess.split("");

  const answerArray = answerString.split("");

  const answerLetterCount: Record<string, number> = {};

  guessArray.forEach((letter, index) => {
    const currentAnswerLetter = answerArray[index];

    answerLetterCount[currentAnswerLetter] = answerLetterCount[
      currentAnswerLetter
    ]
      ? answerLetterCount[currentAnswerLetter] + 1
      : 1;

    if (letter === answerArray[index]) {
      result.push(LetterState.Match);
    } else if (answerArray.includes(letter)) {
      result.push(LetterState.Present);
    } else result.push(LetterState.Miss);
  });

  result.forEach((curResult, resultIndex) => {
    if (curResult !== LetterState.Present) {
      return;
    }

    const guessLetter = guessArray[resultIndex];

    answerArray.forEach((currentAnswerLetter, answerIndex) => {
      if (currentAnswerLetter !== guessLetter) {
        return;
      }

      if (result[answerIndex] === LetterState.Match) {
        result[resultIndex] = LetterState.Miss;
      }

      if (answerLetterCount[guessLetter] <= 0) {
        result[resultIndex] = LetterState.Miss;
      }
    });

    answerLetterCount[guessLetter]--;
  });
  return result;
}
