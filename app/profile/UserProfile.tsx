"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import SideBarUser from "@/app/components/profile/side.bar.user";
import { useAuth } from "@/app/context/auth.context";

const ComponentSkeleton = () => {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
      <div className="h-[400px] w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800"></div>
    </div>
  );
};

const InfoUser = dynamic(() => import("@/app/components/profile/info.user"), {
  loading: () => <ComponentSkeleton />,
});
const PurchasedBook = dynamic(
  () => import("@/app/components/profile/purchased.book"),
  { loading: () => <ComponentSkeleton /> },
);
const WhiteLists = dynamic(
  () => import("@/app/components/profile/white.lists"),
  { loading: () => <ComponentSkeleton /> },
);
const SupportTicket = dynamic(
  () => import("@/app/components/profile/support.ticket"),
  { loading: () => <ComponentSkeleton /> },
);
const OrderHistory = dynamic(
  () => import("@/app/components/profile/order.history"),
  { loading: () => <ComponentSkeleton /> },
);

const UserProfile = () => {
  const [active, setActive] = useState<number>(0);
  const [renderedComponents, setRenderedComponents] = useState<Set<number>>(
    new Set([0]),
  );
  const { user } = useAuth();

  const renderComponent = useMemo(() => {
    const components: { [key: number]: JSX.Element } = {};
    if (renderedComponents.has(0)) components[0] = <InfoUser />;
    if (renderedComponents.has(1)) components[1] = <PurchasedBook />;
    if (renderedComponents.has(2)) components[2] = <WhiteLists />;
    if (renderedComponents.has(3)) components[3] = <SupportTicket />;
    if (renderedComponents.has(4))
      components[4] = <OrderHistory userInfo={user} />;
    return components;
  }, [renderedComponents, user]);

  const handleTabChange = (tabIndex: number) => {
    setActive(tabIndex);
    if (!renderedComponents.has(tabIndex)) {
      setRenderedComponents((prev) => new Set([...Array.from(prev), tabIndex]));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0A0A0A] pt-24 pb-12 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 shrink-0">
            <SideBarUser active={active} setActive={handleTabChange} />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {Object.entries(renderComponent).map(([index, component]) => (
              <div
                key={index}
                style={{
                  display: active === parseInt(index) ? "block" : "none",
                }}>
                {component}
              </div>
            ))}
            {!renderedComponents.has(active) && <ComponentSkeleton />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
