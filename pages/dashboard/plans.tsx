import { Pricing } from "@/src/dashboard/pricing";
import { ReactElement } from "react";
import { PageProvider } from "../../src/common/PageProvider";
import { ConstLayout } from "../../src/layout/Layout";
import { NextPageWithLayout } from "../_app";

const ProfilePage: NextPageWithLayout = (props) => {
  return (
    <PageProvider title="آکادمی زبان پریحان | خرید دوره">
      <Pricing />
    </PageProvider>
  );
};
ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <ConstLayout pageTitle="خرید دوره">{page}</ConstLayout>;
};
export default ProfilePage;
