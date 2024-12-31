"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-sm mx-auto">
          <div className="text-center">
            <img className="w-auto h-12 mx-auto" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg" alt="" />
            <h1 className="mt-12 text-3xl font-bold text-gray-900">Welcome Back</h1>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="text-sm font-bold text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-bold text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password (min. 8 character)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                  />
                </div>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
