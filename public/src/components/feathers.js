import { createContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import feathers from "@feathersjs/feathers";
import feathersRest from "@feathersjs/rest-client";
import feathersAuth from "@feathersjs/authentication-client";
import feathersSocket from "@feathersjs/socketio-client";

export const server = {
  hostname: process.env.REACT_APP_SERVER_HOSTNAME,
  port: process.env.PORT || process.env.REACT_APP_SERVER_PORT
}

class Feathers {
  constructor() {
    let host = this.host = new URL(window.location.origin);
    host.hostname = server.hostname || window.location.hostname;
    host.port = server.port || window.location.port;
    const socket = io(host.toString());
    const restClient = feathersRest(host.origin);

    this.socket = feathers();
    this.socket.configure(feathersSocket(socket));
    this.socket.configure(feathersAuth({
      storageKey: "accessToken"
    }));

    this.rest = feathers();
    this.rest.configure(restClient.axios(axios, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    }));
    this.rest.configure(feathersAuth({
      storageKey: "accessToken"
    }));

    this.account = null;
  }

  doAuthenticate(authentication, params) {
    return this.socket.authenticate(authentication, params);
  }
  doLogout() {
    return this.socket.logout();
  }
  async doReAuthenticate(force) {
    const account = await this.socket.reAuthenticate(force);
    this.account = account.user;
    const avatar = await this.media.get(this.account.avatarId, {
      query: { $select: ["id", "path"] }
    });
    if (avatar) this.account.avatar = avatar;
    console.log(this.account);
    return account;
  }
  doGet(name) {
    return this.socket.get(name);
  }

  get gigs() { return this.socket.service('gigs'); }
  get categories() { return this.socket.service('categories'); }
  get tags() { return this.socket.service('tags'); }
  get users() { return this.socket.service('users'); }
  get media() { return this.rest.service('media') }

  get gigsMedia() { return this.socket.service('gigs-media') }

}

export const FeathersContext = createContext(null);

export const FeathersProvider = ({ children }) => {
  return (
    <FeathersContext.Provider value={new Feathers()}>
      {children}
    </FeathersContext.Provider>
  )
}