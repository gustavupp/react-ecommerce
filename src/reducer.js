import React from "react";

const reducer = (state, action) => {
     switch(action.type){
          case 'OPEN_SIDEBAR':
               return {...state, isSidebarOpen: true};
          case 'CLOSE_SIDEBAR':
               return {...state, isSidebarOpen: false};
          default:
               return state;
     }
}

export default reducer;