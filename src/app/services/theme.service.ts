import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ThemeService {
  private renderer: Renderer2;
  private themeClass: string = 'light-mode';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleTheme(isDarkTheme: boolean) {
    const newTheme = isDarkTheme ? 'dark-mode' : 'light-mode';
    if (newTheme !== this.themeClass) {
      this.renderer.removeClass(document.body, this.themeClass);
      this.themeClass = newTheme;
      this.renderer.addClass(document.body, this.themeClass);
    }
  }
}
