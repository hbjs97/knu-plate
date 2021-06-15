import { report, reportAttributes } from '../models/report';

export async function getReportById(
  report_id: number
): Promise<report | string> {
  const theReport = await report.findOne({
    where: {
      report_id,
    },
  });
  if (!theReport) {
    return 'report not founded';
  }
  return theReport;
}

export async function enrollReport(
  reportModel: reportAttributes
): Promise<report | string> {
  try {
    const enrolledReport = await report.create(reportModel);
    return await getReportById(enrolledReport.report_id!);
  } catch (error) {
    return error.mesasge;
  }
}
