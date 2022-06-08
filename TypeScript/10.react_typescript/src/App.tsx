import React from "react";

import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const todos = [{ id: "t1", text: "Finish the Course" }];
  return <div className="App">
    {/* A component that add todos */}
    <TodoList items={todos} />
  </div>;
};

export default App;
