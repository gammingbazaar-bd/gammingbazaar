"use client";
import React from 'react';

interface ManualPaymentFormProps {
    product: any;
    selectedRechargeType: string;
    quantity: number;
    totalAmount: number;
    paymentMethods: any[];
    selectedManualMethod: any;
    setSelectedManualMethod: React.Dispatch<React.SetStateAction<any>>;
    senderNumber: string;
    setSenderNumber: React.Dispatch<React.SetStateAction<string>>;
    transactionId: string;
    setTransactionId: React.Dispatch<React.SetStateAction<string>>;
    error: string | null;
    loading: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export default function ManualPaymentForm({
    product, selectedRechargeType, quantity, totalAmount, paymentMethods,
    selectedManualMethod, setSelectedManualMethod, senderNumber, setSenderNumber,
    transactionId, setTransactionId, error, loading, onSubmit, onCancel
}: ManualPaymentFormProps) {
    return (
  <section className="mt-4">
  <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-5 md:p-6">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold text-white">
        Manual Payment
      </h2>

      <button
        onClick={onCancel}
        className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full w-9 h-9 flex items-center justify-center transition"
      >
        ✕
      </button>
    </div>

    {/* ORDER SUMMARY */}
    <div className="mb-6 p-4 bg-slate-800 border border-slate-700 rounded-xl">
      <h3 className="text-sm font-semibold text-slate-300 mb-3 border-b border-slate-700 pb-2">
        Order Summary
      </h3>

      <div className="space-y-2 text-sm text-slate-400">
        <p><span className="text-white font-medium">Product:</span> {product?.name}</p>
        <p><span className="text-white font-medium">Package:</span> {selectedRechargeType}</p>
        <p><span className="text-white font-medium">Quantity:</span> {quantity}</p>

        <p className="text-lg font-semibold text-orange-400 mt-3 pt-2 border-t border-slate-700">
          Total: ৳ {totalAmount}
        </p>
      </div>
    </div>

    <form onSubmit={onSubmit}>

      {/* PAYMENT METHOD */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Select Payment Method
        </label>

        {paymentMethods.length === 0 ? (
          <div className="text-center py-3 text-slate-500 italic">
            Loading payment options...
          </div>
        ) : (
          <div className="flex gap-3 flex-wrap">
            {paymentMethods.map((method) => {
              const isSelected =
                selectedManualMethod &&
                selectedManualMethod.id === method.id;

              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedManualMethod(method)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200

                  ${isSelected
                    ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md scale-[1.03]"
                    : "bg-slate-800 border border-slate-700 text-slate-300 hover:border-orange-400"
                  }
                  `}
                >
                  {method.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* PAYMENT INFO */}
      {selectedManualMethod && (
        <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
          <p className="text-sm text-slate-300 mb-1">
            Send money to
          </p>

          <p className="text-xl font-bold tracking-wide text-orange-400">
            {selectedManualMethod.phone}
          </p>

          <p className="text-sm text-slate-300 mt-2">
            Amount: <span className="font-semibold text-orange-400">৳ {totalAmount}</span>
          </p>

          <p className="text-xs text-pink-400 mt-2">
            প্রথমে উপরের নাম্বারে টাকা পাঠান, তারপর নিচে তথ্য দিন।
          </p>
        </div>
      )}

      {/* INPUTS */}
      <div className="space-y-4 mb-6">

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Your Number / Sender Number
          </label>

          <input
            type="text"
            value={senderNumber || ""}
            onChange={(e) => setSenderNumber(e.target.value)}
            placeholder="01XXXXXXXXX"
            required
            className="w-full border border-slate-700 rounded-xl px-4 py-2.5 
            bg-slate-800 text-white placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 
            transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Transaction ID
          </label>

          <input
            type="text"
            value={transactionId || ""}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter TrxID"
            required
            className="w-full border border-slate-700 rounded-xl px-4 py-2.5 
            bg-slate-800 text-white placeholder-slate-400 uppercase
            focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 
            transition"
          />
        </div>

      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex gap-2">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* BUTTONS */}
      <div className="flex gap-4">

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-800 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-gradient-to-r from-pink-500 via-orange-500 to-red-500 
          text-white rounded-xl shadow-lg shadow-orange-500/20 
          hover:from-pink-600 hover:to-red-600 
          transition disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Payment"}
        </button>

      </div>

    </form>
  </div>
</section>
    );
}
