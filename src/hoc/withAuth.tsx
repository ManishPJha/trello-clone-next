import { Component } from "react";
import isAuthenticated from "@/utils/isAuthenticated";
import { UpdateUserStates } from "@/src/slices/user";

export const withAuth = (App: any) => {
  return class wrapAuthComponent extends Component {
    constructor(props: any) {
      super(props);
    }

    static async getInitialProps(ctx: any) {
      const authenticatedUser = await isAuthenticated(ctx);

      // const { dispatch, getState } = setOrGetStore();
      const { dispatch, getState } = ctx.store;

      if (authenticatedUser?.isAuthenticated === false) {
        ctx.res.writeHead(307, {
          Location: "/login",
        });
        ctx.res.end();
        return;
      }

      dispatch(UpdateUserStates(authenticatedUser));

      console.log(`---------------props-start------------`);
      console.log(getState());
      console.log(`---------------props-end------------`);

      // return {
      //   reduxState: ctx.store.getState(),
      // };

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
