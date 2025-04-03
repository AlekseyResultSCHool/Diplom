import { ACTION_TYPE } from './action-type';

export const basketOpen = (action) => ({
	type: ACTION_TYPE.BASKET_OPEN,
	payload: action,
});
