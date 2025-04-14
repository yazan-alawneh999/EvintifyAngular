import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavController {
  constructor(private route: ActivatedRoute, private router: Router) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }

  navigateWithId(route: string, id: number) {
    this.router.navigate([route, id]);
  }

  getIdFromRoute(): number {
    debugger;
    return Number(this.route.snapshot.paramMap.get('id'));
  }
}
