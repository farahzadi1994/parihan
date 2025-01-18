import { ReactElement } from "react";
import { PageProvider } from "../../../../src/common/PageProvider";
import { SingleArticle } from "../../../../src/dashboard/courses/article/SingleArticle";
import { ConstLayout } from "../../../../src/layout/Layout";
import { NextPageWithLayout } from "../../../_app";

const SingleArticlePage: NextPageWithLayout = (props) => {
  return (
    <PageProvider title="آکادمی زبان پریحان | آموزش و دوره‌ها">
      <SingleArticle />
    </PageProvider>
  );
};
SingleArticlePage.getLayout = function getLayout(page: ReactElement) {
  return <ConstLayout pageTitle="آموزش و دوره‌ها">{page}</ConstLayout>;
};
export default SingleArticlePage;
