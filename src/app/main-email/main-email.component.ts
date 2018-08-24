import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {Person} from '../model/person';
import {Email} from '../model/email';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ContactService} from '../service/contact.service';

@Component({
  selector: 'app-main-email',
  templateUrl: './main-email.component.html',
  styleUrls: ['./main-email.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class MainEmailComponent implements OnChanges, OnInit {

  @Input()
  public person: string;
  @Input()
  public editionModeEnabled: boolean;

  public dataFetching = false;
  public firstLoad = false;
  private emailModel: Email;
  public email: FormControl;

  @Output()
  private invalidPerson: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  private loaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  private changed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  private changeError: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  private invalidDDD: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  private invalidNumber: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private service: ContactService) { }

  ngOnInit() {
    this.email = this.fb.control('', [
      Validators.required,
      Validators.email,
    ]);

    this.email.setValue('Carregando...');
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.person && changes.person.currentValue && (changes.person.currentValue !== changes.person.previousValue)) {
      this.dataFetching = true;
      this.service.getEmails(new Person(changes.person.currentValue))
        .subscribe({
          next: emails => {
            console.log(emails);
            if (emails && emails.length === 1 && emails[0]._embedded && emails[0]._embedded.emails) {
              const mainEmail = emails[0]._embedded.emails.filter(value => value.type === 'main');
              console.log(mainEmail);
              if (mainEmail.length === 1) {
                this.emailModel = mainEmail[0];
                this.email.patchValue(this.emailModel.email);
                this.loaded.emit(true);
              }
            }
          },
          error: err => {
            this.loaded.emit(false);
          },
          complete: () => {
            this.firstLoad = true;
            this.dataFetching = false;
          }
        });
    }

  }

  editionLinkDisabled() {
    return !this.firstLoad || this.dataFetching;
  }
  change() {
    this.changed.emit(true);
  }
}
