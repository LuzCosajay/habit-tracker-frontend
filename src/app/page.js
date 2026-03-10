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
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">Mis Hábitos</h1>

        {loading && <p className="text-slate-600">Cargando...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && list.length === 0 && (
          <p className="text-slate-600">No hay hábitos aún.</p>
        )}

        {!loading && !error && list.length > 0 && (
          <ul className="space-y-4">
            {list.map((habit) => (
              <li
                key={habit._id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-lg font-medium text-slate-800">
                    {habit.name}
                  </span>
                  <button className="rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600">
                    Done
                  </button>
                </div>

                <div className="h-3 w-full rounded-full bg-slate-200">
                  <div className="h-3 w-2/5 rounded-full bg-emerald-500"></div>
                </div>

                <p className="mt-2 text-sm text-slate-500">Progreso: 40%</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}