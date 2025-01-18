import { ReactElement } from "react";
import { PageProvider } from "../../src/common/PageProvider";
import { Invite } from "../../src/dashboard/invite";
import { ConstLayout } from "../../src/layout/Layout";
import { NextPageWithLayout } from "../_app";

const InvitesPage: NextPageWithLayout = (props) => {
  return (
    <PageProvider title="آکادمی زبان پریحان | دعوت از دوستان">
      <Invite />
    </PageProvider>
  );
};
InvitesPage.getLayout = function getLayout(page: ReactElement) {
  return <ConstLayout pageTitle="دعوت از دوستان">{page}</ConstLayout>;
};
export default InvitesPage;
