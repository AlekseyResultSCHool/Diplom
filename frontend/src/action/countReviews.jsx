import { ACTION_TYPE } from './action-type';

export const countReviews = (count) => ({
	type: ACTION_TYPE.COUNT_REVIEWS,
	payload: count,
});
