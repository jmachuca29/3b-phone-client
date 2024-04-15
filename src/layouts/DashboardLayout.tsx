import { Header } from "src/components/Header/Header";

export const DashboardLayout = ({ children }: any) => {
  return (
    <div>
      <Header/>
      <main>{children}</main>
    </div>
  );
};
