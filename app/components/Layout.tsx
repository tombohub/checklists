import { Box } from "@chakra-ui/react";

import ChecklistTitle from "./ChecklistTitle";
import AddItemModal from "./AddItemModal";
import { type ItemModel } from "../data/DTOs";
import { type SetStateAction } from "jotai";
import { type ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
  checklistItems?: ItemModel[];
  setChecklistItems: (update: SetStateAction<ItemModel[]>) => void;
  isFirstItem: boolean;
  uid?: string | undefined;
  checklistTitle: string | null;
}

function Layout({ children, isFirstItem, uid, checklistTitle }: LayoutProps) {
  return (
    <>
      <Box padding={"2"} marginTop={"4"}>
        <ChecklistTitle uid={uid} title={checklistTitle} />
      </Box>

      {children}

      <AddItemModal isFirstItem={isFirstItem} uid={uid} />
    </>
  );
}

export default Layout;
