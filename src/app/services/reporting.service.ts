import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class ReportingService {
  constructor() {}

  /** Export Data to CSV */
  exportToCSV(filename: string, headers: string[], data: any[]) {
    const csvRows = data.map((row) => row.map((item) => `"${item}"`).join(',')); // Quote values to handle commas
    const csvContent = [headers.join(','), ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
  }

  /** Export Data to PDF */
  exportToPDF(title: string, filename: string, headers: string[], data: any[]) {
    const doc = new jsPDF();
    doc.text(title, 14, 10);

    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 20,
    });

    doc.save(`${filename}.pdf`);
  }

  /** Print Report */
  printReport(contentId: string) {
    const printContent = document.getElementById(contentId);
    if (printContent) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(
          '<html><head><title>Print Report</title></head><body>'
        );
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    }
  }
}
