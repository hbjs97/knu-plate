import { dashboard, dashboardAttributes } from '../models/dashboard';

export async function getDashboardByDateInfo(
  year: number,
  month: number,
  date: number
): Promise<dashboard | string> {
  const dashboardRow = await dashboard.findOne({
    where: {
      year,
      month,
      date,
    },
  });
  if (!dashboardRow) {
    return 'dashboard not founded';
  }
  return dashboardRow;
}

export async function enrollDashboard(
  dashboardModel: dashboardAttributes
): Promise<dashboard | string> {
  const enrolledDashboardRow = await dashboard.create(dashboardModel);
  if (!enrolledDashboardRow) {
    return 'dashboard row create fail';
  }
  return enrolledDashboardRow;
}

export async function getDashboardByRange(range: number): Promise<dashboard[]> {
  const dashboardList = await dashboard.findAll({
    order: [['dashboard_id', 'DESC']],
    limit: range + 1,
  });
  return dashboardList;
}
