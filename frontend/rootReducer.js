import { combineReducers } from "redux";
import Session from "./resources/session";
import Company from "./resources/company";
import ProspectCompany from "./resources/prospect_company";
import ClientCompany from "./resources/client_company";
import VendorCompany from "./resources/vendor_company";
import Job from "./resources/job";
import JobOrder from "./resources/job_order";
import Installation from "./resources/installation";

export default combineReducers({
  session: Session.reducer,
  companies: Company.reducer,
  prospects: ProspectCompany.reducer,
  vendors: VendorCompany.reducer,
  clients: ClientCompany.reducer,
  jobs: Job.reducer,
  job_orders: JobOrder.reducer,
  installations: Installation.reducer
});
