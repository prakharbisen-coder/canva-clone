"use client";

import { User } from "lucide-react";

import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserButton = () => {
  // Default guest user
  const name = "Guest User";
  const imageUrl = "";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opcaity-75 transition">
          <AvatarImage alt={name} src={imageUrl || ""} />
          <AvatarFallback className="bg-blue-500 font-medium text-white flex items-center justify-center">
            <User className="size-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        {/* No menu items - billing removed */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
