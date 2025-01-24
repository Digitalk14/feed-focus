import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-4">Welcome</h1>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-500 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors text-[#333]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-500 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors text-[#333]"
              placeholder="Enter your password"
            />
          </div>

          <button
            formAction={login}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full hover:opacity-90 transition-opacity"
          >
            LOGIN
          </button>

          <p className="text-center text-gray-500 mt-8">
            Don't have an account?{" "}
            <button
              formAction={signup}
              className="text-purple-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
