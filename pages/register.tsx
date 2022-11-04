import React from "react";
import Register from "@/src/components/Register";
import { checkEnvironment } from "@/utils/checkEnvironment";

const RegisterComponent = Register;

RegisterComponent.getInitialProps = (ctx) => {
  const { res, store } = ctx;
  const dispatch = store.dispatch;

  if (res?.statusCode === 201) {
    console.log(`respons of creation from ssg`);

    // dispatch({ type: "",  })
  }

  return {};
};

export default RegisterComponent;
