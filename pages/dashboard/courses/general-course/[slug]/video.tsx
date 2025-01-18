import { ReactElement } from "react";
import { PageProvider } from "../../../../../src/common/PageProvider";
import { Video } from "../../../../../src/dashboard/courses/general-cours/Video";
import { ConstLayout } from "../../../../../src/layout/Layout";
import { NextPageWithLayout } from "../../../../_app";

const GeneralCoursPage: NextPageWithLayout = (props) => {
  return (
    <PageProvider title="آکادمی زبان پریحان | دوره عمومی زبان انگلیسی">
      <Video />
    </PageProvider>
  );
};
GeneralCoursPage.getLayout = function getLayout(page: ReactElement) {
  return <ConstLayout pageTitle="دوره عمومی زبان انگلیسی">{page}</ConstLayout>;
};
export default GeneralCoursPage;
