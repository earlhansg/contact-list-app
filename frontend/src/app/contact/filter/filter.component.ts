import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, OnChanges {
  @Input()
  searchTerm: string;
  private searchNameKey = new Subject<string>();

  @Input()
  numberOfContacts: number;

  @Output()
  filterByName: EventEmitter<String> = new EventEmitter<String>();

  @Output()
  showPage: EventEmitter<number> = new EventEmitter<number>();

  listPage: number[] = [];
  selectedValue: number;

  ngOnInit(): void {
    this.searchNameKey
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term) => {
        this.filterByName.emit(term);
      });

    console.log('listPage', this.listPage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes['searchTerm']) {
      this.searchTerm = changes['searchTerm'].currentValue;
    }
    if (changes['numberOfContacts']) {
      this.numberOfContacts = changes['numberOfContacts'].currentValue;
      this.createListofPage();
      this.selectedValue = this.listPage[0];
    }
  }

  search(event: any): void {
    this.searchNameKey.next(this.searchTerm);
  }

  createListofPage() {
    this.listPage = [];
    for (let i = 5; i <= this.numberOfContacts; i += 5) {
      this.listPage.push(i);
    }
  }

  selectValue(value: number) {
    console.log(value);
    this.selectedValue = value;
    this.showPage.emit(value);
  }
}
