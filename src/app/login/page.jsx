"use client";

import { useState } from "react";
import Link from "next/link";
import { At, Shield, ArrowRight, LogoGoogle } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/"
      });
      if (!error)
        toast.success("Logged in successfully")
      // console.log(data, error);

      if (error) {
        toast.warning("Wrong credentials")
        setError(error.message || "An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      // console.log(data, error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    // bg-transparent lets your RootLayout bg-[#F4EFEA] take over naturally
    <div className="bg-transparent flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-[#2C2520] tracking-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-[#2C2520]/70">
          Or{" "}
          <Link
            href="/register"
            className="font-bold text-[#4A6761] hover:underline transition"
          >
            create a brand new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Card matches the Navbar Oatmeal color #EAE3DA */}
        <div className="bg-[#EAE3DA] py-8 px-4 shadow-md sm:rounded-lg sm:px-10 border border-[#DCD3C7]">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm font-medium">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-[#2C2520]"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <At className="h-5 w-5 text-[#2C2520]/40" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-[#DCD3C7] rounded-md bg-[#F4EFEA] text-[#2C2520] placeholder-[#2C2520]/40 focus:outline-none focus:ring-2 focus:ring-[#4A6761] focus:border-[#4A6761] text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-[#2C2520]"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-[#2C2520]/40" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-[#DCD3C7] rounded-md bg-[#F4EFEA] text-[#2C2520] placeholder-[#2C2520]/40 focus:outline-none focus:ring-2 focus:ring-[#4A6761] focus:border-[#4A6761] text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center space-x-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-[#F4EFEA] bg-[#4A6761] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A6761] transition disabled:opacity-50"
              >
                <span>{loading ? "Signing in..." : "Sign In"}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>

          {/* Divider line */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DCD3C7]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#EAE3DA] px-2 text-[#2C2520]/60 font-bold">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex justify-center items-center space-x-2 py-2 px-4 border border-[#DCD3C7] rounded-md shadow-sm text-sm font-bold text-[#2C2520] bg-[#F4EFEA] hover:bg-[#F4EFEA]/80 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A6761] disabled:opacity-50"
            >

              <span>Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}