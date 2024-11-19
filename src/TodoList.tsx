import { Todo } from "./types";
import TodoItem from "./TodoItem";
import { AnimatePresence } from "framer-motion";

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
};

const TodoList = (props: Props) => {
  const { todos } = props;

  if (todos.length === 0) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-center text-red-500">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateIsDone={props.updateIsDone}
            remove={props.remove}
            updateTodo={props.updateTodo}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
