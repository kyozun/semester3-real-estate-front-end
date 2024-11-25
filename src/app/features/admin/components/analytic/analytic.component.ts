import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-analytic',
  standalone: true,
  imports: [CurrencyPipe, ChartModule],
  templateUrl: './analytic.component.html',
  styleUrl: './analytic.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticComponent implements OnInit {
  basicData: any;

  basicOptions: any;

  data: any;

  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['For Sell', 'For Rent'],
      datasets: [
        {
          data: [72, 48],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--green-400')],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Listings',
          data: [20, 30, 32, 38],
          backgroundColor: ['rgb(50,102,239)', 'rgb(17,182,92)', 'rgb(50,102,239)', 'rgb(17,182,92)'],
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
