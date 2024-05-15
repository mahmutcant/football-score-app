const initialState = {
    isLiveSelected: false,
};

const customReducer = (state = initialState, action:any) => {
    switch(action.type){
        case 'ISLIVESELECTED':
            return {...state, isLiveSelected: action.payload};
            default:
                return state;
    }
};

export default customReducer;
