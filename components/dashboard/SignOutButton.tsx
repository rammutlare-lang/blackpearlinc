"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export function SignOutButton() {
  return (
    <Button variant="dark" onClick={() => signOut({ callbackUrl: "/" })}>
      Log out
    </Button>
  );
}
