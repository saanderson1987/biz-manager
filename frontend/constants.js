import { getDateString } from "../util/functions";

export const parentColumnByItemType = {
  contacts: "company_id",
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
  contacts: "contacts",
  jobs: "jobs",
  job_orders: "job_orders",
  installations: "installations",
  vendor_orders: "vendor_orders",
  vendors: "companies",
  notes: "notes",
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
  contacts: { columns: "name" },
  jobs: { columns: "name" },
  job_orders: { columns: "date_ordered" },
  installations: { columns: "installation_date" },
  vendor_orders: { columns: "name,date_ordered" },
  vendors: { columns: "name", status: "vendor" },
  notes: { columns: "contents,updated_at" },
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

const itemDetailsGetByIdQueryParams = {
  contacts: {
    columns: "name,phone_num,email,position",
  },
  jobs: {
    columns:
      "name,po_num,status,budget_sent_date,image_proposal_sent_date,art_plan_sent_date,receivable_status",
  },
  notes: { columns: "contents,author_name,updated_at" },
};

export const createItemDetailsGetByIdQueryOptions = (type, id, statePath) => {
  return {
    route: apiRouteByItemType[type],
    id,
    queryParams: itemDetailsGetByIdQueryParams[type] || {},
    statePath,
  };
};

export const listNameByItemType = {
  companies: "Companies",
  clients: "Clients",
  prospects: "Prospects",
  contacts: "Contacts",
  jobs: "Jobs",
  job_orders: "Job Orders",
  installations: "Installations",
  vendor_orders: "Vendor Orders",
  vendors: "Vendors",
  notes: "Notes",
};

const defaultSortFieldByItemType = {
  job_orders: "date_ordered",
  installations: "installation_date",
  notes: "updated_at",
};

export const getDefaultListSortFuncByItemType = (type) => {
  const sortField = defaultSortFieldByItemType[type] || "name";
  return (a, b) => {
    if (a[sortField] < b[sortField]) {
      return -1;
    }
    if (a[sortField] > b[sortField]) {
      return 1;
    }
    return 0;
  };
};

export const getItemNameFuncByItemType = {
  companies: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  clients: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  prospects: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
  contacts: (item) => ({ itemName: item.name, itemNameColumnName: "name" }),
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
  notes: (item) => ({
    itemName:
      item.contents && item.contents.length > 44
        ? `${item.contents.slice(0, 44)}... (see more)`
        : item.contents,
  }),
};

const jobStatusDisplayNameByType = {
  in_progress: "In Progress",
  on_hold: "On Hold",
  completed: "Completed",
};

export const itemDetailFieldsByItemType = {
  clients: [
    { columnName: "notes", type: "text" },
    {
      columnName: "status",
      type: "radio",
      valueOptions: [{ value: "prospect" }, { value: "client" }],
    },
    { columnName: "contacts", type: "list" },
    { columnName: "jobs", type: "list" },
  ],
  prospects: [
    { columnName: "notes", type: "text" },
    {
      columnName: "status",
      type: "radio",
      valueOptions: [{ value: "prospect" }, { value: "client" }],
    },
    { columnName: "contacts", type: "list" },
    { columnName: "jobs", type: "list" },
  ],
  contacts: [
    { columnName: "name", type: "text" },
    { columnName: "phone_num", displayName: "Phone Number", type: "text" },
    { columnName: "email", type: "text" },
    { columnName: "position", type: "text" },
  ],
  jobs: [
    { columnName: "po_num", displayName: "PO #", type: "text" },
    {
      columnName: "status",
      type: "dropdown",
      getDisplayValue: (value) => jobStatusDisplayNameByType[value],
      valueOptions: [
        {
          value: "in_progress",
          displayName: jobStatusDisplayNameByType.in_progress,
        },
        { value: "on_hold", displayName: jobStatusDisplayNameByType.on_hold },
        {
          value: "completed",
          displayName: jobStatusDisplayNameByType.completed,
        },
      ],
    },
    {
      columnName: "receivable_status",
      displayName: "Receivable Status",
      type: "dropdown",
      valueOptions: [
        { value: null, displayName: "" },
        {
          value: "PO sent",
        },
        { value: "50% paid" },
        {
          value: "100% paid",
        },
      ],
    },
    {
      columnName: "budget_sent_date",
      displayName: "Budget Sent Date",
      type: "date",
    },
    {
      columnName: "image_proposal_sent_date",
      displayName: "Image Proposal Sent Date",
      type: "date",
    },
    {
      columnName: "art_plan_sent_date",
      displayName: "Art Plan Sent Date",
      type: "date",
    },
    { columnName: "job_orders", type: "list" },
    { columnName: "notes", type: "list" },
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
    { columnName: "po_num", displayName: "Invoice / PO #", type: "text" },
    { columnName: "tracking_num", displayName: "Tracking #", type: "text" },
    { columnName: "date_ordered", type: "date" },
    {
      columnName: "number_of_pieces",
      displayName: "Number of Pieces",
      type: "text",
    },
    { columnName: "completed", type: "checkbox" },
    { columnName: "notes", type: "text" },
  ],
  notes: [
    {
      columnName: "author_name",
      displayName: "Author",
      type: "text",
      readOnly: true,
    },
    {
      columnName: "updated_at",
      displayName: "Last Updated",
      type: "date",
      readOnly: true,
    },
    { columnName: "contents", type: "text" },
  ],
};

export const itemNameByItemType = {
  companies: "Company",
  clients: "Company",
  prospects: "Company",
  contact: "Contact",
  jobs: "Job",
  job_orders: "Job Order",
  installations: "Installation",
  vendor_orders: "Vendor Order",
  vendors: "Vendor",
  notes: "Note",
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
  contacts: [
    { columnName: "name" },
    { columnName: "phone_num", displayName: "Phone Number" },
    { columnName: "email" },
    { columnName: "position" },
  ],
  jobs: [
    { columnName: "name" },
    { columnName: "po_num", displayName: "PO #" },
    {
      columnName: "receivable_status",
      type: "dropdown",
      valueOptions: [
        {
          value: "PO sent",
        },
        { value: "50% paid" },
        {
          value: "100% paid",
        },
      ],
    },
  ],
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
    { columnName: "po_num", displayName: "Invoice/ PO #" },
    { columnName: "tracking_num", displayName: "Tracking #" },
    { columnName: "date_ordered", displayName: "Date Ordered", type: "date" },
    { columnName: "number_of_pieces", displayName: "Number of Pieces" },
    { columnName: "completed", type: "checkbox" },
    { columnName: "notes" },
  ],
  vendors: [{ columnName: "name" }, { columnName: "notes" }],
  note: [{ columnName: "contents" }],
};

export const newItemRecordBaseByItemType = {
  jobs: {
    status: "in_progress",
  },
  vendors: {
    status: "vendor",
  },
};
