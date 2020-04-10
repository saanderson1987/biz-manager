import { getDateString } from "../util/functions";

export const parentColumnByItemType = {
  jobs: "company_id",
  job_orders: "job_id",
  installations: "job_order_id",
  vendor_orders: "job_order_id",
};

const createParentIdQuery = (type, parentId) => {
  const parentColumn = parentColumnByItemType[type];
  return parentColumn && parentId ? { [parentColumn]: parentId } : {};
};

export const apiRouteByItemType = {
  companies: "companies",
  clients: "companies",
  prospects: "companies",
  jobs: "jobs",
  job_orders: "job_orders",
  installations: "installations",
  vendor_orders: "vendor_orders",
  vendors: "companies",
};

export const queryParamsByItemType = {
  companies: {
    columns: "name",
  },
  clients: {
    columns: "name",
    status: "client",
  },
  prospects: {
    columns: "name",
    status: "prospect",
  },
  jobs: { columns: "name" },
  job_orders: { columns: "date_ordered" },
  installations: { columns: "installation_date" },
  vendor_orders: { columns: "name,date_ordered" },
  vendors: { columns: "name", status: "vendor" },
};

export const createListGetByQueryOptions = (type, parentId, statePath) => {
  return {
    route: apiRouteByItemType[type],
    queryParams: {
      ...queryParamsByItemType[type],
      ...createParentIdQuery(type, parentId),
    },
    statePath,
  };
};

export const listNameByItemType = {
  companies: "Companies",
  clients: "Clients",
  prospects: "Prospects",
  jobs: "Jobs",
  job_orders: "Job Orders",
  installations: "Installations",
  vendor_orders: "Vendor Orders",
  vendors: "Vendors",
};

export const getItemNameFuncByItemType = {
  companies: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  clients: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  prospects: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  jobs: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  job_orders: ({ date_ordered }) => ({
    itemName:
      date_ordered && `Job order ordered on ${getDateString(date_ordered)}`,
  }),
  installations: ({ installation_date }) => ({
    itemName:
      installation_date &&
      `Installation set for ${getDateString(installation_date)}`,
  }),
  vendor_orders: ({ name: vendorName, date_ordered }) => {
    let itemName;
    if (vendorName) {
      itemName = `${vendorName} ordered`;
      if (date_ordered) {
        itemName += ` on ${getDateString(date_ordered)}`;
      }
    }
    return { itemName };
  },
  vendors: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
};

export const itemDetailFieldsByItemType = {
  clients: [
    { columnName: "notes", type: "text" },
    {
      columnName: "status",
      type: "radio",
      valueOptions: [{ value: "prospect" }, { value: "client" }],
    },
    { columnName: "jobs", type: "list" },
  ],
  prospects: [
    { columnName: "notes", type: "text" },
    {
      columnName: "status",
      type: "radio",
      valueOptions: [{ value: "prospect" }, { value: "client" }],
    },
    { columnName: "jobs", type: "list" },
  ],
  jobs: [
    { columnName: "po_num", displayName: "PO #", type: "text" },
    { columnName: "job_orders", type: "list" },
  ],
  job_orders: [
    { columnName: "notes", type: "text" },
    { columnName: "date_ordered", displayName: "Date Ordered", type: "date" },
    { columnName: "vendor_orders", type: "list" },
    { columnName: "installations", type: "list" },
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
  clients: "Company",
  prospects: "Company",
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
  clients: [
    { columnName: "name" },
    {
      columnName: "status",
      type: "radio",
      valueOptions: [{ value: "prospect" }, { value: "client" }],
    },
    { columnName: "notes" },
  ],
  prospects: [
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
    },
    { columnName: "po_num", displayName: "PO Number" },
    { columnName: "date_ordered", displayName: "Date Ordered", type: "date" },
    { columnName: "number_of_pieces", displayName: "Number of Pieces" },
    { columnName: "price" },
    { columnName: "notes" },
  ],
  vendors: [{ columnName: "name" }, { columnName: "notes" }],
};
