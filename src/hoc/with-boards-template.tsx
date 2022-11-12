import React, { Component } from "react";
import { NextPage } from "next";
import { Wrapper } from "@/src/store";
import { fetchBoards } from "@/src/slices/board";

const WithBoardsTemplate = (App: NextPage) => {
  return class WithModalBoard extends Component {
    constructor(props: any) {
      super(props);
    }

    static getInitialProps = Wrapper.getInitialPageProps(
      ({ dispatch, getState }) =>
        async (ctx) => {
          let appProps = {};

          // binding all boards in props
          await dispatch<any>(fetchBoards());

          if (App.getInitialProps) {
            appProps = await App.getInitialProps(ctx);
          }

          return {
            props: {
              ...appProps,
            },
          };
        }
    );

    render() {
      return <App {...this.props} />;
    }
  };
};

export default WithBoardsTemplate;
