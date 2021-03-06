import api from 'services/api';
import { selectors as cartSelectors } from './cart';

export const actionTypes = {
  CLEAR_ORDER: 'clear-order',
  CONFIRM_PAYMENT_FAILURE: 'confirm-payment-failure',
  CONFIRM_PAYMENT_REQUEST: 'confirm-payment-request',
  CONFIRM_PAYMENT_SUCCESS: 'confirm-payment-success',
  CREATE_ORDER_FAILURE: 'create-order-failure',
  CREATE_ORDER_REQUEST: 'create-order-request',
  CREATE_ORDER_SUCCESS: 'create-order-success'
};

export const actions = {
  createOrder: (contact, destination) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CREATE_ORDER_REQUEST });
    const cart = cartSelectors.getCart(getState());
    try {
      const order = await api.createOrder(contact, destination, cart);
      dispatch({ type: actionTypes.CREATE_ORDER_SUCCESS, payload: order });
    } catch (error) {
      dispatch({ type: actionTypes.CREATE_ORDER_FAILURE });
    }
  },

  confirmPayment: async (dispatch, getState) => {
    dispatch({ type: actionTypes.CONFIRM_PAYMENT_REQUEST });
    const orderId = selectors.getOrderId(getState());
    try {
      await api.confirmPayment(orderId);
      dispatch({ type: actionTypes.CONFIRM_PAYMENT_SUCCESS });
      setTimeout(() => {
        dispatch({ type: actionTypes.CLEAR_ORDER });
      }, 2000);
    } catch (error) {
      dispatch({ type: actionTypes.CONFIRM_PAYMENT_FAILURE });
    }
  }
};

const initialState = {
  clientSecret: '',
  hasPaid: false,
  isSubmittingOrder: false,
  orderId: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_ORDER: {
      return {
        ...initialState
      };
    }

    case actionTypes.CONFIRM_PAYMENT_FAILURE: {
      return {
        ...state,
        isSubmittingOrder: false
      };
    }

    case actionTypes.CONFIRM_PAYMENT_REQUEST: {
      return {
        ...state,
        hasPaid: false
      };
    }

    case actionTypes.CONFIRM_PAYMENT_SUCCESS: {
      return {
        ...state,
        clientSecret: '',
        hasPaid: true,
        isSubmittingOrder: false,
        orderId: ''
      };
    }

    case actionTypes.CREATE_ORDER_FAILURE: {
      return {
        ...state,
        isSubmittingOrder: false
      };
    }

    case actionTypes.CREATE_ORDER_REQUEST: {
      return {
        ...state,
        clientSecret: '',
        isSubmittingOrder: true,
        orderId: ''
      };
    }

    case actionTypes.CREATE_ORDER_SUCCESS: {
      const { id, payment } = action.payload;
      return {
        ...state,
        clientSecret: payment,
        orderId: id
      };
    }

    default: {
      return state;
    }
  }
};

export const selectors = {
  getClientSecret: state => state.orders.clientSecret,
  getOrderId: state => state.orders.orderId,
  hasPaid: state => state.orders.hasPaid,
  isSubmittingOrder: state => state.orders.isSubmittingOrder
};

export default reducer;
