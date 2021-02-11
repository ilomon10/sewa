import { createContext } from "react";
import feathers from "@feathersjs/feathers";
import feathersAuth from "@feathersjs/authentication-client";
import feathersSocket from "@feathersjs/socketio-client";
import io from "socket.io-client";

export const server = {
  hostname: process.env.REACT_APP_SERVER_HOSTNAME,
  port: process.env.PORT || process.env.REACT_APP_SERVER_PORT
}

class Feathers {
  constructor() {
    let host = new URL(window.location.origin);
    host.hostname = server.hostname || window.location.hostname;
    host.port = server.port || window.location.port;
    const socket = io(host.toString());

    this.client = feathers();
    this.client.configure(feathersSocket(socket));
    this.client.configure(feathersAuth({
      storageKey: "accessToken"
    }))
  }

  doAuthenticate(authentication, params) {
    return this.client.authenticate(authentication, params);
  }
  doLogout() {
    return this.client.logout();
  }
  doReAuthenticate(force) {
    return this.client.reAuthenticate(force);
  }
  doGet(name) {
    return this.client.get(name);
  }

  get gigs() { return this.client.service('gigs'); }
  get categories() { return this.client.service('categories'); }
  get tags() { return this.client.service('tags'); }
  get users() { return this.client.service('users'); }

}

export const FeathersContext = createContext(null);

export const FeathersProvider = ({ children }) => {
  return (
    <FeathersContext.Provider value={new Feathers()}>
      {children}
    </FeathersContext.Provider>
  )
}