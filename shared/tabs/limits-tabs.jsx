import PageTabs from "@/features/page-tabs";
import { ROUTES } from "@/routes";

export default function LimitsTabs({ defaultTab }) {
  return (
    <PageTabs
      className="mt-5 mb-8"
      isBreadcrumb={false}
      defaultActiveTab={defaultTab}
      tabs={[
        {
          key: "mcc",
          name: "MCC",
          href: ROUTES.limits.index,
        },
        {
          key: "merchant",
          name: "Merchant",
          href: ROUTES.limits.merchant,
        },
        {
          key: "customer",
          name: "Customer",
          href: ROUTES.limits.customer,
        },
        {
          key: "bins",
          name: "BINs",
          href: ROUTES.limits.bins,
        },
        {
          key: "bin-group",
          name: "BIN Group",
          href: ROUTES.limits.binGroup,
        },
      ]}
    />
  );
}
