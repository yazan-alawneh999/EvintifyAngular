import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportsComponent implements OnInit {

private chart!: Chart;
  private Piechart!: Chart;
  data: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getChartData();
    this.GetAllEvents();
  }

  getChartData(){
    this.http.get<any[]>('https://localhost:7065/api/Reports/GetSalesReport')
    .subscribe(response => {
      this.createChart(response);   
    });
  }

  total =0;
  createChart(data: any[]) {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx2 = document.getElementById('PieChart') as HTMLCanvasElement;
    if (!ctx) return;
    if (this.chart) {
      this.chart.destroy();
    }
    data.forEach((item) => {
      this.total +=item.totalRevenue;
    });

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.eventName), 
        datasets: [{
          label: 'Total Revenue ($)',
          data: data.map(item => item.totalRevenue), 
          backgroundColor: ['#dbb6ff'],
          borderWidth: 0
        },
        {
          label: 'Tickets sold',
          data: data.map(item => item.ticketCount),
          backgroundColor: ['#ffb6b6'], 
          borderWidth: 0
        }
      ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            
            labels: {
            usePointStyle: true,        
            pointStyle: 'circle'
            } 
          }
        },
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            stacked: true
          }
        }
      }
    });
    


    this.chart = new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: data.map(item => item.eventName+"  ("+item.ticketCount+")"), 
        datasets: [
        {
          label: 'Tickets sold',
          data: data.map(item => item.ticketCount),
          backgroundColor: ['#f53b3b','#ff66e8','#00ffdd','#960091','#9966ff','#ff9f40'],
          borderWidth: 0
        }
      ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
            usePointStyle: true,        
            pointStyle: 'circle',
            padding: 20 
            } 
          }
        }
      }
    });
    
  }


  downloadPDF() {
    const canvas1 = document.getElementById('myChart') as HTMLCanvasElement;
    const canvas2 = document.getElementById('PieChart') as HTMLCanvasElement;
    const canvas3 = document.getElementById('EventsTable') as HTMLTableElement;
    const canvas4 = document.getElementById('AttendanceTable') as HTMLTableElement;
  
    //convert to image
    html2canvas(canvas1).then((canvas1Img) => {
      const imgData1 = canvas1Img.toDataURL('image/png');
      const pdf = new jsPDF();
      
      const imgWidth = 180;
      const imgHeight1 = (canvas1Img.height * imgWidth) / canvas1Img.width;
      //adding first chart to pdf
      pdf.text("Event Sales Report - Tickets Revenue", 10, 10);
      pdf.addImage(imgData1, 'PNG', 10, 20, imgWidth, imgHeight1);
  
      html2canvas(canvas2).then((canvas2Img) => {
        const imgData2 = canvas2Img.toDataURL('image/png');
        const imgHeight2 = (canvas2Img.height * imgWidth) / canvas2Img.width;// Adjusting position
        pdf.addImage(imgData2, 'PNG', 10, 20 + imgHeight1 + 15, imgWidth, imgHeight2); // Adjust position as needed
      
      
        html2canvas(canvas3).then((canvas3Img) => {
          const imgData3 = canvas3Img.toDataURL('image/png');
          const imgHeight3 = (canvas3Img.height * imgWidth) / canvas3Img.width;
          pdf.addImage(imgData3, 'PNG', 10, 20 + (imgHeight2+imgHeight1) + 15, imgWidth, imgHeight3); // Adjust position as needed
        
        if(this.EventsAttendance==null){
          pdf.save("Event_Report.pdf");
        }
          html2canvas(canvas4).then((canvas4Img) => {
            const imgData4 = canvas4Img.toDataURL('image/png');
            const imgHeight4 = (canvas4Img.height * imgWidth) / canvas4Img.width;
            pdf.addImage(imgData4, 'PNG', 10, 20 + (imgHeight2+imgHeight1+imgHeight3) + 15, imgWidth, imgHeight4); // Adjust position as needed
            
            pdf.save("Event_Report.pdf");
          });
        
        });
      
      });


      

      
      
    });
  }
  





  apiUrl = 'https://localhost:7065/api/Reports/GetAttendanceReport';

  EventsAttendance: any = null;
  getAttendanceReport(EventID:any){
    this.http.get<any>(`${this.apiUrl}/${EventID}`).subscribe(
      (response) => {
        this.EventsAttendance = response; 
      },
      (error) => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data');
      }
    );
  }



  AllEvents : any =[];
  getAllEventsApi='https://localhost:7065/api/Event/GetAllEvent';
  GetAllEvents(){
    this.http.get<any>(this.getAllEventsApi).subscribe(
      (response) => {
        this.AllEvents = response; 
      },
      (error) => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data');
      }
    )
  }
  
  
  
  
}
