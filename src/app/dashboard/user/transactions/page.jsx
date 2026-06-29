import TransactionHistoryTable from "@/components/Transaction/TransactionHistoryTable";
import { getPaymentsByEmail } from "@/lib/api/payment";
import { getUserSession } from "@/lib/core/session";
import React from "react";


export default async function TransactionHistoryPage() {
    const {email} = await getUserSession();
    
    const transactions = await getPaymentsByEmail(email)
    console.log(transactions)



    // 2. Safely pass down the clean transaction matrix array via props
    return (
        <div className="p-4 sm:p-8 bg-[#F4EFEA] min-h-screen">
            <div className="max-w-6xl mx-auto">
                <TransactionHistoryTable transactions={transactions} />
            </div>
        </div>
    );
}