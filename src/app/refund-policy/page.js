export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-2 md:px-4 py-6 md:py-10 max-w-6xl bg-gradient-to-b from-[#070c18] via-[#0b1224] to-[#05070d] text-white">

      {/* Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-pink-500/10 blur-3xl rounded-full top-[-120px] right-[-120px]" />
      <div className="absolute w-[400px] h-[400px] bg-violet-500/10 blur-3xl rounded-full bottom-[-120px] left-[-120px]" />

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            Refund Policy
          </h1>
          <p className="text-gray-400 mt-3">
            Kindly review our refund terms before making any purchase
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">

          {[
            {
              title: "1. General Policy",
              content:
                "Refunds are only applicable under specific conditions outlined below. By placing an order, you acknowledge and agree to this refund policy."
            },
            {
              title: "2. Eligible Refund Situations",
              content: (
                <ul className="list-disc pl-5 mt-2 text-gray-300 space-y-1">
                  <li>Order was not successfully delivered</li>
                  <li>Technical error occurred from our system</li>
                  <li>Payment received but service was not processed</li>
                </ul>
              )
            },
            {
              title: "3. Refund Method",
              content:
                "Approved refunds will be issued as in-app wallet credit only. We do not offer cash refunds under any circumstances."
            },
            {
              title: "4. Processing Time",
              content:
                "Refund requests are typically processed within 1–2 working hours after verification. In exceptional cases, it may take up to 24 hours."
            },
            {
              title: "5. Non-Refundable Conditions",
              content: (
                <ul className="list-disc pl-5 mt-2 text-gray-300 space-y-1">
                  <li>Incorrect Player ID submitted by the customer</li>
                  <li>Orders that have been successfully completed</li>
                  <li>Delays caused by game server or external issues</li>
                </ul>
              )
            },
            {
              title: "6. Fraud & Abuse Policy",
              content:
                "Any attempt to misuse or falsely claim refunds may result in order cancellation, account restriction, or permanent ban."
            }
          ].map((item, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border backdrop-blur-xl transition
                ${i === 2
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
            >
              <h2 className={`text-lg font-semibold mb-2
                ${i === 2 ? "text-red-300" : "text-white"}
              `}>
                {item.title}
              </h2>

              <div className="text-gray-300 text-sm leading-relaxed">
                {item.content}
              </div>
            </div>
          ))}

        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </div>

      </div>
    </div>
  );
}