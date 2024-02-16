import { EvaIcon } from "@/components/EvaIcon";
import { useCmsElementsContext } from "@repo/utils/context";
import React from "react";

interface Props {
  services: Array<{ name: string; description: string; icon: any }>;
}

export const FeatureSection: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  services = [],
}) => {
  const { labelByKey } = useCmsElementsContext();

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h1 className="text-base font-semibold leading-7 text-black-600">
                {labelByKey("services_project_priority")}
              </h1>
              <p className="mt-2 text-3xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
                {labelByKey("services_title")}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {labelByKey("services_description")}
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {services.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <EvaIcon
                        name={feature.icon}
                        className="absolute top-1 left-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
