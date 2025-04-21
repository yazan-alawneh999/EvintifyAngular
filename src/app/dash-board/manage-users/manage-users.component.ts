import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from './user';
import { NavController } from 'src/app/services/NavController';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private controller: NavController
  ) {}
  users: User[] = [];
  ngOnInit(): void {
    this.getRegisteredUsers();
  }

  getRegisteredUsers() {
    debugger;

    this.userService.getRegisteredUsers().subscribe({
      next: (response) => {
        this.users = response;
        console.log(response); // Ensure proper console log
      },
    });
  }

  viewProfile(userId: number) {
    this.controller.navigateWithId('/profile', userId);
  }


  exportToCSV() {
    const header = ['Id', 'UserName', 'Role'];
    const rows = this.users.map((user, i) => [i + 1, user.username, user.role.roleName]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += header.join(',') + '\n';
    rows.forEach(rowArray => {
      csvContent += rowArray.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    FileSaver.saveAs(blob, 'users.csv');
  }

  exportToPDF() {
    const doc = new jsPDF();
    const tableData = this.users.map((user, i) => [i + 1, user.username, user.role.roleName]);
    autoTable(doc, {
      head: [['Id', 'UserName', 'Role']],
      body: tableData,
    });
    doc.save('users.pdf');
  }

  exportToWord() {
    let header = '<table><tr><th>Id</th><th>UserName</th><th>Role</th></tr>';
    let rows = this.users.map((user, i) =>
      `<tr><td>${i + 1}</td><td>${user.username}</td><td>${user.role.roleName}</td></tr>`
    ).join('');
    let html = `<html><head><meta charset="utf-8"><title>Users</title></head><body>${header}${rows}</table></body></html>`;
    const blob = new Blob(['\ufeff' + html], {
      type: 'application/msword'
    });
    FileSaver.saveAs(blob, 'users.doc');
  }

  printTable() {
    const printContent = document.querySelector('.table')?.outerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow && printContent) {
      printWindow.document.write('<html><head><title>Print Users</title></head><body>');
      printWindow.document.write(printContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }
}
