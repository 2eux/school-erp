import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Register for School ERP
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="user@school.edu" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="••••••••" />
            </div>
          </div>
          <button type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link href="/login" className="text-indigo-600">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
