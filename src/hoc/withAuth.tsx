import { Component } from "react";
import isAuthenticated from "@/utils/isAuthenticated";
import { AUTH_REQUEST } from "@/src/slices/auth";
import { Wrapper } from "@/src/store";
import { AUTH_RESPONSE } from "../constants/Iauth";

export const withAuth = (App: any) => {
  return class wrapAuthComponent extends Component {
    constructor(props: any) {
      super(props);
    }

    // static async getInitialProps(ctx: any) {
    //   // const { dispatch, getState } = ctx.store;
    //   // dispatch(AUTH_REQUEST);
    //   const authenticatedUser = await isAuthenticated(ctx);

    //   // console.log(`states ---->`, ctx);

    //   if (
    //     authenticatedUser &&
    //     authenticatedUser.isValidated === false &&
    //     ctx.req
    //   ) {
    //     ctx.res.writeHead(307, {
    //       Location: "/login",
    //     });
    //     ctx.res.end();
    //     return;
    //   }

    //   return {
    //     data: {
    //       ...authenticatedUser,
    //     },
    //   };
    // }

    static getInitialProps = Wrapper.getInitialPageProps(
      ({ dispatch, getState }) =>
        async (ctx) => {
          dispatch(AUTH_REQUEST());
          const authenticatedUser = await isAuthenticated(ctx);

          console.log(`_________catched states_______`, ctx.store.getState());

          if (
            authenticatedUser &&
            authenticatedUser.isValidated === false &&
            ctx.req
          ) {
            // dispatch(AUTH_RESPONSE, { ...authenticatedUser });
            ctx?.res?.writeHead(307, {
              Location: "/login",
            });
            ctx?.res?.end();
            return;
          }

          return {
            lol: "worked",
          };
        }
    );

    render() {
      return <App {...this.props} />;
    }
  };
};
