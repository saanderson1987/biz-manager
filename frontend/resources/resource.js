import axios from "axios";
import merge from "lodash.merge";

class Resource {
  constructor(baseRouteName, name) {
    // this.all = this.all.bind(this);
    this.getByQuery = this.getByQuery.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.reducer = this.reducer.bind(this);
    this.name = name ? name : baseRouteName;
    this.baseRoute = `/api/${baseRouteName}`;
    this.actions = {
      [`${this.name.toUpperCase()}_GET_MANY`]: (oldState, newData) => {
        return merge({}, oldState, newData);
      },
      [`${this.name.toUpperCase()}_GET_ONE`]: (oldState, newData) => {
        return merge({}, oldState, { [newData.id]: newData });
      },
      [`${this.name.toUpperCase()}_DELETE_ONE`]: (oldState, newData) => {
        let newState = merge({}, oldState);
        delete newState[newData.id];
        return newState;
      }
    };
  }

  all() {
    return this.send(
      axios.get(this.baseRoute),
      `${this.name.toUpperCase()}_GET_MANY`
    );
  }

  getByQuery(queryParams, subset, route) {
    const actionName = subset
      ? this.createAction(subset, "GET_MANY")
      : `${this.name.toUpperCase()}_GET_MANY`;
    route = route ? `/api/${route}` : this.baseRoute;
    return this.send(
      axios.get(route, {
        params: queryParams
      }),
      actionName
    );
  }

  createAction(subset, type) {
    const actionName = `${this.name.toUpperCase()}_${subset[
      subset.length - 1
    ].toUpperCase()}_${type}`;
    const newObject = {};
    switch (type) {
      case "GET_MANY":
        this.actions[actionName] = (oldState, newData) => {
          setValue(newObject, subset, newData);
          return merge({}, oldState, newObject);
        };
        break;
      case "GET_ONE":
        this.actions[actionName] = (oldState, newData) => {
          subset.push(newData.id);
          setValue(newObject, subset, newData);
          return merge({}, oldState, newObject);
        };
        break;
    }

    function setValue(object, path, value) {
      let last = object;
      path.forEach((pathName, idx) => {
        if (idx === path.length - 1) last[pathName] = value;
        else last[pathName] = {};
        last = last[pathName];
      });
    }

    return actionName;
  }

  getById(id, subset, route) {
    const actionName = subset
      ? this.createAction(subset, "GET_ONE")
      : `${this.name.toUpperCase()}_GET_ONE`;
    route = route ? `/api/${route}/${id}` : `${this.baseRoute}/${id}`;
    return this.send(axios.get(route), actionName);
  }

  create(record, subset, route) {
    const actionName = subset
      ? this.createAction(subset, "GET_ONE")
      : `${this.name.toUpperCase()}_GET_ONE`;
    route = route ? `/api/${route}` : this.baseRoute;
    return this.send(axios.post(route, record), actionName);
  }

  update(record, subset, route) {
    const actionName = subset
      ? this.createAction(subset, "GET_ONE")
      : `${this.name.toUpperCase()}_GET_ONE`;
    route = route
      ? `/api/${route}/${record.id}`
      : `${this.baseRoute}/${record.id}`;
    return this.send(axios.put(route, record), actionName);
  }

  delete(id, subset, route) {
    const actionName = subset
      ? this.createAction(subset, "DELETE_ONE")
      : `${this.name.toUpperCase()}_DELETE_ONE`;
    return this.send(
      axios.delete(`${this.baseRoute}/${id}`),
      `${this.name.toUpperCase()}_DELETE_ONE`
    );
  }

  send(apiCall, type) {
    return function(dispatch) {
      return apiCall
        .then(response =>
          dispatch({
            type,
            data: response.data
          })
        )
        .catch(error => {
          throw error.response;
        });
    };
  }

  reducer(oldState = {}, action) {
    if (!this.actions[action.type]) return oldState;
    return this.actions[action.type](oldState, action.data);
  }
}

export default Resource;
