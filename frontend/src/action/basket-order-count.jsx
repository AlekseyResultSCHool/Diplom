import { ACTION_TYPE } from './action-type';

export const ordersBasketCount = (count) => ({
	type: ACTION_TYPE.ORDER_COUNT,
	payload: count,
});
