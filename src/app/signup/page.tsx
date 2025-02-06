import { SignupForm } from "@/widgets";

export default function LoginPage() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-4">Welcome</h1>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
