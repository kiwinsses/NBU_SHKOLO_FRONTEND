import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { AbsenceDTO } from '../models/absence.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss'],
})
export class AbsenceComponent implements OnInit {
  displayedColumns: string[] = [
    'dateOfAbsence',
    'numberOfPeriod',
    'subject',
    'absenceState',
    'absenceType',
    'dateAdded'
  ];

  absences: AbsenceDTO[] = [];

  totalAbsences: number = 0;  
  totalUnexcusedAbsences: number = 0;
  constructor(private studentService: StudentService) {}

  async ngOnInit(): Promise<void> {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      console.error('No user info found in localStorage');
      return;
    }

    const userId = JSON.parse(userInfo).id;

    try {
      const studentId = await firstValueFrom(this.studentService.getStudentIdByUserId(userId));
      if (studentId) {
        const absences = await firstValueFrom(this.studentService.getStudentAbsences(studentId));
        this.absences = absences.map(absence => ({
          ...absence,
          subject: absence.scheduleSummaryDTO?.subject ?? 'N/A',
          numberOfPeriod: absence.scheduleSummaryDTO?.numberOfPeriod ?? 'N/A'
        }));

        this.totalAbsences = await firstValueFrom(
          this.studentService.getTotalAbsences(studentId)
        );

        this.totalUnexcusedAbsences = await firstValueFrom(
          this.studentService.getTotalUnexcusedAbsences(studentId)
        );


      } else {
        console.error('Student ID not found');
      }
    } catch (error) {
      console.error('Error fetching absences:', error);
    }
  }
}
