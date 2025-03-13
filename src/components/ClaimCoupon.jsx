import { useState } from "react";

const ClaimCoupon = () => {
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState(null);

  const claimCoupon = async () => {
    try {
      const response = await fetch(
        "https://coupon-app-tlkb.onrender.com/api/coupons/claim"
      );
      const data = await response.json();

      if (response.ok) {
        setCoupon(data.coupon);
        setMessage(data.message);
      } else {
        setMessage(data.message); // Restriction message
      }
    } catch (error) {
      console.error("Error claiming coupon:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className='container'>
      <h1>Claim Your Coupon</h1>
      <button onClick={claimCoupon}>Claim Coupon</button>

      {message && (
        <p className={message.includes("Try again in") ? "error-message" : ""}>
          {message}
        </p>
      )}
      {coupon && (
        <p>
          Your Coupon: <strong>{coupon}</strong>
        </p>
      )}
    </div>
  );
};

export default ClaimCoupon;
