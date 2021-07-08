import { Transaction } from 'sequelize/types';
import { PER_PAGE, REPORT_PROCESS } from '../lib/constant';
import { Op } from '../lib/sequelize';
import { report, reportAttributes } from '../models/report';

export async function getReportById(
  report_id: number,
  transaction?: Transaction
): Promise<report | string> {
  const theReport = await report.findOne({
    where: {
      report_id,
    },
    transaction,
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

export async function getReportList(
  cursor: number,
  result?: string
): Promise<report[]> {
  let whereAttribute = {};
  whereAttribute = {
    report_id: {
      [Op.lt]: cursor,
    },
  };
  if (result) {
    whereAttribute = {
      ...whereAttribute,
      result: result,
    };
  }

  const reportList = await report.findAll({
    order: [['report_id', 'DESC']],
    where: whereAttribute,
    include: [
      {
        association: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
    ],
    limit: PER_PAGE,
  });

  return reportList;
}

export async function updateReportByModel(
  reportModel: reportAttributes,
  transaction: Transaction
): Promise<report | string> {
  try {
    await report.update(reportModel, {
      where: {
        report_id: reportModel.report_id!,
      },
      transaction,
    });
    return await getReportById(reportModel.report_id!, transaction);
  } catch (error) {
    return error.message;
  }
}

export async function getReportStatus(): Promise<{
  proceeding: number;
  done: number;
}> {
  const allReportsCount = await report.findAll();
  const proceedingReports = allReportsCount.filter(
    (v) => v.result == REPORT_PROCESS[0]
  );
  const doneCount = allReportsCount.length - proceedingReports.length;
  return {
    proceeding: proceedingReports.length,
    done: doneCount,
  };
}
