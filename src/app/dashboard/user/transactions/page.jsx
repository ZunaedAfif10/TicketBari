import TransactionHistoryTable from "@/components/Transaction/TransactionHistoryTable";
import { getPaymentsByEmail } from "@/lib/api/payment";
import React from "react";


export default async function TransactionHistoryPage() {
    
    const transactions = await getPaymentsByEmail('rahim@gmail.com')
    console.log(transactions)

    const mockTransactions = [
        {
            _id: "6a423bda8da654a9e83ebda0",
            userEmail: "rahim@gmail.com",
            amount: "225",
            transactionId: "pi_3TnbaB2OySSens9K0zwOTCCm",
            paymentStatus: "paid",
            ticketTitle: "hanif",
            paidAt: "2026-06-29T09:33:14.928Z"
        }
    ];

    // 2. Safely pass down the clean transaction matrix array via props
    return (
        <div className="p-4 sm:p-8 bg-[#F4EFEA] min-h-screen">
            <div className="max-w-6xl mx-auto">
                <TransactionHistoryTable transactions={mockTransactions} />
            </div>
        </div>
    );
}