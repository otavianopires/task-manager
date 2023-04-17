import { useSession } from "next-auth/react";
import Layout from "./Layout";
import Loading from "./ui/Loading";

export default function Auth({ children, options }) {
  const { status } = useSession({
    required: true,
  })

  if (status === "loading") {
    return (
      <Loading />
    )
  }

  return <Layout options={options}>{children}</Layout>
}