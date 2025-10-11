"use client";

import { Popup } from "@/components/ui/Popup";
import { UserForm } from "@/components/users/UserForm";
import { UsersTable } from "@/components/users/UsersTable";
import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/hooks/popup";
import { getUsersByStore } from "@/lib/actions/user";

import { User } from "@/types/types";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Settings() {
  const { isAdmin } = useAuth();

  if (!isAdmin) redirect("/");

  const { data: session } = useSession();

  const [users, setUsers] = useState<User[]>([]);
  const [refresh, setRefresh] = useState(0);

  const { isPopupVisible, popupMessage, popupType, notifyPopup } = usePopup();

  useEffect(() => {
    async function getUsers() {
      const res = await getUsersByStore(session?.user.storeId!);

      const formattedUser: User[] = res.map((user) => ({
        id: user.id,
        name: user.name!,
        email: user.email!,
        role: user.role,
      }));

      setUsers(formattedUser);
    }

    getUsers();
  }, [refresh]);

  return (
    <div className="space-y-4 h-full">
      <h2 className="text-2xl font-bold">Usuários</h2>
      <UserForm setRefresh={setRefresh} onPopup={notifyPopup} />

      {users.length > 0 && (
        <UsersTable
          users={users}
          setRefresh={setRefresh}
          onPopup={notifyPopup}
        />
      )}

      <Popup
        isPopupVisible={isPopupVisible}
        type={popupType}
        message={popupMessage}
      />
    </div>
  );
}
