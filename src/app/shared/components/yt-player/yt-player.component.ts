import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-yt-player',
  standalone: true,
  imports: [YouTubePlayer],
  templateUrl: './yt-player.component.html',
  styleUrl: './yt-player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YtPlayerComponent implements AfterViewInit {
  @ViewChild('youTubePlayer') youTubePlayer: ElementRef<HTMLDivElement>;

  videoHeight: number | undefined;
  videoWidth: number | undefined;

  @Input('videoID') videoID: string;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    // you can remove this line if you want to have wider video player than 1200px
    this.videoWidth = Math.min(this.youTubePlayer.nativeElement.clientWidth, 1200);
    // so you keep the ratio
    this.videoHeight = this.videoWidth * 0.56;
    this.changeDetectorRef.detectChanges();
  }
}
