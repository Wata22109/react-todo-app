import { Todo } from "./types";
import { v4 as uuid } from "uuid";

export const initTodos: Todo[] = [
  {
    id: uuid(),
    name: "解析2の宿題",
    isDone: false,
    priority: 2,
    deadline: new Date(2024, 10, 2, 17, 30),
    tags: ["勉強", "数学"],
    category: "学習",
  },
  {
    id: uuid(),
    name: "TypeScriptの勉強 (復習)",
    isDone: false,
    priority: 3,
    deadline: null,
    tags: ["プログラミング", "Web"],
    category: "学習",
  },
  {
    id: uuid(),
    name: "基礎物理学3の宿題",
    isDone: true,
    priority: 1,
    deadline: new Date(2024, 10, 11),
    tags: ["勉強", "物理"],
    category: "学習",
  },
  {
    id: uuid(),
    name: "図書の返却",
    isDone: true,
    priority: 2,
    deadline: null,
    tags: ["その他"],
    category: "生活",
  },
];
