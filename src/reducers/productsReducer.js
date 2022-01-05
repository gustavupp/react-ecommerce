
const productsReducer = (state, action) => {
     switch(action.type){
          case 'OPEN_SIDEBAR':
               return {...state, isSidebarOpen: true};
          case 'CLOSE_SIDEBAR':
               return {...state, isSidebarOpen: false};
          case 'GET_PRODUCTS_BEGIN':
               return {...state, products_loading: true};
          case 'GET_PRODUCTS_SUCCESS':
               const featureProducts = action.payload.filter(item => item.categories[1] && item.categories[1].slug === 'featured');
               return {...state, products_loading: false, products: action.payload, featured_products: featureProducts };
          case 'GET_PRODUCTS_ERROR':
               return {...state, products_error: true, products_loading: false};
          case 'GET_SINGLE_PRODUCT_BEGIN':
               return {...state, single_product_loading: true};
          case 'GET_SINGLE_PRODUCT_ERROR':
               return {...state, single_product_error: true, single_product_loading: false};
          case 'GET_SINGLE_PRODUCT_SUCCESS':
               return {...state, single_product: action.payload, single_product_loading: false};
          default:
               return state;
     }
}

export default productsReducer;