import React, { useState } from "react";
import { Todo } from "./types";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
};

const TodoItem = ({ todo, updateIsDone, remove, updateTodo }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todo?.name || "");
  const [editedTags, setEditedTags] = useState(
    Array.isArray(todo?.tags) ? todo.tags.join(", ") : ""
  );
  const [editedCategory, setEditedCategory] = useState(todo?.category || "");
  const [editedPriority, setEditedPriority] = useState(todo?.priority || 3);
  const [editedDeadline, setEditedDeadline] = useState<string>(
    todo?.deadline ? dayjs(todo.deadline).format("YYYY-MM-DDTHH:mm") : ""
  );

  if (!todo) {
    return null;
  }

  const priorityConfig = {
    1: { color: "bg-red-100 text-red-800", label: "高" },
    2: { color: "bg-yellow-100 text-yellow-800", label: "中" },
    3: { color: "bg-blue-100 text-blue-800", label: "低" },
  };

  const getDeadlineStatus = (deadline: Date | null) => {
    if (!deadline) return null;

    const now = dayjs();
    const deadlineDay = dayjs(deadline);
    const daysUntil = deadlineDay.diff(now, "day");
    const hoursUntil = deadlineDay.diff(now, "hour");

    if (deadlineDay.isBefore(now)) {
      return {
        text: "期限切れ",
        color: "bg-red-100 text-red-800",
      };
    } else if (daysUntil === 0) {
      return {
        text: `残り${hoursUntil}時間`,
        color: "bg-yellow-100 text-yellow-800",
      };
    } else {
      return {
        text: `残り${daysUntil}日`,
        color: "bg-green-100 text-green-800",
      };
    }
  };

  const deadlineStatus = todo.deadline
    ? getDeadlineStatus(todo.deadline)
    : null;

  const handleSave = () => {
    const tags = editedTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    updateTodo(todo.id, {
      name: editedName || todo.name,
      tags,
      category: editedCategory,
      priority: editedPriority,
      deadline: editedDeadline ? new Date(editedDeadline) : null,
    });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.01 }}
      className={`overflow-hidden rounded-xl border bg-white shadow-lg transition-all ${
        todo.isDone ? "bg-gray-50" : "bg-white"
      }`}
    >
      {isEditing ? (
        <div className="space-y-4 p-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              タスク名
            </label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              タグ（カンマ区切り）
            </label>
            <input
              type="text"
              value={editedTags}
              onChange={(e) => setEditedTags(e.target.value)}
              placeholder="タグをカンマ区切りで入力"
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              カテゴリ
            </label>
            <input
              type="text"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              優先度
            </label>
            <select
              value={editedPriority}
              onChange={(e) => setEditedPriority(Number(e.target.value))}
              className="rounded-lg border p-2"
            >
              <option value={1}>高</option>
              <option value={2}>中</option>
              <option value={3}>低</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              期限
            </label>
            <input
              type="datetime-local"
              value={editedDeadline}
              onChange={(e) => setEditedDeadline(e.target.value)}
              className="rounded-lg border p-2"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 font-medium text-white transition-all hover:from-green-600 hover:to-emerald-600"
            >
              保存
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="rounded-full bg-gradient-to-r from-gray-400 to-gray-500 px-4 py-2 font-medium text-white transition-all hover:from-gray-500 hover:to-gray-600"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={(e) => updateIsDone(todo.id, e.target.checked)}
              className="size-6 rounded-full border-2 border-indigo-300 text-indigo-500 transition-all focus:ring-indigo-500"
            />

            <div className="grow">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`text-lg font-medium ${
                    todo.isDone ? "text-gray-500 line-through" : "text-gray-900"
                  }`}
                >
                  {todo.name}
                </span>

                <span
                  className={`rounded-lg px-4 py-1.5 text-sm font-semibold shadow-sm ${
                    priorityConfig[todo.priority as keyof typeof priorityConfig]
                      .color
                  }`}
                >
                  優先度:{" "}
                  {
                    priorityConfig[todo.priority as keyof typeof priorityConfig]
                      .label
                  }
                </span>

                {todo.category && (
                  <span className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
                    {todo.category}
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {(todo.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 text-xs font-medium text-blue-800 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {todo.deadline && (
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="text-gray-600">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    期限: {dayjs(todo.deadline).format("YYYY/MM/DD HH:mm")}
                  </span>
                  {deadlineStatus && (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium shadow-sm ${deadlineStatus.color}`}
                    >
                      {deadlineStatus.text}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-indigo-600"
              >
                編集
              </button>
              <button
                onClick={() => remove(todo.id)}
                className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-red-600 hover:to-pink-600"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TodoItem;
