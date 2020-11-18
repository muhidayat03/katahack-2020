import axios from "axios";

export default axios.create({
  // baseURL: "http://api.paboi.bigio.id/v1/auth",
  baseURL: "http://api.tokosahabatbunda.com/api",
  proxy: {
    host: 'localhost',
    port: 3000,
    protocol: 'http'
  },

});

