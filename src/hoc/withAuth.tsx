import { Component } from "react";
import isAuthenticated from "@/utils/isAuthenticated";

export const withAuth = (App: any) => {
  return class wrapAuthComponent extends Component {
    constructor(props: any) {
      super(props);
    }

    static async getInitialProps(ctx: any) {
      const authenticatedUser = await isAuthenticated(ctx);

      if (
        authenticatedUser &&
        authenticatedUser.isAuthenticated === false &&
        ctx.req
      ) {
        ctx.res.writeHead(307, {
          Location: "/login",
        });
        ctx.res.end();
        return;
      }

      return {
        auth: {
          ...authenticatedUser,
        },
      };
    }

    render() {
      return <App {...this.props} />;
    }
  };
};
