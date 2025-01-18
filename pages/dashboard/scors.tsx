import { ReactElement } from "react";
import { PageProvider } from "../../src/common/PageProvider";
import { MyScors } from "../../src/dashboard/my-scors";
import { ConstLayout } from "../../src/layout/Layout";
import { NextPageWithLayout } from "../_app";

const ScorePage: NextPageWithLayout = (props) => {
  return (
    <PageProvider title="آکادمی زبان پریحان | صندوق امتیازات من">
      <MyScors />
    </PageProvider>
  );
};
ScorePage.getLayout = function getLayout(page: ReactElement) {
  return <ConstLayout pageTitle="صندوق امتیازات من">{page}</ConstLayout>;
};
export default ScorePage;
