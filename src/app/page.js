"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "../store/habitsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.habits);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mis Hábitos</h1>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && list.length === 0 && <p>No hay hábitos aún.</p>}

      {!loading && !error && list.length > 0 && (
        <ul>
          {list.map((habit) => (
            <li key={habit._id}>{habit.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}