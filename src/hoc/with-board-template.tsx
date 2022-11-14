import { NextPage } from "next";
import React, { Component } from "react";
import { resetServerContext } from "react-beautiful-dnd";
import { Wrapper } from "@/src/store";
import { fetchBoardWithSlugId } from "@/src/slices/board";
import { fetchColumns, fetchColumnsByBoardId } from "@/src/slices/column";

const withBoardTemplate = (App: NextPage) => {
  return class WrapBoardSlugApp extends Component {
    constructor(props: any) {
      super(props);
    }

    static getInitialProps = Wrapper.getInitialPageProps(
      ({ dispatch }) =>
        async (ctx: any) => {
          let pageProps = {};

          // [NOTE]: react-beautiful-dnd not work without this (issue: https://github.com/atlassian/react-beautiful-dnd/issues/1756)
          resetServerContext();

          // [NOTE]: always call redux fetch actions before initializing the props to bind automatically with page props
          await dispatch<any>(fetchBoardWithSlugId({ id: ctx.query.slug }));

          // await dispatch<any>(fetchColumns());
          await dispatch<any>(fetchColumnsByBoardId({ id: ctx.query.slug }));

          if (App.getInitialProps) {
            pageProps = await App.getInitialProps(ctx);
          }

          return {
            ...pageProps,
          };
        }
    );

    render() {
      return <App {...this.props} />;
    }
  };
};

export default withBoardTemplate;
