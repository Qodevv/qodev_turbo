import { ButtonsValues, Labels } from "@repo/utils/context";
import React from "react";
import { LoginForm } from "./LoginForm";
import { LoginForm as LoginFormType } from "@repo/utils/validations";
import { Qodev } from "@/components/qodev";

export const LoginBlock: React.FC = () => {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
      className="rounded-sm h-screen border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div className="flex h-screen flex-wrap items-center">
        <div className="hidden w-full h-screen xl:block xl:w-1/2">
          <div className="py-2 px-26 text-center">
            {/* logo qodev */}
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              QODEV
            </h2>
            <p className="2xl:px-20">Empowering Freelancers</p>
            <Qodev />
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Welcome</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Login to QODEV Platform
            </h2>
            <LoginForm onSubmit={() => {}} submitLoading />
          </div>
        </div>
      </div>
    </div>
  );
};
