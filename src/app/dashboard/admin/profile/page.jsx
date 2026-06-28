import ProfileCard from "@/components/ProfileCard";
import { getUserSession } from "@/lib/core/session";
import React from "react";


export default async function ProfilePage() {
    const user = await getUserSession();
    // console.log(user)
  
  return (
    <div className="w-full px-2 sm:px-4 py-4 space-y-6">
      {/* Structural Header Layout */}
      <div className="border-b border-[#DCD3C7] pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-[#2C2520] tracking-tight">
          Account Workspace Overview
        </h1>
        <p className="text-sm text-[#2C2520]/60 font-medium mt-1">
          Review security contexts, operational system profile credentials, and access configuration scopes.
        </p>
      </div>


      <div className="w-full">
        <ProfileCard user={user} />
      </div>
    </div>
  );
}