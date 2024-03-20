const rules = {
  Admin: {
    static: [
      "user-management:visit",
      "user:create",
      "user:create:add-tenant-info",
      "user:edit",
      "user:delete",
      "users:upload",
      "users:visit",
      "farmers:visit",
      "farmer:create",
      "farmer:edit",
      "farmers:upload",
      "farmers:bulk-edit",
      "farmers:export:download-kyf",
      "farmers:export:download-coordinates",
      "roles:visit",
      // "sourcing-agents:visit",

      "dashboard:visit",
      "dashboard:activities:visit",
      "dashboard:analysis:visit",
      // "configuration:visit",
      "configuration:crop-profile:visit",
      "configuration:calendar:visit",
      "configuration:seasons:visit",

      "farm-management:visit",
      "farm-management:cluster:create",
      "farm-management:cluster:edit",
      "farm-management:sub-cluster:create",
      "farm-management:sub-cluster:edit",

      "farm-management:tenants:visit",

      // "input:visit",

      // "communication:visit",

      // "collection:visit",

      // "payment:visit",

      "dashboard-capture:visit",
      "overview:visit",
      "gps:visit",
      "polygons:visit",
      // "farm-review:visit",
      // "farm-review:pending:visit",
      // "farm-review:submitted:visit"
    ],
    landing: '/dashboard'
  },
  "Dvalco Admin": {
    static: [
      "dashboard:visit",
      "dashboard-capture:visit",
      "overview:visit",
      "gps:visit",
      "polygons:visit",
      "user-management:visit",
      "user:create",
      "user:create:add-tenant-info",
      "user:edit",
      "user:delete",
      "users:upload",
      "users:visit",
      "farmers:visit",
      "farmer:create",
      "farmer:edit",
      "farmers:upload",
      "farmers:bulk-edit",
      "farmers:export:download-kyf",
      "farmers:export:download-coordinates",

      "farm-management:visit",
      "farm-management:cluster:create",
      "farm-management:cluster:edit",
      "farm-management:sub-cluster:create",
      "farm-management:sub-cluster:edit",

      "farm-management:tenants:visit",

      "dashboard-capture:visit",
      "overview:visit",
      "gps:visit",
      "polygons:visit",
      "farm-review:visit",
      "farm-review:pending:visit",
      "farm-review:submitted:visit"
    ],
    landing: '/dashboard-capture/overview'
  },
  Aggregator: {
    static: [
      "dashboard:visit",
      "dashboard:activities:visit",
      "dashboard:analysis:visit",

      // "dashboard-capture:visit",
      // "overview:visit",
      // "gps:visit",
      // "polygons:visit",

      "user-management:visit",
      "user:create",
      "user:edit",
      "user:delete",
      "users:upload",
      "users:visit",
      "farmers:visit",
      "farmer:create",
      "farmer:edit",
      "farmers:upload",
      "farmers:bulk-edit",
      "farmers:export:download-kyf",
      "farmers:export:download-coordinates",
      "sourcing-agents:visit",

      "configuration:visit",
      "configuration:crop-profile:visit",
      "configuration:calendar:visit",
      "configuration:seasons:visit",

      "farm-management:visit",
      "farm-management:farm:visit",
      "farm-management:farm:create",
      "farm-management:farm:bulk-assign",
      "farm-management:cluster:create",
      "farm-management:cluster:edit",
      "farm-management:sub-cluster:create",
      "farm-management:sub-cluster:edit",

      // "farm-cluster-management:visit",

      "input:visit",

      "communication:visit",

      "collection:visit",

      "payment:visit",
      "payment:disbursement:visit",
    ],
    landing: '/dashboard'
  },
  "Project Manager": {
    static: [
      "dashboard:visit",
      "dashboard:activities:visit",
      "dashboard:analysis:visit",

      "user-management:visit",
      "users:visit",
      "farmers:visit",

      "farm-management:visit",
      "farm-management:farm:visit",

      "input:visit",
      "payment:disbursement:visit",
    ],
    dynamic: {},
    landing: '/dashboard'
  },
  Agent: {
    static: ["dashboard:visit", "payment:disbursement:visit"],
    landing: '/dashboard'
  },
  "Service Provider": {
    static: ["dashboard:visit", "communication:visit"],
    landing: '/dashboard'
  },
};

export default rules;
