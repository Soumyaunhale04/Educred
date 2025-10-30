import { useState } from "react";
import { GlowButton } from "../common/GlowButton";
import { Shield } from "lucide-react";

interface SignupPageProps {
  onSwitchToLogin: () => void;
}

export function SignupPage({ onSwitchToLogin }: SignupPageProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Connect MetaMask Wallet
  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("🦊 MetaMask not found! Please install it first.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      setWalletAddress(address);
      localStorage.setItem("walletAddress", address);
      alert(`✅ Wallet connected: ${address}`);
    } catch (error) {
      console.error(error);
      alert("Failed to connect MetaMask.");
    }
  };

  // ✅ Handle signup form submission
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress) {
      alert("⚠️ Please connect your MetaMask wallet first.");
      return;
    }

    // Store all signup data locally
    const userData = {
      name,
      email,
      studentId,
      password,
      walletAddress,
    };

    localStorage.setItem("educredUser", JSON.stringify(userData));

    alert("🎉 Signup successful! You can now login.");
    onSwitchToLogin(); // go back to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full border border-[#E5E7EB]">
        {/* Title */}
        <div className="text-center mb-6">
          <div
            className="inline-block p-4 rounded-2xl mb-4"
            style={{
              background: "linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)",
            }}
          >
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-[#1E1E1E] mb-2">Create Your EduCred Account</h1>
          <p className="text-[#6B7280]">
            Enter your details and connect MetaMask to continue
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-[#1E1E1E] mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Morgan"
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 focus:outline-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[#1E1E1E] mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@educred.com"
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 focus:outline-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[#1E1E1E] mb-2">Student ID</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="EDU-2024-5678"
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 focus:outline-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[#1E1E1E] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 focus:outline-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
              required
            />
          </div>

          <GlowButton
            type="button"
            onClick={connectWallet}
            className="w-full mt-4"
          >
            {walletAddress ? "✅ Wallet Connected" : "Connect MetaMask"}
          </GlowButton>

          <GlowButton type="submit" className="w-full mt-3">
            Create Account
          </GlowButton>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-[#6B7280]">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-[#2F80ED] hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
