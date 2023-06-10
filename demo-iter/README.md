1. npx create-react-app [title]

2. create folder structure

   - components
   - data
   - layouts
   - pages
   - services
   - utils

3. app planning

   - what pages might we need
     - what componenets might we need for those pages
   - what services/databases might we need
     - skip users as we might look more in depth next week at auth

4. create pages using rafce

   - task list
   - add task
   - edit task

```
    import { BrowserRouter, Route, Routes } from "react-router-dom";
    import { taskList } from "./pages/taskList";

    function App() {
    return (

    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" Component={taskList} />
    </Routes>
    </BrowserRouter>
    </div>
    );
    }
```

5. create TaskList page

6. create taskService.js

7. create Task component

8. optional setup tailwind

   - npm install -D tailwindcss
   - npx tailwindcss init
   - ```
        /** @type {import('tailwindcss').Config} */
     module.exports = {
       content: [
         "./src/**/*.{js,jsx,ts,tsx}",
       ],
       theme: {
         extend: {},
       },
       plugins: [],
     }
     ```

   - ```
     @tailwind base;
      @tailwind components;
      @tailwind utilities;
     ```

9. Create Button and Link to UpdateTask, talk about sending with prop or sending with id and querying server

10. Create TaskEdit component for reuse in task create
