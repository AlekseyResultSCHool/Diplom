import { ACTION_TYPE } from './action-type';

export const searchTextPhrase = (action) => ({
	type: ACTION_TYPE.PHRASE_TEXT,
	payload: action,
});
