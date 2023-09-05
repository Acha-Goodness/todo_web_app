import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Todos {
    userId: number;
    id:number;
    title: string;
    completed: boolean;
}

interface TodoState {
    todo: Todos[],
}

const initialState : TodoState = {
    todo: [],
}

export const fetchTodo = createAsyncThunk("todo/fetch", async (thunkApi) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "GET"
    });
    const data = response.json();
    return data;
})

export const addTodos = createAsyncThunk("todo/add", async (todo:string, thunkApi) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            todo
        })
    });
    const data = await response.json();
    return data;
})

export const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
        addTodo:(state, action:PayloadAction<{todo: string}>) => {
            state.todo.push({
                userId: state.todo.length,
                id: state.todo.length,
                title: action.payload.todo,
                completed:false,
            });
        },
    },
    extraReducers:( builder ) => {
        builder.addCase(fetchTodo.fulfilled, (state, action) => {
            state.todo = action.payload;
        });

        builder.addCase(addTodos.fulfilled, ( state, action ) => {
            state.todo.push(action.payload)
        })
    }
});

export default TodoSlice.reducer;
export const { addTodo } = TodoSlice.actions