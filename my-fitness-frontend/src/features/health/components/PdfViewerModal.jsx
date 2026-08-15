import { Modal } from '../../../shared/components/ui/Modal.jsx';
import { FileText, Download } from 'lucide-react';

export const PdfViewerModal = ({ isOpen, onClose, pdfUrl, pdfName }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={pdfName || 'Medical Report'}>
      <div className="space-y-4">
        <div className="w-full h-[60vh] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
          {pdfUrl ? (
            <iframe src={pdfUrl} className="w-full h-full" title="PDF Viewer" />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2">
              <FileText className="w-12 h-12" />
              <p className="text-xs font-bold uppercase">No PDF Selected</p>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          {pdfUrl && (
            <a
              href={pdfUrl}
              download
              className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase rounded-xl flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Report
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};