import { getDateString } from "../util/functions";

export const itemDetailFieldsByItemType = {
  companies: [
    { columnName: "notes", type: "value" },
    { columnName: "jobs", type: "list" }
  ],
  jobs: [
    { columnName: "po_num", displayName: "PO #", type: "value" },
    { columnName: "job_orders", type: "list" }
  ],
  job_orders: [
    { columnName: "notes", type: "value" },
    { columnName: "date_ordered", type: "value" },
    { columnName: "installations", type: "list" }
  ]
};

export const newItemNameByItemType = {
  companies: "Company",
  jobs: "Job",
  job_orders: "Job Orders"
};

export const newItemFormFieldsByItemType = {
  companies: [
    { columnName: "name" },
    {
      columnName: "status",
      type: "radio",
      valueOptions: [{ value: "prospect" }, { value: "client" }]
    },
    { columnName: "notes" }
  ],
  jobs: [{ columnName: "name" }, { columnName: "po_num", displayName: "PO #" }]
};

export const getItemNameFuncByItemType = {
  companies: item => item.name,
  jobs: item => item.name,
  job_orders: ({ date_ordered }) =>
    date_ordered ? `Job order ordered on ${getDateString(date_ordered)}` : ""
};
