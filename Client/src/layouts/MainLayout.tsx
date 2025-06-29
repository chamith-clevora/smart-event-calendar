import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast"; 

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default MainLayout;
