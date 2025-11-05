import { useNavigate } from "react-router-dom";
import { verifyAdmin } from "../../services/auth";
import { useState } from "react";

export default function LoginPage() {
  const [busy, setbusy] = useState(false);
  const navigate = useNavigate();

  const _onSubmit = async (e: any) => {
    e.preventDefault();
    if (busy) return;
    setbusy(true);
    await verifyAdmin({ email: e.target.email.value })
      .then((res) => {
        localStorage.setItem("authToken", res.token);
        navigate("/auth/otp");
      })
      .catch(() => {})
      .finally(() => setbusy(false));
  };

  return (
    <form onSubmit={_onSubmit}>      
      <div className="text-[28px] font-[ClashDisplay]">
        LOGIN BRAND ADMIN
      </div>
      <div className="mt-6">Username or Email</div>
      <input
        className="text-[14px] mt-2 border-[1.5px] border-[#16263B] bg-[#0F1626] rounded-[12px] px-4 py-3 w-full"
        placeholder="Enter your username"
        required
        autoFocus
        type="email"
        id="email"
      />
      <button className={`btn1 w-full mt-8 lg:mt-12 ${busy ? "busybtn" : ""}`}>
        Send OTP
      </button>
    </form>
  );
}
