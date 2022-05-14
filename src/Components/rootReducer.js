const initState = {
    is_any_file_selected: false,
    search_results: [],
    search_query: "",
    is_upload: false,
    selected: {
        _id: "",
        name: "",
        owner: "",
        branch: "",
        endsem: false,
        code: "",
        date: "",
        avgrating: 0,
        ratings: [],
        downloads: "",
        base64_file: "",
      },
}

const rootReduer = (state = initState, action) => {
    if(action.type === "SET_RESULTS") {
        console.log(action.data)
        state.search_results = []
        let x = state.search_results.concat(action.data)
        return {...state, search_results: x};
    }
    if(action.type === "SET_FILE") {
        return {...state,  is_any_file_selected: true, selected: {
            ...state.selected,
            _id: action.data._id,
            name: action.data.name,
            owner: action.data.owner,
            branch: action.data.branch,
            endsem: action.data.endsem,
            code: action.data.code,
            date: action.data.date,
            avgrating: action.data.avgrating,
            ratings: action.data.ratings,
            downloads: action.data.downloads,
            base64_file: action.data.base64_file,
        }}
        // selected: action.data,
    }
    if(action.type === "UNSET_FILE") {
        return {...state, is_any_file_selected: false}
    }
    if(action.type === "SET_UPLOAD") {
        return {
            ...state,
            is_upload: action.data
        }
    }
    return state;
}

export default rootReduer;