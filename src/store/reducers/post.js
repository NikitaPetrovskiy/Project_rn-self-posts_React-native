import { LOAD_POSTS, TOGGLE_BOOKED, REMOVE_POST, ADD_POST } from "../types";

const initialState = {
    allPosts: [],
    bookedPosts: []
};

export const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_POSTS: {
            return {
                ...state,
                allPosts: action.payload,
                bookedPosts: action.payload.filter(post => post.booked)
            }
        }
        case TOGGLE_BOOKED: {
            const allPosts = state.allPosts.map(post => {
                if(post.id === action.payload) {
                    post.booked = !post.booked;
                }
                return post
            });
            return {
                ...state,
                allPosts,
                bookedPosts: allPosts.filter(post => post.booked)
            }
        }
        case REMOVE_POST: {
            const allPosts = state.allPosts.filter(post => {
                return post.id !== action.payload
            });
            const bookedPosts = state.bookedPosts.filter(post => {
                return post.id !== action.payload
            });
            return {
                ...state,
                allPosts,
                bookedPosts
            }
        }
        case ADD_POST: {
            return {
                ...state,
                allPosts: [
                    { ...action.payload }, 
                    ...state.allPosts
                ]
            }
        }
        default: 
            return state;
    }
}
