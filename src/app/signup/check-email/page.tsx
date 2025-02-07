import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Thank you for signing up!</h1>
          <p className="text-gray-600">
            We have sent you an email to confirm your account. Please check your email and click on the link to complete the process.
          </p>
        </div>
      </div>
    </div>
  );
}
