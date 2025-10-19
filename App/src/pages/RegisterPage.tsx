import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        alert("Account Created Successfully");
      } else {
        alert("Account already exists");
      }

      form.reset();
    } catch (err) {
      console.log("Error while signing up", err);
    }
  }

  async function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/v1/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const backendData = await res.json();
      if (res.ok) {
        localStorage.setItem("token", backendData.token);
        localStorage.setItem("userId", backendData.userID);
        alert("Logged in Successfully");
        navigate("/HomePage");
      } else {
        alert("Login failed");
      }
      form.reset();
    } catch (err) {
      console.log("Error while logging in", err);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Signup Panel */}
      <div className="lg:w-1/2 bg-gradient-to-br from-blue-400 to-indigo-500 flex flex-col justify-center items-center p-10 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-yellow-300">Second Brain</span>
        </h1>
        <p className="text-xl mb-8">Create your account</p>
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="p-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-yellow-300 transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-yellow-300 transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-yellow-300 transition"
            required
          />
          <button className="bg-yellow-300 text-blue-900 font-bold py-3 rounded-lg hover:scale-105 transition-transform">
            Create My Account
          </button>
        </form>
      </div>

      {/* Separator */}
      <div className="flex items-center justify-center p-4 lg:p-0">
        <span className="text-2xl font-bold text-gray-500">or</span>
      </div>

      {/* Login Panel */}
      <div className="lg:w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center p-10">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">
          Login to your account
        </h2>
        <form
          onSubmit={handleSignin}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <button className="bg-blue-500 text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
