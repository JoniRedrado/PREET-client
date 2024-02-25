/* eslint-disable no-case-declarations */

import {
  NEXT_PAGE,
  PREV_PAGE,
  SPECIFIC_PAGE,
  GET_ALL_HOTELS,
  // CLEAR_HOTELS_FILTERS,
  GET_HOTEL_BY_NAME,
  GET_DETAIL,
  DELETE_HOTEL,
  FILTER_BY_COUNTRY,
  SORT_BY_PRICE,
  FETCH_ITEMS_SUCCESS,
  FILTER_HOTELS,
  RESET_CURRENT_PAGE,
  HANDLE_FILTERS,
  RESET_FILTERS,
  GET_ALL_COUNTRIES,
  SHOW_MODAL,
  USER_LOG,
  GET_ALL_FAVORITES,
  USER_FAVORITES,
  USER_REVIEWS,
  HOTEL_FAVORITES,
  POST_FAVORITE,
  REMOVE_FAVORITE,
  DETAIL_FILTER_PARAMS,
  SET_SELECTED_OPTION,
  ADD_WEBSOCKET,
  SET_WEBSOCKET,
  SET_CURRENCY
} from "./actions-types";

let initialState = {
  allHotels: {},
  filteredHotels: {},
  submitFilters: {
    guest: 1,
  },
  currentPage: 1,
  hotelDetail: {},
  countries: [],
  newHotel: {},
  searched: false,
  totalHotels: "",
  showModal: {
    register: false,
    login: false,
    roomDetail: false,
    postReview: false,
  },
  userChanged: false,
  allFavorites: {},
  userFavorites: [],
  userReviews: [],
  hotelFavorites: [],
  submitRoomFilters: {},
  selectedOption:"Graphics",
  webSocket:{
    chatItem: null,
    newChat: [],
    record: [],
    chat: [],
  },
  currency: "USD"
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_HOTELS:
      return {
        ...state,
        allHotels: action.payload,
        totalHotels: action.payload.total,
        searched: false,
      };

    case GET_HOTEL_BY_NAME:
      return {
        ...state,
        filteredHotels: action.payload,
        totalHotels: action.payload.total,
        currentPage: 1,
      };

    case NEXT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case PREV_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case SPECIFIC_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case RESET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: 1,
      };

    case GET_DETAIL:
      return {
        ...state,
        hotelDetail: action.payload,
      };

    case DELETE_HOTEL:
      return {
        ...state,
        allHotels: action.payload,
      };

    case FILTER_BY_COUNTRY:
      let countryFilter = [];
      if (action.payload === "all") {
        countryFilter = state.allHotels;
      } else {
        countryFilter = state.allHotels.filter(
          (hotel) => hotel.country.name == action.payload
        );
      }

      return {
        ...state,
        filteredHotels: countryFilter,
        currentPage: 1,
        searched: true,
      };

    case SORT_BY_PRICE:
      let priceOrder = [];
      if (action.payload === "moreRelevant") {
        priceOrder = [...state.allHotels];
      } else if (action.payload === "lowest") {
        priceOrder = [...state.allHotels].sort(
          (hotelA, hotelB) => hotelA.price - hotelB.price
        );
      } else if (action.payload === "highest") {
        priceOrder = [...state.allHotels].sort(
          (hotelA, hotelB) => hotelB.price - hotelA.price
        );
      }

      console.log(priceOrder);

      return {
        ...state,
        filteredHotels: priceOrder,
        currentPage: 1,
        searched: true,
      };

    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        filteredHotels: action.payload,
        totalHotels: action.payload.total,
      };

    case FILTER_HOTELS:
      return {
        ...state,
        totalHotels: action.payload.total,
        filteredHotels: action.payload,
        searched: true,
      };

    case HANDLE_FILTERS:
      return {
        ...state,
        submitFilters: action.payload,
      };

    case RESET_FILTERS:
      return {
        ...state,
        submitFilters: {
          guest: 1,
        },
      };

    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case SHOW_MODAL:
      return {
        ...state,
        showModal: {
          ...state.showModal,
          [action.payload.option]: action.payload.boolean,
        },
      };

    case USER_LOG:
      return {
        ...state,
        userChanged: !state.userChanged,
      };

    case GET_ALL_FAVORITES:
      return {
        ...state,
        allFavorites: action.payload,
      };

    case USER_FAVORITES:
      return {
        ...state,
        userFavorites: action.payload,
      };

    case USER_REVIEWS:
      return {
        ...state,
        userReviews: action.payload,
      };

    case HOTEL_FAVORITES:
      return {
        ...state,
        hotelFavorites: action.payload,
      };

    case POST_FAVORITE:
      // Agregar el nuevo favorito a la lista de favoritos del usuario
      return {
        ...state,
        userFavorites: action.payload,
        allFavorites: action.payload,
      };

    case REMOVE_FAVORITE:
      // Eliminar el favorito de la lista de favoritos del usuario
      if (Array.isArray(state.userFavorites)) {
        return {
          ...state,
          userFavorites: state.userFavorites.filter(
            (favorite) => favorite.id !== action.payload
          ),
        };
      } else {
        // Si state.userFavorites no es un array, devuelve el estado sin cambios
        return state;
      }

    case DETAIL_FILTER_PARAMS:
      return {
        ...state,
        submitRoomFilters: action.payload,
      };

      case SET_SELECTED_OPTION:
      return{
        ...state,
        selectedOption: action.payload,
      }

    case ADD_WEBSOCKET:
      const chatItem = state.webSocket.chatItem;

      return{
        ...state,
        webSocket:{ 
          ...state.webSocket,
          chat: chatItem === 2 ? [...state.webSocket.chat, action.payload] : [...state.webSocket.chat],
          newChat: chatItem === 1 ? [...state.webSocket.newChat, action.payload] : [...state.webSocket.newChat]
        }
      }
    
      case SET_WEBSOCKET:
        return{
          ...state,
          webSocket:{
            ...state.webSocket,
            chatItem:  action.payload.chat.length === 0 ? 1 : 2,
            record: action.payload.record,
            chat: action.payload.chat
          }
        }

      case SET_CURRENCY:
        return{
          ...state,
          currency: action.payload
        }

    default:
      return state;
  }
}

export default rootReducer;
