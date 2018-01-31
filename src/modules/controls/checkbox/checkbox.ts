import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { error } from 'selenium-webdriver';

@Component({
	selector: 'app-checkbox',
	template: `

  <mat-checkbox [formControl]="formControl" [id]="id" [formlyAttributes]="field">
  {{ to.label }}
  {{ to.required ? '*' : '' }}
</mat-checkbox>

    `
})
export class CheckBoxComponent extends FieldType {}
