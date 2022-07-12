import React, { FC, ReactNode } from "react";
import Head from "next/head";

import { Box, padding } from "@mui/system";
import { Navbar, Sidebar } from "../ui";

interface Props {
  title?: string;
  children: ReactNode;
}

export const Layouts: FC<Props> = ({ title = "OpenJira - App", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <Sidebar />

      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
