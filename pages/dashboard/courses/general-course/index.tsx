import { ReactElement } from "react";
import { PageProvider } from "../../../../src/common/PageProvider";
import { GeneralCours } from "../../../../src/dashboard/courses/general-cours";
import { ConstLayout } from "../../../../src/layout/Layout";
import { NextPageWithLayout } from "../../../_app";

const GeneralCoursPage: NextPageWithLayout = (props) => {
  return (
    <PageProvider title="آکادمی زبان پریحان | دوره عمومی زبان انگلیسی">
      <GeneralCours />
    </PageProvider>
  );
};
GeneralCoursPage.getLayout = function getLayout(page: ReactElement) {
  return <ConstLayout pageTitle="دوره عمومی زبان انگلیسی">{page}</ConstLayout>;
};
export default GeneralCoursPage;
