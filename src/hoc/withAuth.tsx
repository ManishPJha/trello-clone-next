import { Component } from "react";
import isAuthenticated from "@/utils/isAuthenticated";
import { AUTH_REQUEST, AUTH_RESPONSE, AUTH_FAIL } from "@/src/slices/auth";
import { Wrapper } from "@/src/store";

export const withAuth = (App: any) => {
  return class wrapAuthComponent extends Component {
    constructor(props: any) {
      super(props);
    }

    static getInitialProps = Wrapper.getInitialPageProps(
      ({ dispatch, getState }) =>
        async (ctx) => {
          dispatch(AUTH_REQUEST({ loading: true }));
          const authenticatedUser = await isAuthenticated(ctx);
          if (
            authenticatedUser &&
            authenticatedUser.isValidated === false &&
            ctx.req
          ) {
            dispatch(AUTH_FAIL({ loading: false, error: "Login Failed!" }));
            ctx?.res?.writeHead(307, {
              Location: "/login",
            });
            ctx?.res?.end();
            return;
          } else if (
            authenticatedUser &&
            authenticatedUser.isValidated === true
          ) {
            const { id, email } = authenticatedUser;
            dispatch(AUTH_RESPONSE({ authData: { id, email } }));
          }
          return {
            authState: { ...getState().auth },
          };
        }
    );

    render() {
      return <App {...this.props} />;
    }
  };
};
