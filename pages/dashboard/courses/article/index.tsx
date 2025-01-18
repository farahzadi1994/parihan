import { ReactElement } from "react";
import { PageProvider } from "../../../../src/common/PageProvider";
import { Article } from "../../../../src/dashboard/courses/article";
import { ConstLayout } from "../../../../src/layout/Layout";
import { NextPageWithLayout } from "../../../_app";

const ScorePage: NextPageWithLayout = (props) => {
  return (
    <PageProvider title="آکادمی زبان پریحان | آموزش و دوره‌ها">
      <Article />
    </PageProvider>
  );
};
ScorePage.getLayout = function getLayout(page: ReactElement) {
  return <ConstLayout pageTitle="آموزش و دوره‌ها">{page}</ConstLayout>;
};
export default ScorePage;
