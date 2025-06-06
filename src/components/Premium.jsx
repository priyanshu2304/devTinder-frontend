import React, { useState } from 'react';
import axios from '../utils/axiosInstance';

const plans = [
  {
    name: 'Platinum',
    price: '₹999/month',
    benefits: [
      'Priority support',
      'Unlimited access',
      'Free merchandise',
      '24*7 Customer Support',
      'Life time free access',
    ],
    gradient: 'bg-gradient-to-br from-gray-900 to-gray-700 text-white',
  },
  {
    name: 'Gold',
    price: '₹699/month',
    benefits: [
      'Priority support',
      'Limited access',
      'Discounted merchandise',
      '24*7 Customer Support',
      'Life time free access',
    ],
    gradient: 'bg-gradient-to-br from-yellow-400 to-yellow-300 text-black',
  },
  {
    name: 'Silver',
    price: '₹499/month',
    benefits: [
      'Basic support',
      'Limited access',
      'No merchandise',
      '24*7 Customer Support',
      'Life time free access',
    ],
    gradient: 'bg-gradient-to-br from-gray-300 to-gray-100 text-black',
  },
];

const Premium = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleBuy = async (type) => {
    try {
      const resp = await axios.post('/payment/create', {
        type,
      });
      if (resp.data) {
        const { amount, currency, key, orderId, receipt, userId, notes } =
          resp.data;
        const { email, firstName, lastName, membershipType } = notes;
        const options = {
          key,
          amount,
          currency,
          name: 'Dev Tinder',

          order_id: orderId,
          prefill: {
            name: firstName + ' ' + lastName,
            email: email,
            contact: '9999999999',
          },
          theme: {
            color: '#726b69',
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-10">Choose Your Membership</h1>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl items-stretch justify-center">
        {plans.map((plan, index) => (
          <React.Fragment key={index}>
            {index !== 0 && (
              <div className="hidden md:flex items-center">
                <div className="divider divider-horizontal">OR</div>
              </div>
            )}
            <div
              className={`card flex-1 cursor-pointer transform transition-all duration-300 rounded-2xl shadow-xl ${
                selectedIndex === index
                  ? 'scale-105 ring ring-primary'
                  : 'hover:scale-105 hover:shadow-2xl'
              } ${plan.gradient}`}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="card-body">
                <h2 className="card-title text-2xl">{plan.name}</h2>
                <p className="text-lg font-semibold">{plan.price}</p>
                <ul className="mt-2 space-y-1">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx}>✅ {benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-10">
        <button
          className="btn btn-primary px-10"
          disabled={selectedIndex === null}
          onClick={() => handleBuy(plans[selectedIndex]?.name)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Premium;
