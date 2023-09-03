import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, OnChanges {
  @Output()
  filterByName: EventEmitter<String> = new EventEmitter<String>();

  @Input()
  searchTerm: string;
  private searchNameKey = new Subject<string>();

  ngOnInit(): void {
    this.searchNameKey
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term) => {
        this.filterByName.emit(term);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.searchTerm = changes['searchTerm'].currentValue;
    }
  }

  search(event: any): void {
    this.searchNameKey.next(this.searchTerm);
  }
}
