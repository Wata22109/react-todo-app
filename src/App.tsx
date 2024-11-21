import { useState, useEffect } from "react";
import { Todo } from "./types";
import { initTodos } from "./initTodos";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RainbowTitle from "./components/RainbowTitle";
import {
  faTriangleExclamation,
  faChevronDown,
  faChevronUp,
  faClock,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoTags, setNewTodoTags] = useState("");
  const [newTodoCategory, setNewTodoCategory] = useState("");
  const [newTodoNameError, setNewTodoNameError] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [filter, setFilter] = useState<{
    category: string | null;
    tags: string[];
    priority: number | null;
  }>({
    category: null,
    tags: [],
    priority: null,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"deadline" | "priority" | "none">(
    "none"
  );

  const localStorageKey = "TodoApp";

  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  const isValidTodoName = (name: string): string => {
    if (name.length < 2 || name.length > 32) {
      return "2文字以上、32文字以内で入力してください";
    }
    return "";
  };

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value));
    setNewTodoName(e.target.value);
  };

  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  const updateIsDone = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: value };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  const remove = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const addNewTodo = () => {
    const err = isValidTodoName(newTodoName);
    if (err !== "") {
      setNewTodoNameError(err);
      return;
    }

    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
      tags: newTodoTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      category: newTodoCategory || undefined,
    };

    setTodos([...todos, newTodo]);

    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
    setNewTodoTags("");
    setNewTodoCategory("");
    setNewTodoNameError("");
  };

  const getSortedAndFilteredTodos = () => {
    const filteredTodos = todos.filter((todo) => {
      if (filter.category && todo.category !== filter.category) return false;
      if (
        filter.tags.length > 0 &&
        !filter.tags.every((tag) => todo.tags?.includes(tag))
      )
        return false;
      if (filter.priority !== null && todo.priority !== filter.priority)
        return false;
      return true;
    });

    switch (sortBy) {
      case "deadline":
        return filteredTodos.sort((a, b) => {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return dayjs(a.deadline).valueOf() - dayjs(b.deadline).valueOf();
        });
      case "priority":
        return filteredTodos.sort((a, b) => a.priority - b.priority);
      default:
        return filteredTodos;
    }
  };

  const availableCategories = Array.from(
    new Set(todos.map((todo) => todo.category).filter(Boolean))
  );

  const availableTags = Array.from(
    new Set(todos.flatMap((todo) => todo.tags || []))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-10">
      <RainbowTitle>TODOs</RainbowTitle>

      <div className="mb-6 overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-300">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex w-full items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 text-white transition hover:from-indigo-600 hover:to-purple-600"
        >
          <h2 className="text-xl font-bold">新しいタスクの追加</h2>
          <FontAwesomeIcon
            icon={showAddForm ? faChevronUp : faChevronDown}
            className="text-lg"
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            showAddForm ? "max-h-[1000px] p-6" : "max-h-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                タスク名
              </label>
              <input
                type="text"
                value={newTodoName}
                onChange={updateNewTodoName}
                className={twMerge(
                  "mt-1 w-full rounded-lg border p-2",
                  newTodoNameError && "border-red-500"
                )}
                placeholder="2文字以上、32文字以内で入力してください"
              />
              {newTodoNameError && (
                <div className="mt-1 flex items-center space-x-1 text-sm font-bold text-red-500">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="mr-0.5"
                  />
                  <div>{newTodoNameError}</div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  優先度
                </label>
                <select
                  value={newTodoPriority}
                  onChange={updateNewTodoPriority}
                  className="mt-1 w-full rounded-lg border p-2"
                >
                  <option value={1}>高</option>
                  <option value={2}>中</option>
                  <option value={3}>低</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  期限
                </label>
                <input
                  type="datetime-local"
                  value={
                    newTodoDeadline
                      ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm")
                      : ""
                  }
                  onChange={updateDeadline}
                  className="mt-1 w-full rounded-lg border p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                カテゴリ
              </label>
              <input
                type="text"
                value={newTodoCategory}
                onChange={(e) => setNewTodoCategory(e.target.value)}
                className="mt-1 w-full rounded-lg border p-2"
                placeholder="カテゴリを入力"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                タグ（カンマ区切り）
              </label>
              <input
                type="text"
                value={newTodoTags}
                onChange={(e) => setNewTodoTags(e.target.value)}
                className="mt-1 w-full rounded-lg border p-2"
                placeholder="タグ1, タグ2, タグ3"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={addNewTodo}
            className={twMerge(
              "mt-6 w-full rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 py-3 font-bold text-white transition-all hover:from-indigo-600 hover:to-purple-600",
              newTodoNameError && "cursor-not-allowed opacity-50"
            )}
            disabled={!!newTodoNameError}
          >
            タスクを追加
          </button>
        </div>
      </div>

      <div className="mb-6 overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-300">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex w-full items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 text-white transition hover:from-indigo-600 hover:to-purple-600"
        >
          <h2 className="text-xl font-bold">フィルター＆ソート</h2>
          <FontAwesomeIcon
            icon={showFilters ? faChevronUp : faChevronDown}
            className="text-lg"
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            showFilters ? "max-h-[1000px] p-6" : "max-h-0"
          }`}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="font-medium text-gray-700">
              <FontAwesomeIcon icon={faSort} className="mr-2" />
              ソート:
            </span>
            <button
              onClick={() => setSortBy("deadline")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                sortBy === "deadline"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              期限が近い順
            </button>
            <button
              onClick={() => setSortBy("priority")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                sortBy === "priority"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              優先度順
            </button>
            <button
              onClick={() => setSortBy("none")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                sortBy === "none"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              ソートなし
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                カテゴリでフィルター
              </label>
              <select
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm"
                value={filter.category || ""}
                onChange={(e) =>
                  setFilter({ ...filter, category: e.target.value || null })
                }
              >
                <option value="">すべて</option>
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                タグでフィルター
              </label>
              <select
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm"
                value=""
                onChange={(e) => {
                  if (e.target.value && !filter.tags.includes(e.target.value)) {
                    setFilter({
                      ...filter,
                      tags: [...filter.tags, e.target.value],
                    });
                  }
                }}
              >
                <option value="">タグを選択...</option>
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <div className="mt-2 flex flex-wrap gap-2">
                {filter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1.5 inline-flex size-4 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500"
                      onClick={() =>
                        setFilter({
                          ...filter,
                          tags: filter.tags.filter((t) => t !== tag),
                        })
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                優先度でフィルター
              </label>
              <select
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm"
                value={filter.priority || ""}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    priority: e.target.value ? Number(e.target.value) : null,
                  })
                }
              >
                <option value="">すべて</option>
                <option value="1">高</option>
                <option value="2">中</option>
                <option value="3">低</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">タスク一覧</h2>
        <button
          type="button"
          onClick={removeCompletedTodos}
          className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-sm font-bold text-white transition-all hover:from-red-600 hover:to-pink-600"
        >
          完了済みのタスクを削除
        </button>
      </div>

      <TodoList
        todos={getSortedAndFilteredTodos()}
        updateIsDone={updateIsDone}
        remove={remove}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default App;
