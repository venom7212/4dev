import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "state",
  initialState: {
    isAuthorized: false,
    users: [{ login: "admin", password: "admin" }],
    priorities: [{ 0: "низкий" }, { 1: "средний" }, { 2: "высокий" }],
    statuses: [{ 0: "в очереди" }, { 1: "в работе" }, { 2: "выполнено" }],
    tasks: [
      {
        id: "001",
        status: 0,
        priority: 2,
        title: "Develop website homepage",
        description:
          "Create a visually appealing and responsive homepage for the website",
        schedule: {
          creation_time: "2021-07-23T10:00:00",
        },
        author_name: "John Smith",
      },
      {
        id: "002",
        status: 1,
        priority: 1,
        title: "Implement user authentication",
        description: "Add user authentication feature to the website",
        schedule: {
          creation_time: "2021-07-24T14:30:00",
        },
        author_name: "Sarah Lee",
      },
      {
        id: "003",
        status: 2,
        priority: 0,
        title: "Fix CSS issues on mobile devices",
        description: "Resolve CSS issues on the website for mobile devices",
        schedule: {
          creation_time: "2021-07-25T11:15:00",
        },
        author_name: "John Smith",
      },
      {
        id: "004",
        status: 0,
        priority: 1,
        title: "Add search functionality",
        description: "Implement search feature on the website",
        schedule: {
          creation_time: "2021-07-26T09:00:00",
        },
        author_name: "John Smith",
      },
      {
        id: "005",
        status: 1,
        priority: 2,
        title: "Optimize website performance",
        description: "Improve website loading speed and overall performance",
        schedule: {
          creation_time: "2021-07-27T16:45:00",
        },
        author_name: "James Wilson",
      },
      {
        id: "006",
        status: 2,
        priority: 0,
        title: "Fix broken links on the website",
        description: "Identify and fix broken links on the website",
        schedule: {
          creation_time: "2021-07-28T13:20:00",
        },
        author_name: "Sarah Lee",
      },
      {
        id: "007",
        status: 0,
        priority: 1,
        title: "Create product page",
        description: "Design and develop a product page for the website",
        schedule: {
          creation_time: "2021-07-29T10:30:00",
        },
        author_name: "David Taylor",
      },
      {
        id: "008",
        status: 1,
        priority: 2,
        title: "Implement payment gateway",
        description:
          "Add payment gateway to the website for online transactions",
        schedule: {
          creation_time: "2021-07-30T14:00:00",
        },
        author_name: "Emma Anderson",
      },
      {
        id: "009",
        status: 2,
        priority: 0,
        title: "Translate website content",
        description: "Translate website content to multiple languages",
        schedule: {
          creation_time: "2021-07-31T11:45:00",
        },
        author_name: "Ryan Garcia",
      },
      {
        id: "010",
        status: 0,
        priority: 1,
        title: "Design email templates",
        description:
          "Create visually appealing email templates for the website",
        schedule: {
          creation_time: "2021-08-01T09:15:00",
        },
        author_name: "Emma Anderson",
      },
    ],
    authors: [
      {
        author_name: "John Smith",
      },
      {
        author_name: "Sarah Lee",
      },
      {
        author_name: "James Wilson",
      },
      {
        author_name: "David Taylor",
      },
      {
        author_name: "Emma Anderson",
      },
      {
        author_name: "Ryan Garcia",
      },
    ],
  },
  reducers: {
    setIsAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
    addTasks: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
      return state;
    },
    deleteTask: (state, action) => {
      const { tasks } = state;
      const idDelete = action.payload;

      console.log("redux", idDelete);

      const filteredTasks = tasks.filter((task) => task.id !== idDelete);
      state.tasks = filteredTasks;

      // tasks = filteredTasks
    },

    updateTask: (state, action) => {
      // const  id = action.payload;
      const { id, statusState,priorityState } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          status: statusState,
          priority: priorityState,
        };
      }
      return state;
    },
  },
});

export const { setIsAuthorized, addTasks, deleteTask, updateTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
