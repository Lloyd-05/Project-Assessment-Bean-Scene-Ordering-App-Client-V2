import React from "react";

import { useAuthStore } from "../store/AuthStore";

import LoginScreen from "../screens/LoginScreen";
import StaffNavigator from "../navigators/StaffNavigator";
import ManagerNavigator from "../navigators/ManagerNavigator";

const AppRouter = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) 
    {
    return <LoginScreen />;
  }

  if (user.role === "staff")
    {   
      return <StaffNavigator />
  };

  if (user.role === "manager") {
    return <ManagerNavigator />

  };

  return <LoginScreen />;
};

export default AppRouter;