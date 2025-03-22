import { ACTION_TYPE } from './action-type';

export const paramsId = (action) => ({
	type: ACTION_TYPE.PARAMSID,
	payload: action,
});
