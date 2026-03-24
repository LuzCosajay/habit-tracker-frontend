"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState("");
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [message, setMessage] = useState("");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const fetchHabits = async (authToken) => {
    try {
      const res = await fetch("http://localhost:3001/habits", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setHabits(data);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error obteniendo hábitos:", error);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchHabits(savedToken);
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await res.json();
      setMessage(data.message || "Registro completado");
    } catch (error) {
      console.error("Error en registro:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setMessage("Login exitoso");
        fetchHabits(data.token);
      } else {
        setMessage(data.message || "Error en login");
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  const handleAddHabit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: habitName }),
      });

      const data = await res.json();

      if (data._id) {
        setHabitName("");
        fetchHabits(token);
      } else {
        setMessage(data.message || "No se pudo agregar el hábito");
      }
    } catch (error) {
      console.error("Error agregando hábito:", error);
    }
  };

  const handleDone = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/habits/${id}/done`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.message) {
        setMessage(data.message);
      }

      fetchHabits(token);
    } catch (error) {
      console.error("Error marcando hábito:", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">Habit Tracker</h1>

        {message && (
          <p className="mb-4 rounded bg-slate-100 p-3 text-slate-700">{message}</p>
        )}

        {!token ? (
          <div className="grid gap-6 md:grid-cols-2">
            <form onSubmit={handleRegister} className="space-y-3 rounded-xl border p-4">
              <h2 className="text-xl font-semibold">Registro</h2>

              <input
                type="text"
                placeholder="Nombre"
                className="w-full rounded border p-2"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded border p-2"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Contraseña"
                className="w-full rounded border p-2"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />

              <button className="rounded bg-blue-600 px-4 py-2 text-white">
                Registrarse
              </button>
            </form>

            <form onSubmit={handleLogin} className="space-y-3 rounded-xl border p-4">
              <h2 className="text-xl font-semibold">Login</h2>

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded border p-2"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Contraseña"
                className="w-full rounded border p-2"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />

              <button className="rounded bg-green-600 px-4 py-2 text-white">
                Iniciar sesión
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <form onSubmit={handleAddHabit} className="flex gap-3">
              <input
                type="text"
                placeholder="Nuevo hábito"
                className="flex-1 rounded border p-2"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
              />
              <button className="rounded bg-slate-800 px-4 py-2 text-white">
                Agregar
              </button>
            </form>

            {habits.length === 0 ? (
              <p className="text-slate-600">No hay hábitos aún.</p>
            ) : (
              <ul className="space-y-4">
                {habits.map((habit) => {
                  const progress = Math.min((habit.streak / 66) * 100, 100);

                  return (
                    <li
                      key={habit._id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-lg font-medium text-slate-800">
                          {habit.name}
                        </span>

                        <button
                          onClick={() => handleDone(habit._id)}
                          className="rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
                        >
                          Done
                        </button>
                      </div>

                      <div className="h-3 w-full rounded-full bg-slate-200">
                        <div
                          className="h-3 rounded-full bg-emerald-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        Racha: {habit.streak} día(s) - Progreso: {progress.toFixed(0)}%
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </main>
  );
}