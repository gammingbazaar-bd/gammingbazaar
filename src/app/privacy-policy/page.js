export default function PrivacyPolicyPage() {
  import React from "react";


  const faqs = [
    {
      question: "What information do we collect?",
      answer:
        "We only collect necessary information required to process your order, such as Player ID, transaction details, and basic contact information. We do not collect sensitive personal data.",
    },
    {
      question: "How do we use your information?",
      answer:
        "Your information is used only for processing Free Fire diamond top-up orders, providing customer support, and improving our service quality.",
    },
    {
      question: "How do we protect your data?",
      answer:
        "We take proper security measures to protect your data. Your information is stored securely and is never sold, shared, or misused for any third-party marketing.",
    },
    {
      question: "Do we store payment information?",
      answer:
        "We do not store your payment credentials. All payments are processed through secure third-party payment gateways like bKash, Nagad, or Rocket.",
    },
    {
      question: "Do we use cookies?",
      answer:
        "We may use cookies to improve user experience and website functionality. You can disable cookies from your browser settings if you prefer.",
    },
    {
      question: "Do we use third-party services?",
      answer:
        "We may use third-party services for payment processing and analytics. These services have their own privacy policies.",
    },
    {
      question: "Is my account safe?",
      answer:
        "We never ask for your Free Fire password or login credentials. Always keep your account information secure.",
    },
    {
      question: "Important Notice",
      answer:
        "By using our website, you agree to this Privacy Policy. We may update this policy anytime without prior notice.",
      isAlert: true,
    },
  ];

  return (
    <div className="container mx-auto px-2 md:px-4 py-6 md:py-10 max-w-6xl bg-[#070c18] text-white">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
        <p className="text-gray-400">Your privacy is important to us</p>
      </div>

      {/* FAQ Content */}
      <div className="space-y-5">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border ${
              item.isAlert
                ? "bg-red-500/10 border-red-500/30"
                : "bg-[#0b1224] border-white/10"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-2 ${
                item.isAlert ? "text-red-400" : "text-white"
              }`}
            >
              Q{index + 1}. {item.question}
            </h2>
            <p className="text-gray-300">A. {item.answer}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </div>
  );

}