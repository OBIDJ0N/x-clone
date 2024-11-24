import Auth from "@/components/auth";
import React from "react";

export default function page() {
    const user = false;
    
    if(!user) return <div className="container h-screen mx-auto max-w-7xl px-8"><Auth /></div>

    return <div>page</div>;
}
