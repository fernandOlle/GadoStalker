import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
    private localStorage: LocalStorageService, 
    private router: Router
    ){}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.verificarAcesso();
	}

	private verificarAcesso() {
    let credenciais = this.localStorage.get('credenciais');
		if (Object.keys(credenciais).length > 0) return true
		this.router.navigate(['/login']);
		return false
	}

}
