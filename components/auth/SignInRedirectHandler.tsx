"use client";

import { redirect, usePathname } from "next/navigation";

export function SignInRedirectHandler() {
  const pathname = usePathname();

  if (pathname === "/dashboard") {
    return redirect("/sign-in");
  }

  return redirect(`/sign-in?redirectTo=${encodeURIComponent(pathname)}`);
}
