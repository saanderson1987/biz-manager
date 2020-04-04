import { getDateString } from "../util/functions";
import VendorCompanyResource from "./resources/vendor_company";

export const listNameByItemType = {
  companies: "Companies",
  jobs: "Jobs",
  job_orders: "Job Orders",
  installations: "Installations",
  vendor_orders: "Vendor Orders",
  vendors: "Vendors",
};

export const parentColumnByItemType = {
  jobs: "company_id",
  job_orders: "job_id",
  installations: "job_order_id",
  vendor_orders: "job_order_id",
};

export const listQueryColumnNamesByItemType = {
  companies: "name",
  jobs: "name",
  job_orders: "date_ordered",
  installations: "installation_date",
  vendor_orders: "name,date_ordered",
  vendors: "name",
};

export const getItemNameFuncByItemType = {
  companies: (item) => item.name,
  jobs: (item) => item.name,
  job_orders: ({ date_ordered }) =>
    date_ordered && `Job order ordered on ${getDateString(date_ordered)}`,
  installations: ({ installation_date }) =>
    installation_date &&
    `Installation set for ${getDateString(installation_date)}`,
  vendor_orders: ({ name: vendorName, date_ordered }) => {
    if (vendorName) {
      let itemName = `${vendorName} ordered`;
      if (date_ordered) {
        itemName += ` on ${getDateString(date_ordered)}`;
      }
      return itemName;
    }
  },
  vendors: (item) => item.name,
};

export const itemDetailFieldsByItemType = {
  companies: [
    { columnName: "notes", type: "text" },
    { columnName: "jobs", type: "list" },
  ],
  jobs: [
    { columnName: "po_num", displayName: "PO #", type: "text" },
    { columnName: "job_orders", type: "list" },
  ],
  job_orders: [
    { columnName: "notes", type: "text" },
    { columnName: "date_ordered", displayName: "Date Ordered", type: "date" },
    { columnName: "installations", type: "list" },
    { columnName: "vendor_orders", type: "list" },
  ],
  installations: [
    {
      columnName: "installation_date",
      displayName: "Install Date",
      type: "date",
    },
    { columnName: "completed", type: "checkbox" },
  ],
  vendor_orders: [
    { columnName: "po_num", displayName: "PO Number", type: "text" },
    { columnName: "date_ordered", type: "date" },
    {
      columnName: "number_of_pieces",
      displayName: "Number of Pieces",
      type: "text",
    },
    {
      columnName: "price",
      type: "text",
    },
    { columnName: "notes", type: "text" },
  ],
};

export const itemNameByItemType = {
  companies: "Company",
  jobs: "Job",
  job_orders: "Job Order",
  installations: "Installation",
  vendor_orders: "Vendor Orders",
  vendors: "Vendor",
};

export const newItemFormFieldsByItemType = {
  companies: [
    { columnName: "name" },
    {
      columnName: "status",
      type: "radio",
      valueOptions: [{ value: "prospect" }, { value: "client" }],
    },
    { columnName: "notes" },
  ],
  jobs: [{ columnName: "name" }, { columnName: "po_num", displayName: "PO #" }],
  job_orders: [
    { columnName: "date_ordered", displayName: "Date Ordered", type: "date" },
    { columnName: "notes" },
  ],
  installations: [
    {
      columnName: "installation_date",
      displayName: "Install Date",
      type: "date",
    },
    { columnName: "completed", type: "checkbox" },
  ],
  vendor_orders: [
    {
      columnName: "vendor_id",
      displayName: "Vendor Name",
      type: "dropdown",
      dropdownType: "vendors",
      resource: VendorCompanyResource,
    },
    { columnName: "po_num", displayName: "PO Number" },
    { columnName: "date_ordered", displayName: "Date Ordered", type: "date" },
    { columnName: "number_of_pieces", displayName: "Number of Pieces" },
    { columnName: "price" },
    { columnName: "notes" },
  ],
  vendors: [{ columnName: "name" }, { columnName: "notes" }],
};
