import { useEffect, useState } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";
import api from "./api/axios";

// 서버에서 받은 데이터 → 클라이언트 정규화
const adaptFromServer = (t) => ({
  id: t.id ?? t._id,                 // 서버(_id) or 이미 정규화된(id)
  title: t.title,
  completed: t.completed ?? t.done ?? false,
  createdAt: t.createdAt,
  updatedAt: t.updatedAt,
});

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  // localStorage 동기화(새로고침시 유지)
  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
  }, [todoData]);

  // 최초 렌더 시 서버에서 할 일 목록 불러오기 (GET /api/todos)
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/todos");
        const items = Array.isArray(data) ? data.map(adaptFromServer) : [];
        setTodoData(items);
      } catch (e) {
        console.error("GET /api/todos failed:", e.response?.status, e.response?.data);
        const cached = localStorage.getItem("todoData");
        if (cached) setTodoData(JSON.parse(cached));
      }
    })();
  }, []);

  // 새로운 할 일을 추가 (POST /api/todos)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = value.trim();
    if (!title) return;

    try {
      const { data: created } = await api.post("/api/todos", { title });
      const item = adaptFromServer(created);
      setTodoData((prev) => [...prev, item]);
      setValue("");
    } catch (e) {
      console.error("POST /api/todos failed:", e.response?.status, e.response?.data);
      // 서버에 실패해도 임시로 목록에 표시 (낙관적 업데이트)
      const temp = { id: String(Date.now()), title, completed: false };
      setTodoData((prev) => [...prev, temp]);
      setValue("");
    }
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
        />
        <Form
          handleSubmit={handleSubmit}
          value={value}
          setValue={setValue}
        />
      </div>
    </div>
  );
}