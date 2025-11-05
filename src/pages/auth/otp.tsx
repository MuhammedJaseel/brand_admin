import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginAdmin } from "../../services/auth";

export default function OTPPage() {
  const [busy, setbusy] = useState(false);
  const navigate = useNavigate();

  const _onSubmit = async (e: any) => {
    e.preventDefault();
    if (busy) return;
    setbusy(true);
    const token = localStorage.getItem("authToken") || "";
    await loginAdmin({ otp: e.target.otp.value, token })
      .then((res) => {
        localStorage.setItem("authToken", res.token);
        navigate("/");
      })
      .catch(() => {})
      .finally(() => setbusy(false));
  };

  return (
    <form onSubmit={_onSubmit}>
      <div className="text-[28px] font-[ClashDisplay]">
        OTP Verification
      </div>
      <div className="mt-6">Enter OTP</div>
      <input
        className="text-[14px] mt-2 border-[1.5px] border-[#16263B] bg-[#0F1626] rounded-[12px] px-4 py-3 w-full"
        placeholder="Enter otp"
        required
        autoFocus
        id="otp"
      />
      <button className={`btn1 w-full mt-8 lg:mt-12 ${busy ? "busybtn" : ""}`}>
        Verify & Continue
      </button>
      <div className="text-center w-full mt-4 lg:mt-6 text-[12px] lg:text-[14px]">
        Back to{" "}
        <span
          className="text-[#4F8FE1] cursor-pointer"
          onClick={() => navigate("/auth/login")}
        >
          login page?
        </span>
      </div>
    </form>
  );
}
