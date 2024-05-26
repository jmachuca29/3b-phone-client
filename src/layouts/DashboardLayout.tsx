import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Header } from "src/components/Header/Header";
import { getUserProfile } from "src/services/auth";
import useAppStore from "src/store/store";
import MainStyled from "./styles";

export const DashboardLayout = ({ children }: any) => {
  const token = localStorage.getItem("3b-iphone-token");
  const [setFn] = useAppStore((state) => [state.setFn]);
  const { data } = useQuery({
    queryKey: ["profile", token], // Include the token as part of the query key
    queryFn: () =>
      token ? getUserProfile(token) : Promise.reject("No token found"),
    retry: false,
    enabled: !!token, // Only run the query if token is available,
  });

  useEffect(() => {
    if (data) {
      const user = data.data;
      setFn.setUser(user);
    }
  }, [token, data]);

  return (
    <>
      <Header />
      <MainStyled>{children}</MainStyled>
    </>
  );
};
