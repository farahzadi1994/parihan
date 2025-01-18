import { ReactElement } from "react";
import { PageProvider } from "../../../src/common/PageProvider";
import { SeenWords } from "../../../src/dashboard/courses/SeenWords";
import { ConstLayout } from "../../../src/layout/Layout";
import { NextPageWithLayout } from "../../_app";

const SeeLessonsPage: NextPageWithLayout = (props) => {
  return (
    <PageProvider title="آکادمی زبان پریحان | آموزش و دوره‌ها">
      <SeenWords />
    </PageProvider>
  );
};
SeeLessonsPage.getLayout = function getLayout(page: ReactElement) {
  return <ConstLayout pageTitle="آموزش و دوره‌ها">{page}</ConstLayout>;
};
export default SeeLessonsPage;
