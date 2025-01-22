import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Navigation } from "@/components/navigation";

export const LeftMenu = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#333]">FeedFocus</h1>
        </div>
        {/* Navigation Menu */}
        <Navigation />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};
