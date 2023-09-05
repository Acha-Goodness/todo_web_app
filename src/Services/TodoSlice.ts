import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Todos {
    // userId: number;
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
});

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
});

const deleteTodos = createAsyncThunk("todo/delete", async (todoId:number) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method:"DELETE",
    });
    return todoId
});

export const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
        addTodo:(state, action:PayloadAction<{todo: string}>) => {
            state.todo.push({
                id: state.todo.length,
                title: action.payload.todo,
                completed:false,
            });
        },
        deleteTodo:(state, action:PayloadAction<number>) => {
            state.todo = state.todo.filter((todoItem) => todoItem.id !== action.payload)
        }
    },


    extraReducers:( builder ) => {
        builder.addCase(fetchTodo.fulfilled, ( state, action ) => {
            state.todo = action.payload;
        });

        builder.addCase(addTodos.fulfilled, ( state, action ) => {
            state.todo.push(action.payload);
        });

        builder.addCase(deleteTodos.fulfilled, ( state, action ) => {
            state.todo = state.todo.filter((todoItem) => todoItem.id !== action.payload);
        })
    }
});

export default TodoSlice.reducer;
export const { addTodo, deleteTodo } = TodoSlice.actions