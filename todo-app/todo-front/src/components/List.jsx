import { useState } from "react";
import api from "../api/axios";

// 서버 ObjectId 형식(24자리 hex 문자열)인지 확인(옛 로컬 항목 404 방지)
const isObjectId = (v) => typeof v === "string" && /^[0-9a-fA-F]{24}$/.test(v);

export default function List({ title, completed, id, todoData, setTodoData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [busy, setBusy] = useState(false);

  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  const getStyle = (completed) => ({
    padding: "10px",
    borderBottom: "1px #ccc dotted",
    textDecoration: completed ? "line-through" : "none",
    opacity: busy ? 0.6 : 1,
  });

  // 삭제 기능 (DELETE /api/todos/:id)
  const handleDelete = async () => {
    if (busy) return;
    setBusy(true);

    const prev = [...todoData];
    const next = prev.filter((t) => t.id !== id);
    setTodoData(next);
    localStorage.setItem("todoData", JSON.stringify(next));

    try {
      if (isObjectId(id)) {
        await api.delete(`/api/todos/${id}`);
      }
    } catch (e) {
      console.error(e);
      setTodoData(prev);
      localStorage.setItem("todoData", JSON.stringify(prev));
      alert("삭제에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  };

  // 완료 토글 (PUT /api/todos/:id) 
  const handleCompleteChange = async () => {
    if (busy) return;
    setBusy(true);

    const prev = [...todoData];
    const target = prev.find((t) => t.id === id);
    if (!target) {
      setBusy(false);
      return;
    }

    const newCompleted = !target.completed;
    const next = prev.map((t) => (t.id === id ? { ...t, completed: newCompleted } : t));
    setTodoData(next);
    localStorage.setItem("todoData", JSON.stringify(next));

    try {
      // 서버에도 완료 상태 업데이트 (ObjectId만)
      if (isObjectId(id)) {
        await api.put(`/api/todos/${id}`, {
          title: target.title,
          done: newCompleted, // 서버는 done 사용
        });
      }
    } catch (e) {
      console.error(e);
      setTodoData(prev);
      localStorage.setItem("todoData", JSON.stringify(prev));
      alert("상태 변경에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  };

  // 입력창 값 변경 시
  const handleEditChange = (e) => setEditedTitle(e.target.value);

  // 제목 수정 (PUT /api/todos/:id) 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    const trimmed = editedTitle.trim();
    if (!trimmed) return;

    setBusy(true);
    const prev = [...todoData];
    const target = prev.find((t) => t.id === id);

    const next = prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t));
    setTodoData(next);
    localStorage.setItem("todoData", JSON.stringify(next));

    try {
      // 서버에도 수정 요청 (ObjectId만)
      if (isObjectId(id)) {
        await api.put(`/api/todos/${id}`, {
          title: trimmed,
          done: target?.completed ?? false,
        });
      }
      setIsEditing(false);
    } catch (e) {
      console.error(e);
      setTodoData(prev);
      localStorage.setItem("todoData", JSON.stringify(prev));
      alert("수정에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  };

  // 수정 모드 UI
  if (isEditing) {
    return (
      <form style={getStyle(completed)} onSubmit={handleSubmit}>
        <input
          value={editedTitle}
          autoFocus
          onChange={handleEditChange}
          disabled={busy}
        />
        <button type="button" style={btnStyle} onClick={() => setIsEditing(false)} disabled={busy}>
          X
        </button>
        <button type="submit" style={btnStyle} disabled={busy}>
          Save
        </button>
      </form>
    );
  }

  // 일반 모드 UI
  return (
    <div style={getStyle(completed)}>
      <input
        type="checkbox"
        onChange={handleCompleteChange}
        checked={completed}
        disabled={busy}
      />
      {title}
      <button style={btnStyle} onClick={handleDelete} disabled={busy}>
        X
      </button>
      <button style={btnStyle} onClick={() => setIsEditing(true)} disabled={busy}>
        Edit
      </button>
    </div>
  );
}