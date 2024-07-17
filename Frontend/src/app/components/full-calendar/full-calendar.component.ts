import { Component, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventApi, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from '../../services/calendar-events.service';
import { createEventId } from './event-utils';
import { CommonModule } from '@angular/common';
import esLocale from '@fullcalendar/core/locales/es';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, ReactiveFormsModule],
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss'],
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  @ViewChild('eventModal') eventModal!: TemplateRef<any>;
  @ViewChild('confirmDeleteModal') confirmDeleteModal!: TemplateRef<any>;

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    locale: esLocale,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  currentEvents: EventApi[] = [];
  eventForm: FormGroup;
  private deleteEventId: string | null = null;
  private confirmDeleteModalRef!: NgbModalRef;

  constructor(private eventService: EventService, private modalService: NgbModal, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      color: ['#FF0000'],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (events: EventInput[]) => {
        const calendarApi = this.fullcalendar.getApi();
        events.forEach((event) => {
          calendarApi.addEvent(event);
        });
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.open(this.eventModal);
    this.eventForm.reset();
    this.eventForm.patchValue({
      start: this.formatDateForInput(selectInfo.startStr),
      end: this.formatDateForInput(selectInfo.endStr)
    });
  }

  handleEventClick(clickInfo: { event: EventApi }) {
    this.open(this.eventModal);
    this.eventForm.patchValue({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      color: clickInfo.event.backgroundColor || '#FF0000',
      start: this.formatDateForInput(clickInfo.event.startStr),
      end: this.formatDateForInput(clickInfo.event.endStr)
    });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  saveEvent() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const newEvent: EventInput = this.eventForm.value;
    newEvent.color = newEvent.color || '#FF0000';

    if (newEvent.id) {
      this.eventService.updateEvent(newEvent.id!, newEvent).subscribe({
        next: () => {
          const calendarApi = this.fullcalendar.getApi();
          const event = calendarApi.getEventById(newEvent.id!);
          if (event) {
            event.setProp('title', newEvent.title);
            event.setStart(newEvent.start!);
            event.setEnd(newEvent.end!);
            event.setProp('backgroundColor', newEvent.color);
          }
          this.modalService.dismissAll();
        },
        error: (error) => {
          console.error('Error updating event:', error);
        }
      });
    } else {
      newEvent.id = createEventId();
      this.eventService.addEvent(newEvent).subscribe({
        next: (event) => {
          const calendarApi = this.fullcalendar.getApi();
          calendarApi.addEvent(event);
          this.modalService.dismissAll();
        },
        error: (error) => {
          console.error('Error adding event:', error);
        }
      });
    }
  }

  confirmDelete(eventId: string) {
    this.deleteEventId = eventId;
    this.confirmDeleteModalRef = this.modalService.open(this.confirmDeleteModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  deleteEvent() {
    if (this.deleteEventId) {
      this.eventService.deleteEvent(this.deleteEventId).subscribe({
        next: () => {
          const calendarApi = this.fullcalendar.getApi();
          const event = calendarApi.getEventById(this.deleteEventId!);
          if (event) {
            event.remove();
          }
          this.deleteEventId = null;
          this.confirmDeleteModalRef.close();
        },
        error: (error) => {
          console.error('Error deleting event:', error);
        }
      });
    }
  }

  deleteEventFromList(eventId: string) {
    this.confirmDelete(eventId);
  }

  private formatDateForInput(date: Date | string): string {
    const d = new Date(date);
    return formatDate(d, 'yyyy-MM-ddTHH:mm', 'en-US');
  }
}
