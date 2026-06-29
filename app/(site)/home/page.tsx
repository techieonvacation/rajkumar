import { redirect } from "next/navigation";

// /home is an alias — canonical home is at /
export default function HomeAlias() {
  redirect("/");
}
