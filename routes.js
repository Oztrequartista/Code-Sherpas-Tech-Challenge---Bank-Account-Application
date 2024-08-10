export const ROUTES = {
  limits: {
    index: "/limits",
    mcc: "/limits",
    merchant: "/limits/merchant",
    customer: "/limits/customer",
    bins: "/limits/bins",
    binGroup: "/limits/bin-group",
    new: "/limits/new",
    edit: "/limits/edit",
    exclusions: {
      index: "/limits/exclusions",
      new: "/limits/exclusions/new",
    },
  },
  userAdministration: {
    index: "/user-administration",
    roles: "/user-administration/roles",
  },
  forex: {
    index: "/forex",
    overrides: "/forex/overrides",
    overridesMCC: "/forex/overrides/mcc",
    overridesMerchantNewOverrides: "/forex/overrides/merchant/new-overrides",
    overridesMCCNewOverrides: "/forex/overrides/mcc/new-overrides",
  },
  auditTrail: {
    index: "/audit-trail",
    eventDetails: "/audit-trail/event-details",
  },
  bin: {
    index: "/bin",
    binGroup: "/bin/bin-group",
    createBINGroup: "/bin/create-bin-group",
    createBIN: "/bin/create-bin",
  },
  customerAccounts: {
    index: "/customer-accounts",
    customerDetails: "/customer-accounts/customer-details",
  },
  auth: {
    login: "/login",
  },
};

export const API_ROUTES = {
  forex: {
    config: "forex/config",
    sources: "forex/sources",
    currencyPair: "forex/currency-pair",
    merchantOverride: "forex/merchant-overrides",
    mccOverride: "forex/mcc-overrides",
    currencies: {
      index: "forex/currencies",
      effectiveRates: "forex/effective-rate",
    },
  },
  pos: {
    index: "pos",
    entries: "pos-entries",
    conditions: {
      index: "pos-conditions",
    },
  },
  limits: {
    index: "fps-rules",
    limitRuleTypes: "fps-rule-types",
    limitRuleActions: "fps-rule-actions",
    exclusions: "fps-rule-types-exclusion",
  },
  merchants: {
    index: "merchants",
    createForexConfig: "forex/config",
    createMerchantOverride: "forex/merchant-overrides",
    createMCCOverride: "forex/mcc-overrides",
  },
  mcc: {
    index: "merchant-categories",
  },
  mcc: {
    index: "merchant-categories",
  },
};
