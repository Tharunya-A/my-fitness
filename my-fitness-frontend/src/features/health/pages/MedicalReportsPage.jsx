import { useState } from 'react';
import { useReportUpload } from '../hooks/useReportUpload.js';
import { ReportDropzone } from '../components/ReportDropzone.jsx';
import { PdfViewerModal } from '../components/PdfViewerModal.jsx';
import { FileText, Eye, AlertCircle, FilePlus } from 'lucide-react';

export const MedicalReportsPage = () => {
  const { reports, isUploading, isLoading, error, uploadReport } = useReportUpload();
  const [selectedPdf, setSelectedPdf] = useState(null);

  const handleUpload = (file) => {
    uploadReport(file);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-black uppercase tracking-wider text-gray-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-brand-red" /> MEDICAL <span className="text-brand-red">REPORTS</span>
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-1">
          Upload lab PDFs to auto-extract biomarkers or store medical records safely.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-brand-red text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Box */}
      <ReportDropzone onFileUpload={handleUpload} isUploading={isUploading} />

      {/* Uploaded Reports List */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-black uppercase text-gray-900 tracking-wide flex items-center gap-2">
          <FilePlus className="w-4 h-4 text-brand-red" /> Document Vault ({reports.length})
        </h3>

        {isLoading ? (
          <p className="text-xs text-gray-400 py-4 text-center font-bold uppercase">Loading reports...</p>
        ) : reports.length === 0 ? (
          <p className="text-xs text-gray-400 py-4 text-center font-bold uppercase">No reports uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reports.map((report) => (
              <div
                key={report.id || report._id}
                className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 flex items-center justify-between bg-gray-50/50 transition-all"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-red-50 text-brand-red shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-gray-900 truncate">{report.name || report.fileName || 'Blood_Report.pdf'}</p>
                    <p className="text-[10px] text-gray-400">
                      {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'Uploaded Recently'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPdf({ url: report.url || report.fileUrl, name: report.name || report.fileName })}
                  className="p-2 hover:bg-white rounded-lg text-gray-600 hover:text-brand-red border border-transparent hover:border-gray-200 transition-all shrink-0"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF Modal Viewer */}
      <PdfViewerModal
        isOpen={!!selectedPdf}
        onClose={() => setSelectedPdf(null)}
        pdfUrl={selectedPdf?.url}
        pdfName={selectedPdf?.name}
      />
    </div>
  );
};