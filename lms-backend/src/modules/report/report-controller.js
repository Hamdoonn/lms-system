import * as reportService from "./report-service.js";

export const generateReport = async (req, res) => {
  try {
    const newReport = await reportService.createReport(req.body);
    res.status(200).json({ message: "Report generated successfully", report: newReport });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate report", error: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await reportService.getAllReports();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports", error: error.message });
  }
};

export const getReport = async (req, res) => {
  try {
    const report = await reportService.getReportById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch report", error: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await reportService.deleteReport(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete report", error: error.message });
  }
};
