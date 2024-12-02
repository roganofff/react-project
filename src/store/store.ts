import { configureStore, createSlice } from "@reduxjs/toolkit"

export interface Service {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    image: string
}

interface News {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

interface ProjectState {
    user: any;
    services: Service[];
    mainNews: News[];
}

const initialState: ProjectState = {
    user: "",
    services: [],
    mainNews: []
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setNews: (state, action) => {
            state.mainNews = action.payload
        },
        setServices: (state, action) => {
            state.services = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})


export const store = configureStore({
    reducer: projectSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;

export const { setNews, setServices, setUser } = projectSlice.actions;
