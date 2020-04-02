import Resource from "./resource";

class ProspectCompanyResource extends Resource {
  getByQuery(queryParams, subset, route) {
    if (!route) queryParams.status = "prospect";
    return super.getByQuery(queryParams, subset, route);
  }
}

const ProspectCompany = new ProspectCompanyResource("companies", "prospects");
export default ProspectCompany;
