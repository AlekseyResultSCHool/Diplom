import { ACTION_TYPE } from '../action';

const initialAppState = {
	wasLogout: false,
	orderCount: 0,
	basketOpen: false,
	flag: true,
	searchText: '',
	countReviews: 0,
	paramsId: null,
	addOnGoodsOpen: false,
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		case ACTION_TYPE.ORDER_COUNT:
			return {
				...state,
				orderCount: action.payload,
			};
		case ACTION_TYPE.BASKET_OPEN:
			return {
				...state,
				basketOpen: action.payload,
			};
		case ACTION_TYPE.FLAG:
			return {
				...state,
				flag: action.payload,
			};
		case ACTION_TYPE.PHRASE_TEXT:
			return {
				...state,
				searchText: action.payload,
			};
		case ACTION_TYPE.COUNT_REVIEWS:
			return {
				...state,
				countReviews: action.payload,
			};
			case ACTION_TYPE.PARAMSID:
			return {
				...state,
				paramsId: action.payload,
			};
			case ACTION_TYPE.ADDONGOODS_OPEN:
			return {
				...state,
				addOnGoodsOpen: action.payload,
			};
		default:
			return state;
	}
};
