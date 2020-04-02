import Resource from "./resource";

class ClientCompanyResource extends Resource {
  getByQuery(queryParams, subset, route) {
    if (!route) queryParams.status = "client";
    return super.getByQuery(queryParams, subset, route);
  }
}

const ClientCompany = new ClientCompanyResource("companies", "clients");
export default ClientCompany;
