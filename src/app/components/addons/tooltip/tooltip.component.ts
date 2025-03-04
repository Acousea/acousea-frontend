import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  @Input() text!: string;
  @Input() show = false; // Controlado externamente

  constructor() { }

  ngOnInit(): void { }
}
