import { customAlphabet } from 'nanoid';

export const randomNumber = customAlphabet('1234567890', 4);
export const simpleNanoId = customAlphabet('1234567890abcdefghijklmopqrstuvwxyz', 12);
