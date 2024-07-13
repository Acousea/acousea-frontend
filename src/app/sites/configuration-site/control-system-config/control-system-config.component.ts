import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {TooltipComponent} from '../../../components/tooltip/tooltip.component';
import {CommunicationSystemService} from "../../../services/communication-system-service/communication-system.service";
import {UpdateInfoButtonComponent} from "../../../components/update-info-button/update-info-button.component";

@Component({
  selector: 'app-control-system-config',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    TooltipComponent,
    ReactiveFormsModule,
    UpdateInfoButtonComponent
  ],
  templateUrl: './control-system-config.component.html',
  styleUrl: './control-system-config.component.css'
})
export class ControlSystemConfigComponent implements OnInit {
  reportingPeriodsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected communicationSystemService: CommunicationSystemService
  ) {
    this.reportingPeriodsForm = this.fb.group({
      launchingSbdPeriod: [0, Validators.required],
      launchingLoraPeriod: [0, Validators.required],
      workingSbdPeriod: [0, Validators.required],
      workingLoraPeriod: [0, Validators.required],
      recoveringSbdPeriod: [0, Validators.required],
      recoveringLoraPeriod: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCurrentPeriods();
  }

  loadCurrentPeriods(): void {
    this.communicationSystemService.getReportingPeriods().subscribe(periods => {
      this.reportingPeriodsForm.patchValue(periods);
    });
  }

  onSubmit(): void {
    if (this.reportingPeriodsForm.valid) {
      this.communicationSystemService.setReportingPeriods(this.reportingPeriodsForm.value);
    }
  }
}
