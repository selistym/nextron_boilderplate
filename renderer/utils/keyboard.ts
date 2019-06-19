import { KEY_CODES } from '@app/constants/app';

export const isNumberAllowKeyPress: { [key: string]: any } = {
  Backspace: 1,
  Delete: 1,
  ArrowUp: 1,
  ArrowLeft: 1,
  ArrowDown: 1,
  ArrowRight: 1,
};

export const isStartWithDeleteKey = (keyPress: number | null) => {
  return keyPress === KEY_CODES.BACKSPACE || keyPress === KEY_CODES.DELETE;
};
