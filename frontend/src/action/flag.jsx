import { ACTION_TYPE } from './action-type';

export const actionFlag = (action) => ({
	type: ACTION_TYPE.FLAG,
	payload: action,
});
