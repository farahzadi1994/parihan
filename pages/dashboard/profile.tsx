import { ReactElement } from "react";
import { PageProvider } from "../../src/common/PageProvider";
import { Profile } from "../../src/dashboard/profile";
import { ConstLayout } from "../../src/layout/Layout";
import { NextPageWithLayout } from "../_app";

const ProfilePage: NextPageWithLayout = (props) => {
  return (
    <PageProvider title="آکادمی زبان پریحان | اطلاعات کاربری">
      <Profile />
    </PageProvider>
  );
};
ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <ConstLayout pageTitle="اطلاعات کاربری">{page}</ConstLayout>;
};
export default ProfilePage;
