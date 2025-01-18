import { ReactElement } from "react";
import { PageProvider } from "../../src/common/PageProvider";
import { DashboardIndex } from "../../src/dashboard/index/Index";
import { ConstLayout } from "../../src/layout/Layout";
import { NextPageWithLayout } from "../_app";

const DashboardPage: NextPageWithLayout = (props) => {
  return (
    <PageProvider title="آکادمی زبان پریحان | داشبورد">
      <DashboardIndex />
    </PageProvider>
  );
};
DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <ConstLayout pageTitle="داشبورد">{page}</ConstLayout>;
};
export default DashboardPage;
