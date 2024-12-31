import Image from "next/image";
import Link from "next/link";  // Import Link for navigation

export default function Home() {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-sm mx-auto">
          <div className="text-center">
            <img
              className="w-auto h-12 mx-auto"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
              alt="Logo"
            />
            <h1 className="mt-12 text-3xl font-bold text-gray-900">
              Welcome to the Project
            </h1>
            <p className="mt-4 text-sm font-medium text-gray-500">
              Please sign in or log in to access your account.
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/signin" // Link to your sign-in page
              className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              <img
                className="w-5 h-5 mr-2"
                src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/sign-in/1/google-logo.svg"
                alt="Google logo"
              />
              Sign in with Google
            </Link>
          </div>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 text-sm text-gray-400 bg-white"> or </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/login" // Link to your login page
              className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
            >
              Login
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-gray-900">
              Don't have an account?{" "}
              <Link href="/signup" className="font-bold hover:underline">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
