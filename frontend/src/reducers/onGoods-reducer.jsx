import { ACTION_TYPE } from '../action';

const initialOnGoodsState = {
	id: null,
	imageUrl: null,
	desc: null,
	information: null,
	price: null,
};

export const onGoodsReducer = (state = initialOnGoodsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ONGOODS: 
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
