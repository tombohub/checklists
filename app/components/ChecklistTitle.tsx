import { Input } from "@chakra-ui/react";
import { useRef } from "react";
import { changeChecklistTitleHandler } from "../data/eventHandlers";

interface ChecklistTitleProps {
  uid: string | undefined;
  title: string | null;
}

export async function action({ request }) {
  const body = await request.formData();
  console.log(body.get("title"));
  return body;
}

function ChecklistTitle({ uid, title }: ChecklistTitleProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleOnBlur() {
    if (title && uid) {
      await changeChecklistTitleHandler(title, uid);
    } else if (!title && uid) {
      await changeChecklistTitleHandler(null, uid);
    } else {
      console.log("no title change");
    }
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) inputRef.current.blur();
  }

  return (
    <>
      <form method="post" action="/test">
        <Input
          placeholder="Title..."
          variant={"flushed"}
          fontSize={"3xl"}
          value={title ? title : ""}
          ref={inputRef}
          onBlur={handleOnBlur}
          name="title"
          type={"text"}
        />
      </form>
    </>
  );
}

export default ChecklistTitle;
