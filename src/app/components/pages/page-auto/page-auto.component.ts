import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, map, Observable } from 'rxjs';
import { AutoWithId } from 'src/app/shared/interfaces/auto.interface';
import { AutoService } from 'src/app/shared/services/auto.service';

@UntilDestroy()
@Component({
  selector: 'app-page-auto',
  templateUrl: './page-auto.component.html',
  styleUrls: ['./page-auto.component.scss']
})
export class PageAutoComponent implements OnInit {

  public formSearch: FormGroup = new FormGroup({
    name: new FormControl(null)
  });
  public allAutoObservable: Observable<AutoWithId[]> = this.autoService.getAllAuto();
  private autoByNameFunc = (allAutoObservable: Observable<AutoWithId[]>, name: string): Observable<AutoWithId[]> => {
    return this.autoService.getAllAuto().pipe(map(auto => this.autoService.filterAutoByName(auto, name)));
  };

  constructor(private autoService: AutoService) { }

  ngOnInit(): void {
    this.formSearch.valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(200)
    ).subscribe(res => {
      const controlName = this.formSearch.get('name');
      if (controlName !== null) {
        this.allAutoObservable = this.autoByNameFunc(this.allAutoObservable, controlName.value);
      }
    })
  }

}
