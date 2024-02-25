// slices/selectedContentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCategory: 'pocetna', // Set the initial value to "pocetna"
    categoriesData:null,
    contentData: null,   // Articles belonging to specific category
    highlightData: null, // Articles in highlights on homepage
    mainArticles: null, //Articles in categories on homepage
    najnovijeData:null,
    loading:false,
};

const selectedContentSlice = createSlice({
    name: 'selectedContent',
    initialState,
    reducers: {
        //Selected category, single string
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },


        /* categoriesData EXAMPLE:
        _id: 652455a87274753dbd37c87a
        name:"BiH"
        category_url:"bih"
        order_number:1
        hidden:false
        */
        setAllCategories: (state, action) => {
            state.categoriesData = action.payload;
        },

        setMainArticles: (state, action) => {
            state.mainArticles = action.payload;
        },

        //News atricles belonging to specific category
        setContentData: (state, action) => {
            state.contentData = action.payload;
        },
        //News articles from highlights
        setHighlightData: (state, action) => {
            state.highlightData = action.payload;
        },

        setNajnovijeData: (state, action) => {
            state.najnovijeData = action.payload;
        },

        setLoading: (state, action) => { // Define setLoading reducer
            state.loading = action.payload;
        },
    },
});

export const { setMainArticles,setSelectedCategory, setAllCategories,setLoading ,setNajnovijeData, setContentData, setHighlightData } = selectedContentSlice.actions;
export default selectedContentSlice.reducer;
