import AdminUserManagementTable from "@/components/Users/AdminUserManagementTable";
import { getAllUsers } from "@/lib/api/user";
import React from "react";


export default async function AdminUsersPage() {
    const allUsers = await getAllUsers();
    console.log(allUsers)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminUserManagementTable users={allUsers} />
        </div>
    );
}