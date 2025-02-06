import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Email Confirmed!</h1>
          <p className="text-gray-600">
            Your email has been successfully verified. You can now log in to your account.
          </p>
        </div>
        <Link
          href="/login"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
