import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import DB from "@/utils/DB";

const Main = () => {
  const router = useRouter();

  const checkUser = useCallback(async () => {
    const db = new DB();
    await db.open();
    const _result = await db.getCurUserInfo();

    if (!_result.result) {
      router.push("/login");
      return;
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, [router, checkUser]);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Main;
