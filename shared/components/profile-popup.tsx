"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "./libs";
import { useUserStore } from "@/store/userStore";
import { RegisterForm } from "./forms/register-form";

interface Props {
  className?: string;
  onClose?: () => void;
}

export const ProfilePopup: React.FC<Props> = ({ className, onClose }) => {
  const fullname = useUserStore((state) => state.fullname);
  const logout = useUserStore((state) => state.logout);
  const [showRegister, setShowRegister] = useState(false);

  
  return (
    <>
      <div
        className={cn(
          "absolute top-full mt-2 right-0 w-64 bg-white shadow-lg rounded-xl p-4 z-50 max-sm:bottom-60 max-sm:left-0 max-sm:w-20",
          className
        )}
      >
        {fullname ? (
          <>
            <h2 className="text-lg font-semibold mb-2">{fullname}</h2>
            <span>Избраное</span>
            <button
              className="mt-4 w-full py-2 bg-black text-white rounded-md text-sm"
              onClick={logout}
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2">Профиль</h2>
            <p className="text-sm text-gray-600">Вы вошли как гость</p>
            <button
              className="mt-4 w-full py-2 bg-black text-white rounded-md text-sm"
              onClick={() => setShowRegister(true)}
            >
              Зарегистрироваться
            </button>
          </>
        )}
      </div>

      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
    </>
  );
};
