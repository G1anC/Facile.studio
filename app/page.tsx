// app/page.tsx
import { redirect } from "next/navigation";

export default function Page() {
    // Redirect to the desired locale folder
    redirect("/en"); // change to "/fr" if you want French
}
