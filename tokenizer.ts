export enum TokenTypes {
  Paren,
  Name,
  Number,
}

interface Token {
  type: TokenTypes;
  value: string;
}

export function tokenizer(code: string) {
  const tokens: Token[] = [];
  let cur = 0;
  while (cur < code.length) {
    let char = code[cur];

    const WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      cur++;
      continue;
    }
    
    if (char === "(") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      cur++;
      continue;
    }

    if (char === ")") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      cur++;
      continue;
    }

    const LETTERS = /[a-z]/i;

    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char) && cur < code.length) {
        value += char;
        char = code[++cur];
      }
      tokens.push({
        type: TokenTypes.Name,
        value,
      });
    }

    const NUMBERS = /[0-9]/i;

    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char) && cur < code.length) {
        value += char;
        char = code[++cur];
      }
      tokens.push({
        type: TokenTypes.Number,
        value,
      });
    }
  }

  return tokens;
}
