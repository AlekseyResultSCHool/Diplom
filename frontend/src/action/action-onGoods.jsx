import { ACTION_TYPE } from './action-type';

export const setOnGoods = (onGoods) => ({
	type: ACTION_TYPE.SET_ONGOODS,
	payload: onGoods,
});
