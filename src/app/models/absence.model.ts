
// src/app/models/absence.model.ts

export interface AbsenceDTO {
    id: number;
    dateOfAbsence: Date;
    numberOfPeriod: string;
    subject: string;
    absenceState: string;
    absenceType: string;
    dateAdded: Date;
    studentId: number;
    scheduleSummaryDTO: {
      id: number;
      dayOfTheWeek: string;
      numberOfPeriod: string;
      subject: string;
    };
  }
  